"use client";
import { Telescope, Satellite, Rocket, Building, ArrowLeft, Earth, } from "lucide-react"
import React, { useState, useEffect, useMemo } from 'react';
import { sendToGas } from "@/lib/gas-queue"
import Link from 'next/link';

import { FullDiagnosisCard } from "@/components/full-diagnosis-card"

const QUESTIONS = [
  { id: 1, text: "ブラックホールや地球外生命体など、未知の宇宙の話にワクワクする" },
  { id: 2, text: "宇宙の技術が、生活やビジネスにどう役立つか気になる" },
  { id: 3, text: "宇宙について、記事やニュースをじっくり読むのが好き" },
  { id: 4, text: "誰かと話したり、イベントで盛り上がるのが好き" },
  { id: 5, text: "これから宇宙に関わる活動に少しでも触れてみたい" },
];

type ResultType = 'RI' | 'DI' | 'RO' | 'DO';

const RESULT_DATA: Record<ResultType, any> = {
  RI: {
    title: "🔭 天文台トラベラー",
    icon: Telescope,
    catchcopy: "宇宙、普通にロマンすぎない？",
    explanation: "・難しい話はちょっと苦手\n・でも宇宙はめちゃくちゃ気になる\n・気づいたら宇宙の画像見てる",
    howToSpend: '👉 まずは"見るだけ"でOK',
    contents: ["毎日宇宙クイズ", "週刊宇宙ニュース", "Cosmo Baseで宇宙知っトク"],
    shareText: "宇宙、ロマンすぎない？って思ってる【天文台トラベラー】でした🔭 #CosmoBase宇宙タイプ診断",
    img: "type/RI.png",
    img_share: "type/RI_share.png",
    color: "#cbace4",
  },
  DI: {
    title: "🛰️ 人工衛星",
    icon: Satellite,
    catchcopy: "宇宙って色んな楽しみ方あるよね",
    explanation: "・ニュースも気になる\n・雑談も好き\n・とりあえず全部ちょっとずつ見たい",
    howToSpend: "👉 気になるところからつまみ食いでOK",
    contents: ["週刊宇宙ニュース", "Cosmo Baseで宇宙教えて", "Cosmo Base Library"],
    shareText: "いろんな角度から宇宙楽しみたい【人工衛星】タイプでした🛰️ #CosmoBase宇宙タイプ診断",
    img: "type/DI.png",
    img_share: "type/DI_share.png",
    color: "#85c68b",
  },
  RO: {
    title: "🚀 ロケット打ち上げ",
    icon: Rocket,
    catchcopy: "それ、実際に行けるの？",
    explanation: "・イベント見つけたら調べてる\n・気づいたら応募ページ見てる\n・とりあえず一歩踏みがち",
    howToSpend: "👉 小さくてもいいから1回動いてみる",
    contents: ["宇宙に行っといで", "Cosmo Base Event Database", "Cosmo Baseで宇宙教えて"],
    shareText: "気づいたら一歩踏み出してる【ロケット打ち上げ】でした🚀 #CosmoBase宇宙タイプ診断",
    img: "type/RO.png",
    img_share: "type/RO_share.png",
    color: "#EEEEBB",
  },
  DO: {
    title: "🌍 宇宙ステーション",
    icon: Earth,
    catchcopy: "それ、どういう仕組み？",
    explanation: "・ちゃんと理解したい\n・人に説明したくなる\n・気づいたら深掘りしてる",
    howToSpend: '👉 知識を"誰かに話す"と一気に楽しくなる',
    contents: ["Space Voyager 検定", "Cosmo Base Library", "宇宙のイベント行ってきた"],
    shareText: "気づいたら詳しくなってる【宇宙ステーション】でした🌍 #CosmoBase宇宙タイプ診断",
    img: "type/DO.png",
    img_share: "type/DO_share.png",
    color: "#83CBEB",
  }
};

const CONTENT_LINKS: Record<string, string> = {
  "毎日宇宙クイズ": "https://note.com/cosmobase/n/n90da43eb38df",
  "週刊宇宙ニュース": "https://note.com/cosmobase/n/n478766fa448f",
  "Cosmo Baseで宇宙知っトク": "https://note.com/cosmobase/n/n459994754c87",
  "Cosmo Baseで宇宙教えて": "https://note.com/cosmobase/n/ndcd6e5f8d215",
  "Cosmo Base Library": "https://note.com/cosmobase/n/n9d1b7c985c18",
  "宇宙に行っといで": "https://note.com/cosmobase/n/n34f33f9c23e6",
  "Cosmo Base Event Database": "https://note.com/cosmobase/n/n918f05ad94c3",
  "Space Voyager 検定": "https://note.com/cosmobase/n/n1bada8fe3ce4",
  "宇宙のイベント行ってきた": "https://note.com/cosmobase/n/n6de912259db4"
};

function ResultScreen({ answers }: { answers: number[] }) {
  const resultType = useMemo<ResultType>(() => {
    if (!answers || answers.length < 5) return 'RI';
    const R = answers[0];
    const D = answers[1];
    const I = answers[2];
    const E = answers[3];

    const axis1 = R >= D ? 'R' : 'D';
    const axis2 = I >= E ? 'I' : 'O';
    return `${axis1}${axis2}` as ResultType;
  }, [answers]);

  const data = RESULT_DATA[resultType];

  const handleXShare = () => {
    const shareUrl = `https://fsifofficial.github.io/CosmoBase/space-type/result/${resultType}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(data.shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank');
  };

  const handleInstagramShare = async () => {
    const shareText = data.shareText;
    const imageUrl = `/event/${data.img_share}`;
    const fileName = `cosmobase_${resultType}.png`;

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], fileName, { type: blob.type });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          text: shareText,
          files: [file],
        });
      } else {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(shareText);
        } else {
          const textArea = document.createElement("textarea");
          textArea.value = shareText;
          textArea.style.position = "fixed";
          textArea.style.opacity = "0";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          try {
            document.execCommand('copy');
          } catch (err) {
            console.error('コピーに失敗しました', err);
          }
          document.body.removeChild(textArea);
        }

        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        alert("📝 テキストをコピーし、画像を保存しました！\n\nInstagram等のアプリを開いて、画像を投稿＆テキストをペーストしてください。");
      }
    } catch (error: any) {
      alert("【シェア中断】\n操作がキャンセルされたか、エラーが発生しました。\n" + error.message);
    }
  };

  return (
    <div className="bg-[#0B0F19] text-white p-6 flex flex-col items-center font-sans pb-20 animate-fade-in">
      <div className="bg-[#0B0F19] text-white p-4 flex flex-col items-center font-sans pt-6 pb-6 animate-fade-in">
        <div
          className="rounded-2xl p-6 w-full max-w-md shadow-2xl border-4 border-white/20"
          style={{ backgroundColor: data.color }}
        >
          <div className="text-center mt-3 mb-4 flex flex-col items-center">
            <p className="font-bold text-sm tracking-widest mb-2 text-[#000033]/70">あなたの宇宙タイプは...</p>
            <h1 className="text-2xl md:text-3xl font-serif font-extrabold leading-tight mb-4 text-[#000033]">{data.title}</h1>
            <div className="w-full flex items-center justify-center rounded-xl">
              <img src={`/event/${data.img}`} alt={data.title} className="w-full max-w-[450px] h-auto object-contain rounded-xl filter" />
            </div>
          </div>

          <h2 className="text-xl font-bold mb-4 text-center leading-snug text-[#000033]">{data.catchcopy}</h2>
          <div className="text-sm leading-relaxed mb-6 ml-6 text-gray-800 font-medium">
            {data.explanation.split("\n").map((line: string, i: number) => (<p key={i}>{line}</p>))}
          </div>

          <div className="bg-[#000033] rounded-xl p-4 border border-gray-700 text-white shadow-inner">
            <h3 className="text-lg font-bold text-blue-300 mb-2 text-center">
              Cosmo Baseでの過ごし方
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed text-center">{data.howToSpend}</p>

            <div className="w-full max-w-md p-5">
              <h3 className="text-slg font-bold mb-4 text-center">あなたにおすすめのコンテンツ</h3>
              <div className="flex flex-col gap-3">
                {data.contents.map((content: string, idx: number) => {
                  const url = CONTENT_LINKS[content] || "#";
                  return (
                    <a
                      key={idx}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl flex items-center justify-between cursor-pointer hover:bg-gray-700 transition shadow-md group">
                        <span className="font-bold text-gray-100">{content}</span>
                        <span className="text-blue-400 text-xl group-hover:translate-x-1 transition-transform">›</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md flex flex-col items-center">
        <div className="bg-blue-900/40 text-blue-200 px-4 py-2 rounded-full text-sm font-bold mb-4">
          ✨ 専門知識は一切いりません ✨
        </div>
        <p className="text-sm text-gray-400 mb-2">同じタイプの人が集まる場所はこちら</p>
        <a href="https://discord.gg/X78w86XE3v" target="_blank" rel="noopener noreferrer" className="w-full">
          <button className="group relative inline-flex items-center gap-3 rounded-full px-6 py-4 w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold text-lg shadow-lg transform transition hover:scale-105 mb-6">
            <img src="/event/CB_icon.png" className="h-8 w-8" />
            無料でCosmo Baseに参加する
          </button>
        </a>

        <div className="text-center w-full pt-6 border-t border-gray-800">
          <p className="text-sm text-gray-400 mb-4">あなたの結果をシェアして仲間を見つけよう</p>
          <div className="flex flex-col gap-3">
            <button onClick={handleXShare} className="flex items-center justify-center w-full gap-2 bg-black border border-gray-600 hover:bg-gray-900 text-white font-bold py-3 rounded-full text-sm transition">
              <img src="/event/X.png" alt="X icon" className="w-4 h-4" aria-hidden="true" />
              X (Twitter) で結果をシェア
            </button>
            <button onClick={handleInstagramShare} className="flex items-center justify-center w-full gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90 text-white font-bold py-3 rounded-full text-sm transition shadow-md">
              <img src="/event/Instagram.png" alt="Instagram icon" className="w-5 h-5" aria-hidden="true" />
              Instagram で結果をシェア
            </button>
          </div>
        </div>
      </div>
      <FullDiagnosisCard />

      <div className="w-full max-w-md mt-8 pt-6 border-t border-gray-800 text-center">
        <Link href="/kurawaku2" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors inline-flex items-center gap-1">
          <ArrowLeft className="h-3 w-3" />
          くらわくトーク#2 イベントページに戻る
        </Link>
      </div>
    </div>
  );
}

export function SpaceType({ eventId = "type" }: { eventId?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isFading, setIsFading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = score;
    setAnswers(newAnswers);
    setIsFading(true);

    setTimeout(() => {
      if (currentIndex < QUESTIONS.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setIsFading(false);
      } else {
        setIsLoading(true);
        setIsFading(false);
      }
    }, 300);
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        setIsFading(false);
      }, 300);
    }
  };

  useEffect(() => {
    if (isLoading) {
      const sendDataToSheet = async () => {
        try {
          const R = answers[0] || 0;
          const D = answers[1] || 0;
          const I = answers[2] || 0;
          const E = answers[3] || 0;
          const axis1 = R >= D ? 'R' : 'D';
          const axis2 = I >= E ? 'I' : 'O';
          const resultType = `${axis1}${axis2}`;
          await sendToGas({ type: "タイプ診断", eventId, answers, resultType });
        } catch (error) {
          // sendToGas handles network failures internally
        }
      };

      sendDataToSheet();

      const timer = setTimeout(() => {
        setIsLoading(false);
        setIsFinished(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isLoading, answers]);

  if (isFinished) {
    return <ResultScreen answers={answers} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col items-center justify-center p-6 space-y-6">
        <div className="text-6xl animate-bounce">🚀</div>
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold tracking-widest animate-pulse">診断中...</h2>
          <p className="text-sm text-gray-400">あなたの宇宙タイプを分析しています</p>
        </div>
      </div>
    );
  }

  const progressPercentage = ((currentIndex + 1) / QUESTIONS.length) * 100;
  const isLastQuestion = currentIndex === QUESTIONS.length - 1;

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col max-w-md mx-auto relative font-sans">
      <div className="p-6 pt-10">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handleBack}
            className={`text-sm text-gray-500 flex items-center transition-opacity ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:text-gray-300'}`}
          >
            <span className="mr-1">〈</span> 戻る
          </button>
          {isLastQuestion ? (
            <span className="text-sm font-bold text-blue-400">最後の質問！</span>
          ) : (
            <span className="text-sm text-gray-400">あと {QUESTIONS.length - currentIndex - 1} 問</span>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span>質問 {currentIndex + 1} / {QUESTIONS.length}</span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className={`flex-1 flex flex-col justify-center p-6 transition-opacity duration-300 ${isFading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        <h2 className="text-2xl font-bold leading-relaxed mb-12 text-center">
          {QUESTIONS[currentIndex].text}
        </h2>
        <div className="space-y-6 mt-auto mb-10">
          <div className="flex justify-between text-xs text-gray-400 font-medium px-2">
            <span>まったくそう思わない</span>
            <span>とてもそう思う</span>
          </div>
          <div className="flex justify-between items-center px-2">
            {[1, 2, 3, 4, 5].map((score) => {
              const sizeClass =
                score === 1 || score === 5 ? 'w-12 h-12' :
                  score === 2 || score === 4 ? 'w-10 h-10' :
                    'w-8 h-8';
              return (
                <button key={score} onClick={() => handleAnswer(score)} className="group flex flex-col items-center gap-3 focus:outline-none">
                  <div
                    className={`${sizeClass} rounded-full border-2 border-gray-600 flex items-center justify-center bg-gray-800 hover:bg-blue-600 hover:border-blue-400 transition-colors duration-200 shadow-lg active:scale-95`}
                  ></div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

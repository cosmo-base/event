// src/data/CMconstellationSVG.tsx
import React from 'react';

// 星座のslug（ID）をキーにして、SVGのパスデータを管理するオブジェクト
// viewBoxは "0 0 100 100" を想定して描画（0〜100のパーセンテージ感覚で配置できます）
export const ConstellationSVGs: Record<string, React.ReactNode> = {
  "And": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">
        <circle cx="15" cy="15" r="0.4" fill="currentColor" opacity="0.3" /><circle cx="80" cy="80" r="0.3" fill="currentColor" opacity="0.4" /><circle cx="85" cy="20" r="0.5" fill="currentColor" opacity="0.3" />
        <ellipse cx="70" cy="35" rx="4" ry="1.5" fill="currentColor" opacity="0.4" transform="rotate(-45 70 35)" />
        <ellipse cx="70" cy="35" rx="2" ry="0.8" fill="currentColor" opacity="0.7" transform="rotate(-45 70 35)" />
        <polyline points="20,70 45,50 65,30 85,20" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" />
        <polyline points="45,50 30,30 25,15" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" />
        <line x1="65" y1="30" x2="60" y2="15" stroke="currentColor" strokeWidth="0.6" opacity="0.8" />
        <polyline points="25,15 10,5" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.5" strokeDasharray="1 1.5" />
        <polyline points="85,20 95,10" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.5" strokeDasharray="1 1.5" />
        <circle cx="20" cy="70" r="1.4" fill="currentColor" /> <circle cx="45" cy="50" r="1.2" fill="currentColor" /> <circle cx="65" cy="30" r="1.2" fill="currentColor" /> <circle cx="85" cy="20" r="0.8" fill="currentColor" />
        <circle cx="30" cy="30" r="0.9" fill="currentColor" />
        <circle cx="25" cy="15" r="0.8" fill="currentColor" />
        <circle cx="60" cy="15" r="0.8" fill="currentColor" />
      </svg>
    </>
  ),
  "Mon": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
        <circle cx="10" cy="50" r="0.3" fill="currentColor" opacity="0.2" /><circle cx="90" cy="40" r="0.4" fill="currentColor" opacity="0.3" /><circle cx="30" cy="80" r="0.3" fill="currentColor" opacity="0.3" />
        <circle cx="40" cy="35" r="3" fill="currentColor" opacity="0.3" />
        <circle cx="40" cy="35" r="1.5" fill="currentColor" opacity="0.5" />
        <polyline points="20,50 45,60 70,55 85,30" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.6" />
        <line x1="45" y1="60" x2="55" y2="80" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
        <line x1="70" y1="55" x2="65" y2="70" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
        <line x1="85" y1="30" x2="95" y2="15" stroke="currentColor" strokeWidth="0.3" opacity="0.4" strokeDasharray="1 1.5" />
        <circle cx="20" cy="50" r="0.8" fill="currentColor" opacity="0.8" />
        <circle cx="45" cy="60" r="0.9" fill="currentColor" opacity="0.8" />
        <circle cx="70" cy="55" r="0.9" fill="currentColor" opacity="0.8" />
        <circle cx="85" cy="30" r="0.8" fill="currentColor" opacity="0.8" />
        <circle cx="55" cy="80" r="0.7" fill="currentColor" opacity="0.8" />
        <circle cx="65" cy="70" r="0.7" fill="currentColor" opacity="0.8" />
      </svg>
    </>
  ),
  "Sgr": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">
        <circle cx="80" cy="20" r="0.5" fill="currentColor" opacity="0.4" /><circle cx="75" cy="30" r="0.3" fill="currentColor" opacity="0.5" /><circle cx="85" cy="40" r="0.4" fill="currentColor" opacity="0.3" /><circle cx="90" cy="25" r="0.6" fill="currentColor" opacity="0.2" /><circle cx="70" cy="15" r="0.3" fill="currentColor" opacity="0.4" /><circle cx="65" cy="25" r="0.4" fill="currentColor" opacity="0.3" /><circle cx="80" cy="50" r="0.5" fill="currentColor" opacity="0.3" />
        <circle cx="75" cy="10" r="2.5" fill="currentColor" opacity="0.4" />
        <circle cx="82" cy="15" r="1.5" fill="currentColor" opacity="0.5" />
        <polyline points="20,40 35,35 50,45 65,30" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" />
        <polyline points="35,35 45,60 65,55 50,45" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" />
        <polyline points="65,30 80,40 65,55" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" />
        <line x1="20" y1="40" x2="30" y2="70" stroke="currentColor" strokeWidth="0.3" opacity="0.5" strokeDasharray="1 1.5" />
        <line x1="45" y1="60" x2="30" y2="70" stroke="currentColor" strokeWidth="0.3" opacity="0.5" strokeDasharray="1 1.5" />
        <circle cx="20" cy="40" r="1.2" fill="currentColor" /> <circle cx="35" cy="35" r="1.2" fill="currentColor" />
        <circle cx="50" cy="45" r="1.2" fill="currentColor" />
        <circle cx="65" cy="30" r="1.2" fill="currentColor" />
        <circle cx="45" cy="60" r="1.2" fill="currentColor" />
        <circle cx="65" cy="55" r="1.2" fill="currentColor" />
        <circle cx="80" cy="40" r="1.2" fill="currentColor" />
        <circle cx="30" cy="70" r="0.9" fill="currentColor" />
      </svg>
    </>
  ),
  "Del": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">
        <circle cx="20" cy="80" r="0.3" fill="currentColor" opacity="0.3" /><circle cx="80" cy="20" r="0.4" fill="currentColor" opacity="0.4" />
        <circle cx="30" cy="75" r="0.5" fill="currentColor" opacity="0.5" />
        <circle cx="35" cy="80" r="0.3" fill="currentColor" opacity="0.6" />
        <polygon points="45,35 65,30 75,45 55,50" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" />
        <line x1="55" y1="50" x2="40" y2="70" stroke="currentColor" strokeWidth="0.6" opacity="0.8" />
        <line x1="65" y1="30" x2="80" y2="25" stroke="currentColor" strokeWidth="0.3" opacity="0.4" strokeDasharray="1 1.5" />
        <line x1="40" y1="70" x2="25" y2="65" stroke="currentColor" strokeWidth="0.3" opacity="0.4" strokeDasharray="1 1.5" />
        <circle cx="45" cy="35" r="1" fill="currentColor" />
        <circle cx="65" cy="30" r="1" fill="currentColor" />
        <circle cx="75" cy="45" r="1" fill="currentColor" />
        <circle cx="55" cy="50" r="1" fill="currentColor" />
        <circle cx="40" cy="70" r="1" fill="currentColor" />
        <circle cx="80" cy="25" r="0.6" fill="currentColor" opacity="0.8" />
        <circle cx="25" cy="65" r="0.6" fill="currentColor" opacity="0.8" />
      </svg>
    </>
  ),
  "Ind": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
        <circle cx="10" cy="10" r="0.3" fill="currentColor" opacity="0.2" /><circle cx="90" cy="90" r="0.4" fill="currentColor" opacity="0.2" />
        <polyline points="50,15 30,50 40,80" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.7" />
        <line x1="30" y1="50" x2="70" y2="45" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
        <line x1="70" y1="45" x2="85" y2="20" stroke="currentColor" strokeWidth="0.3" opacity="0.5" strokeDasharray="1 1.5" />
        <line x1="70" y1="45" x2="60" y2="90" stroke="currentColor" strokeWidth="0.3" opacity="0.5" strokeDasharray="1 1.5" />
        <circle cx="50" cy="15" r="1" fill="currentColor" />
        <circle cx="30" cy="50" r="0.8" fill="currentColor" />
        <circle cx="40" cy="80" r="0.8" fill="currentColor" />
        <circle cx="70" cy="45" r="0.8" fill="currentColor" />
        <circle cx="85" cy="20" r="0.6" fill="currentColor" />
        <circle cx="60" cy="90" r="0.6" fill="currentColor" />
      </svg>
    </>
  ),
  "Psc": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="50" cy="50" r="0.3" fill="currentColor" opacity="0.3" /><circle cx="20" cy="20" r="0.4" fill="currentColor" opacity="0.4" />
        <polyline points="15,20 25,35 40,60 55,85" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.7" />
        <polyline points="55,85 70,65 85,50 90,30" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.7" />
        <polygon points="15,20 5,10 10,5 20,10" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.7" />
        <polygon points="90,30 85,15 95,10 100,20" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.7" />
        <circle cx="55" cy="85" r="1.2" fill="currentColor" /> <circle cx="40" cy="60" r="0.8" fill="currentColor" />
        <circle cx="25" cy="35" r="0.8" fill="currentColor" />
        <circle cx="15" cy="20" r="0.9" fill="currentColor" />
        <circle cx="5" cy="10" r="0.7" fill="currentColor" />
        <circle cx="10" cy="5" r="0.7" fill="currentColor" />
        <circle cx="20" cy="10" r="0.7" fill="currentColor" />
        <circle cx="70" cy="65" r="0.8" fill="currentColor" />
        <circle cx="85" cy="50" r="0.8" fill="currentColor" />
        <circle cx="90" cy="30" r="0.9" fill="currentColor" />
        <circle cx="85" cy="15" r="0.7" fill="currentColor" />
        <circle cx="95" cy="10" r="0.7" fill="currentColor" />
        <circle cx="100" cy="20" r="0.7" fill="currentColor" />
      </svg>
    </>
  ),
  "Lep": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="25" cy="40" r="1" fill="#ff6b6b" opacity="0.8" className="drop-shadow-[0_0_4px_rgba(255,100,100,1)]" />
        <polygon points="40,50 60,45 70,65 45,70" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" />
        <polyline points="40,50 30,35 35,20" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" />
        <polyline points="60,45 55,30 65,15" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" />
        <line x1="70" y1="65" x2="85" y2="80" stroke="currentColor" strokeWidth="0.3" opacity="0.5" strokeDasharray="1 1.5" />
        <line x1="45" y1="70" x2="30" y2="85" stroke="currentColor" strokeWidth="0.3" opacity="0.5" strokeDasharray="1 1.5" />
        <circle cx="40" cy="50" r="1.1" fill="currentColor" />
        <circle cx="60" cy="45" r="1.1" fill="currentColor" />
        <circle cx="70" cy="65" r="1" fill="currentColor" />
        <circle cx="45" cy="70" r="1" fill="currentColor" />
        <circle cx="30" cy="35" r="0.8" fill="currentColor" />
        <circle cx="35" cy="20" r="0.8" fill="currentColor" />
        <circle cx="55" cy="30" r="0.8" fill="currentColor" />
        <circle cx="65" cy="15" r="0.8" fill="currentColor" />
        <circle cx="85" cy="80" r="0.7" fill="currentColor" />
        <circle cx="30" cy="85" r="0.7" fill="currentColor" />
      </svg>
    </>
  ),
  "Boo": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">
        <circle cx="80" cy="20" r="0.3" fill="currentColor" opacity="0.3" /><circle cx="20" cy="80" r="0.4" fill="currentColor" opacity="0.4" />
        <polygon points="50,15 35,40 45,70 65,65 70,35" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" />
        <polyline points="45,70 50,90 65,65" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" />
        <polyline points="35,40 20,30 15,15" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.5" strokeDasharray="1 1.5" />
        <circle cx="50" cy="90" r="2" fill="#ffe0b2" className="drop-shadow-[0_0_10px_rgba(255,200,100,1)]" /> <circle cx="50" cy="15" r="1.1" fill="currentColor" />
        <circle cx="35" cy="40" r="1.1" fill="currentColor" />
        <circle cx="45" cy="70" r="1.1" fill="currentColor" />
        <circle cx="65" cy="65" r="1.1" fill="currentColor" />
        <circle cx="70" cy="35" r="1" fill="currentColor" />
        <circle cx="20" cy="30" r="0.8" fill="currentColor" />
        <circle cx="15" cy="15" r="0.8" fill="currentColor" />
      </svg>
    </>
  ),
  "Hya": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <polyline points="85,15 75,25 60,20 45,40 30,35 15,60 25,80 10,95" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" />
        <polygon points="85,15 90,5 95,10 90,20" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.8" />
        <circle cx="40" cy="30" r="1" fill="currentColor" opacity="0.2" />
        <circle cx="20" cy="45" r="1" fill="currentColor" opacity="0.2" />
        <circle cx="60" cy="20" r="1.5" fill="#ffbaba" className="drop-shadow-[0_0_6px_rgba(255,100,100,0.8)]" /> <circle cx="85" cy="15" r="1" fill="currentColor" />
        <circle cx="90" cy="5" r="0.8" fill="currentColor" />
        <circle cx="95" cy="10" r="0.8" fill="currentColor" />
        <circle cx="90" cy="20" r="0.8" fill="currentColor" />
        <circle cx="75" cy="25" r="1" fill="currentColor" />
        <circle cx="45" cy="40" r="0.9" fill="currentColor" />
        <circle cx="30" cy="35" r="0.9" fill="currentColor" />
        <circle cx="15" cy="60" r="0.9" fill="currentColor" />
        <circle cx="25" cy="80" r="0.9" fill="currentColor" />
        <circle cx="10" cy="95" r="0.9" fill="currentColor" />
      </svg>
    </>
  ),
  "Eri": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <polyline points="80,10 65,15 70,30 50,40 55,55 35,65 40,80 15,90" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.7" />
        <line x1="65" y1="15" x2="55" y2="10" stroke="currentColor" strokeWidth="0.3" opacity="0.4" strokeDasharray="1 1.5" />
        <line x1="35" y1="65" x2="25" y2="60" stroke="currentColor" strokeWidth="0.3" opacity="0.4" strokeDasharray="1 1.5" />
        <circle cx="15" cy="90" r="1.8" fill="#e0f7ff" className="drop-shadow-[0_0_8px_rgba(200,240,255,1)]" /> <circle cx="80" cy="10" r="1.1" fill="currentColor" /> <circle cx="65" cy="15" r="0.9" fill="currentColor" />
        <circle cx="70" cy="30" r="0.9" fill="currentColor" />
        <circle cx="50" cy="40" r="0.9" fill="currentColor" />
        <circle cx="55" cy="55" r="0.9" fill="currentColor" />
        <circle cx="35" cy="65" r="0.9" fill="currentColor" />
        <circle cx="40" cy="80" r="0.9" fill="currentColor" />
        <circle cx="55" cy="10" r="0.6" fill="currentColor" />
        <circle cx="25" cy="60" r="0.6" fill="currentColor" />
      </svg>
    </>
  ),
  "Tau": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="85" cy="20" r="3" fill="#e0f7ff" opacity="0.3" className="drop-shadow-[0_0_6px_rgba(200,240,255,0.8)]" />
        <circle cx="83" cy="18" r="0.6" fill="currentColor" /><circle cx="87" cy="19" r="0.5" fill="currentColor" /><circle cx="84" cy="22" r="0.5" fill="currentColor" /><circle cx="86" cy="21" r="0.4" fill="currentColor" />
        <circle cx="45" cy="55" r="2" fill="currentColor" opacity="0.2" />
        <polyline points="20,20 35,45 50,60 65,40" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <line x1="20" y1="20" x2="10" y2="10" stroke="currentColor" strokeWidth="0.6" opacity="0.8" /> <line x1="65" y1="40" x2="80" y2="10" stroke="currentColor" strokeWidth="0.6" opacity="0.8" /> <polyline points="50,60 55,75 70,85" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.5" strokeDasharray="1 1.5" />
        <circle cx="35" cy="45" r="1.6" fill="#ff9999" className="drop-shadow-[0_0_8px_rgba(255,100,100,1)]" /> <circle cx="20" cy="20" r="1.2" fill="currentColor" />
        <circle cx="50" cy="60" r="1.1" fill="currentColor" />
        <circle cx="65" cy="40" r="1.1" fill="currentColor" />
        <circle cx="10" cy="10" r="0.9" fill="currentColor" /> <circle cx="80" cy="10" r="0.9" fill="currentColor" /> <circle cx="55" cy="75" r="0.7" fill="currentColor" opacity="0.8" />
        <circle cx="70" cy="85" r="0.7" fill="currentColor" opacity="0.8" />
      </svg>
    </>
  ),
  "CMa": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="10" cy="80" r="0.4" fill="currentColor" opacity="0.3" /><circle cx="90" cy="20" r="0.3" fill="currentColor" opacity="0.4" />
        <polygon points="40,35 60,45 75,65 50,75 35,55" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <polyline points="40,35 25,25 20,10" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <polyline points="35,55 20,70 15,90" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <polyline points="75,65 85,85 90,95" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <line x1="60" y1="45" x2="80" y2="40" stroke="currentColor" strokeWidth="0.6" opacity="0.8" /> <circle cx="40" cy="35" r="2.5" fill="#ffffff" className="drop-shadow-[0_0_15px_rgba(200,240,255,1)]" /> <circle cx="60" cy="45" r="1.1" fill="currentColor" />
        <circle cx="75" cy="65" r="1.3" fill="currentColor" /> <circle cx="50" cy="75" r="1.1" fill="currentColor" />
        <circle cx="35" cy="55" r="1.1" fill="currentColor" />
        <circle cx="25" cy="25" r="0.9" fill="currentColor" />
        <circle cx="20" cy="10" r="0.8" fill="currentColor" />
        <circle cx="20" cy="70" r="0.9" fill="currentColor" />
        <circle cx="85" cy="85" r="0.9" fill="currentColor" />
        <circle cx="80" cy="40" r="0.9" fill="currentColor" />
      </svg>
    </>
  ),
  "Lup": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="15" cy="50" r="0.3" fill="currentColor" opacity="0.2" /><circle cx="85" cy="80" r="0.4" fill="currentColor" opacity="0.3" />
        <polygon points="50,30 65,45 60,65 40,65 35,45" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" />
        <polyline points="35,45 20,40 15,25" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <polyline points="60,65 75,80" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <line x1="90" y1="10" x2="65" y2="45" stroke="#ffbaba" strokeWidth="0.4" opacity="0.6" strokeDasharray="2 2" />
        <circle cx="50" cy="30" r="1.1" fill="currentColor" />
        <circle cx="65" cy="45" r="1.1" fill="currentColor" />
        <circle cx="60" cy="65" r="1.1" fill="currentColor" />
        <circle cx="40" cy="65" r="1.1" fill="currentColor" />
        <circle cx="35" cy="45" r="1.1" fill="currentColor" />
        <circle cx="20" cy="40" r="0.9" fill="currentColor" />
        <circle cx="15" cy="25" r="0.8" fill="currentColor" />
        <circle cx="75" cy="80" r="0.9" fill="currentColor" />
      </svg>
    </>
  ),
  "UMa": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="20" cy="80" r="0.3" fill="currentColor" opacity="0.3" /><circle cx="90" cy="20" r="0.4" fill="currentColor" opacity="0.2" />
        <polyline points="60,35 75,25 85,30 80,45 65,45" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.4" strokeDasharray="1 1.5" /> <polyline points="65,45 70,65 65,85 55,85" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.4" strokeDasharray="1 1.5" /> <polyline points="45,45 40,65 25,80 15,80" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.4" strokeDasharray="1 1.5" /> <polyline points="10,20 25,25 40,35 45,45 65,45 60,35 45,45" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.9" /> <line x1="40" y1="35" x2="60" y2="35" stroke="currentColor" strokeWidth="1" opacity="0.9" />
        <circle cx="10" cy="20" r="1.2" fill="currentColor" /> <circle cx="25" cy="25" r="1.2" fill="currentColor" /> <circle cx="23.5" cy="24" r="0.6" fill="currentColor" opacity="0.8" /> <circle cx="40" cy="35" r="1.2" fill="currentColor" />
        <circle cx="45" cy="45" r="1.2" fill="currentColor" /> <circle cx="65" cy="45" r="1.2" fill="currentColor" /> <circle cx="60" cy="35" r="1.2" fill="currentColor" /> <circle cx="75" cy="25" r="0.7" fill="currentColor" opacity="0.6" />
        <circle cx="85" cy="30" r="0.7" fill="currentColor" opacity="0.6" />
        <circle cx="70" cy="65" r="0.8" fill="currentColor" opacity="0.6" />
        <circle cx="55" cy="85" r="0.8" fill="currentColor" opacity="0.6" />
        <circle cx="40" cy="65" r="0.8" fill="currentColor" opacity="0.6" />
        <circle cx="15" cy="80" r="0.8" fill="currentColor" opacity="0.6" />
      </svg>
    </>
  ),
  "Vir": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="20" cy="30" r="0.4" fill="currentColor" opacity="0.2" /><circle cx="80" cy="70" r="0.3" fill="currentColor" opacity="0.3" />
        <ellipse cx="65" cy="25" rx="5" ry="3" fill="currentColor" opacity="0.2" transform="rotate(30 65 25)" />
        <polyline points="45,20 50,40 30,60 15,65" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <polyline points="50,40 70,50 85,80" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <line x1="30" y1="60" x2="45" y2="85" stroke="currentColor" strokeWidth="0.6" opacity="0.8" /> <line x1="50" y1="40" x2="65" y2="25" stroke="currentColor" strokeWidth="0.6" opacity="0.8" /> <polyline points="85,80 90,70 95,75" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.5" strokeDasharray="1 1.5" />
        <circle cx="85" cy="80" r="1.8" fill="#e0f7ff" className="drop-shadow-[0_0_10px_rgba(200,240,255,1)]" /> <circle cx="45" cy="20" r="1.1" fill="currentColor" />
        <circle cx="50" cy="40" r="1.1" fill="currentColor" /> <circle cx="30" cy="60" r="1.1" fill="currentColor" />
        <circle cx="15" cy="65" r="0.9" fill="currentColor" />
        <circle cx="70" cy="50" r="1.1" fill="currentColor" />
        <circle cx="45" cy="85" r="0.9" fill="currentColor" />
        <circle cx="65" cy="25" r="1.1" fill="currentColor" />
      </svg>
    </>
  ),
  "Ari": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="20" cy="20" r="0.3" fill="currentColor" opacity="0.3" /><circle cx="80" cy="80" r="0.4" fill="currentColor" opacity="0.2" /><circle cx="15" cy="70" r="0.5" fill="currentColor" opacity="0.2" />
        <path d="M 65 30 Q 80 40 75 60 Q 60 70 40 65 Q 25 50 35 30 Z" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.3" strokeDasharray="1 2" />
        <polyline points="75,25 60,30 40,45" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.9" />
        <circle cx="75" cy="25" r="0.9" fill="currentColor" /> <circle cx="60" cy="30" r="1.2" fill="currentColor" /> <circle cx="40" cy="45" r="1.4" fill="#fff5cc" className="drop-shadow-[0_0_6px_rgba(255,245,200,0.8)]" /> </svg>
    </>
  ),
  "Ori": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">
        <circle cx="10" cy="20" r="0.3" fill="currentColor" opacity="0.3" /><circle cx="80" cy="15" r="0.4" fill="currentColor" opacity="0.4" /><circle cx="25" cy="85" r="0.3" fill="currentColor" opacity="0.3" /><circle cx="85" cy="90" r="0.5" fill="currentColor" opacity="0.4" />
        <line x1="50" y1="20" x2="35" y2="30" stroke="currentColor" strokeWidth="0.6" opacity="0.7" />
        <line x1="50" y1="20" x2="65" y2="26" stroke="currentColor" strokeWidth="0.6" opacity="0.7" />
        <line x1="35" y1="30" x2="42" y2="50" stroke="currentColor" strokeWidth="0.6" opacity="0.7" />
        <line x1="65" y1="26" x2="58" y2="46" stroke="currentColor" strokeWidth="0.6" opacity="0.7" />
        <polyline points="42,50 50,48 58,46" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" />
        <line x1="42" y1="50" x2="40" y2="80" stroke="currentColor" strokeWidth="0.6" opacity="0.7" />
        <line x1="58" y1="46" x2="70" y2="75" stroke="currentColor" strokeWidth="0.6" opacity="0.7" />
        <polyline points="35,30 20,25 18,35 15,45 17,55 22,65" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.4" strokeDasharray="1 1.5" />
        <polyline points="65,26 75,15 85,10 90,12" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.4" strokeDasharray="1 1.5" />
        <line x1="50" y1="48" x2="48" y2="60" stroke="currentColor" strokeWidth="0.4" opacity="0.5" />
        <circle cx="50" cy="20" r="1.2" fill="currentColor" />
        <circle cx="35" cy="30" r="1.8" fill="#ff9999" /> <circle cx="65" cy="26" r="1.4" fill="currentColor" />
        <circle cx="42" cy="50" r="1.2" fill="currentColor" />
        <circle cx="50" cy="48" r="1.2" fill="currentColor" />
        <circle cx="58" cy="46" r="1.2" fill="currentColor" />
        <circle cx="40" cy="80" r="1.4" fill="currentColor" />
        <circle cx="70" cy="75" r="1.8" fill="#e0f7ff" /> <circle cx="49" cy="54" r="0.8" fill="currentColor" opacity="0.8" />
        <circle cx="48" cy="60" r="1" fill="currentColor" opacity="0.9" /> <circle cx="20" cy="25" r="0.7" fill="currentColor" opacity="0.6" /><circle cx="18" cy="35" r="0.7" fill="currentColor" opacity="0.6" /><circle cx="15" cy="45" r="0.7" fill="currentColor" opacity="0.6" /><circle cx="17" cy="55" r="0.7" fill="currentColor" opacity="0.6" /><circle cx="22" cy="65" r="0.7" fill="currentColor" opacity="0.6" />
        <circle cx="75" cy="15" r="0.7" fill="currentColor" opacity="0.6" /><circle cx="85" cy="10" r="0.7" fill="currentColor" opacity="0.6" /><circle cx="90" cy="12" r="0.7" fill="currentColor" opacity="0.6" />
      </svg>
    </>
  ),
  "Pic": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
        <circle cx="15" cy="15" r="0.3" fill="currentColor" opacity="0.2" /><circle cx="85" cy="85" r="0.4" fill="currentColor" opacity="0.2" />
        <polygon points="30,30 70,25 75,55 35,60" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.3" strokeDasharray="1 2" />
        <polyline points="40,80 50,55 65,90" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.7" />
        <line x1="50" y1="55" x2="55" y2="20" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
        <circle cx="40" cy="80" r="0.9" fill="currentColor" />
        <circle cx="50" cy="55" r="0.9" fill="currentColor" />
        <circle cx="65" cy="90" r="0.9" fill="currentColor" />
        <circle cx="55" cy="20" r="0.8" fill="currentColor" />
      </svg>
    </>
  ),
  "Cas": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">
        <circle cx="20" cy="30" r="0.4" fill="currentColor" opacity="0.4" /><circle cx="35" cy="50" r="0.5" fill="currentColor" opacity="0.3" /><circle cx="50" cy="40" r="0.3" fill="currentColor" opacity="0.5" /><circle cx="65" cy="60" r="0.4" fill="currentColor" opacity="0.4" /><circle cx="80" cy="35" r="0.6" fill="currentColor" opacity="0.3" />
        <ellipse cx="50" cy="50" rx="40" ry="15" fill="currentColor" opacity="0.1" transform="rotate(-15 50 50)" />
        <polyline points="15,25 35,65 55,45 75,75 90,20" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.9" />
        <circle cx="15" cy="25" r="1.1" fill="currentColor" /> <circle cx="35" cy="65" r="1.2" fill="currentColor" /> <circle cx="55" cy="45" r="1.1" fill="currentColor" /> <circle cx="75" cy="75" r="1.1" fill="currentColor" /> <circle cx="90" cy="20" r="1" fill="currentColor" />
      </svg>
    </>
  ),
  "Dor": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="10" cy="20" r="0.3" fill="currentColor" opacity="0.2" /><circle cx="90" cy="20" r="0.4" fill="currentColor" opacity="0.2" />
        <ellipse cx="75" cy="75" rx="15" ry="10" fill="#e0f7ff" opacity="0.2" className="drop-shadow-[0_0_10px_rgba(200,240,255,0.5)]" />
        <circle cx="70" cy="70" r="2" fill="currentColor" opacity="0.4" />
        <circle cx="80" cy="78" r="1.5" fill="currentColor" opacity="0.3" />
        <polyline points="20,15 45,40 65,60 85,85" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" />
        <polyline points="45,40 60,30 65,60" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.5" strokeDasharray="1 1.5" />
        <circle cx="20" cy="15" r="1.2" fill="currentColor" />
        <circle cx="45" cy="40" r="1" fill="currentColor" />
        <circle cx="65" cy="60" r="1" fill="currentColor" />
        <circle cx="85" cy="85" r="0.9" fill="currentColor" />
        <circle cx="60" cy="30" r="0.7" fill="currentColor" opacity="0.8" />
      </svg>
    </>
  ),
  "Cnc": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="15" cy="20" r="0.4" fill="currentColor" opacity="0.3" /><circle cx="85" cy="80" r="0.5" fill="currentColor" opacity="0.2" />
        <circle cx="50" cy="45" r="6" fill="#e0f7ff" opacity="0.15" className="drop-shadow-[0_0_10px_rgba(200,240,255,0.6)]" />
        <circle cx="48" cy="43" r="0.6" fill="currentColor" opacity="0.8" /><circle cx="52" cy="47" r="0.5" fill="currentColor" opacity="0.7" /><circle cx="49" cy="48" r="0.7" fill="currentColor" opacity="0.6" /><circle cx="53" cy="42" r="0.5" fill="currentColor" opacity="0.8" />
        <polyline points="20,25 40,40 50,60" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" />
        <line x1="40" y1="40" x2="65" y2="30" stroke="currentColor" strokeWidth="0.6" opacity="0.8" />
        <line x1="50" y1="60" x2="80" y2="75" stroke="currentColor" strokeWidth="0.6" opacity="0.8" />
        <path d="M 20 25 Q 10 15 25 10" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.5" strokeDasharray="1 1.5" />
        <path d="M 65 30 Q 75 15 85 25" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.5" strokeDasharray="1 1.5" />
        <circle cx="40" cy="40" r="1" fill="currentColor" /> <circle cx="50" cy="60" r="1.1" fill="currentColor" /> <circle cx="20" cy="25" r="0.9" fill="currentColor" />
        <circle cx="65" cy="30" r="0.9" fill="currentColor" />
        <circle cx="80" cy="75" r="0.9" fill="currentColor" />
      </svg>
    </>
  ),
  "Com": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
        <circle cx="45" cy="30" r="0.4" fill="currentColor" opacity="0.6" /><circle cx="55" cy="25" r="0.5" fill="currentColor" opacity="0.5" /><circle cx="50" cy="40" r="0.6" fill="currentColor" opacity="0.7" /><circle cx="60" cy="45" r="0.4" fill="currentColor" opacity="0.5" /><circle cx="40" cy="50" r="0.5" fill="currentColor" opacity="0.6" /><circle cx="65" cy="35" r="0.3" fill="currentColor" opacity="0.5" /><circle cx="35" cy="40" r="0.4" fill="currentColor" opacity="0.4" />
        <ellipse cx="50" cy="40" rx="15" ry="25" fill="#e0f7ff" opacity="0.05" transform="rotate(-15 50 40)" />
        <polyline points="25,75 25,55 75,70" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.7" />
        <polyline points="45,20 50,40 55,60" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.4" strokeDasharray="1 2" />
        <polyline points="60,25 65,45 70,65" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.4" strokeDasharray="1 2" />
        <polyline points="35,30 40,50 45,70" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.4" strokeDasharray="1 2" />
        <circle cx="25" cy="75" r="0.9" fill="currentColor" />
        <circle cx="25" cy="55" r="0.9" fill="currentColor" />
        <circle cx="75" cy="70" r="0.9" fill="currentColor" />
      </svg>
    </>
  ),
  "Cha": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
        <circle cx="10" cy="20" r="0.3" fill="currentColor" opacity="0.2" /><circle cx="85" cy="85" r="0.4" fill="currentColor" opacity="0.2" />
        <polygon points="30,45 50,35 70,55 45,65" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.7" />
        <line x1="70" y1="55" x2="90" y2="30" stroke="currentColor" strokeWidth="0.3" opacity="0.5" strokeDasharray="1 1.5" /> <path d="M 30 45 Q 15 55 25 70 Q 35 60 28 55" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.5" strokeDasharray="1 1.5" /> <circle cx="30" cy="45" r="0.9" fill="currentColor" />
        <circle cx="50" cy="35" r="0.9" fill="currentColor" />
        <circle cx="70" cy="55" r="0.9" fill="currentColor" />
        <circle cx="45" cy="65" r="0.9" fill="currentColor" />
        <circle cx="90" cy="30" r="0.5" fill="currentColor" opacity="0.5" />
      </svg>
    </>
  ),
  "Crv": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <polyline points="10,90 50,85 90,95" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.3" strokeDasharray="2 3" />
        <polygon points="35,30 75,25 65,65 25,60" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.9" />
        <line x1="25" y1="60" x2="15" y2="75" stroke="currentColor" strokeWidth="0.7" opacity="0.9" /> <line x1="75" y1="25" x2="90" y2="15" stroke="currentColor" strokeWidth="0.3" opacity="0.5" strokeDasharray="1 1.5" /> <polyline points="65,65 85,55" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.5" strokeDasharray="1 1.5" /> <circle cx="35" cy="30" r="1.1" fill="currentColor" /> <circle cx="75" cy="25" r="1.1" fill="currentColor" /> <circle cx="65" cy="65" r="1.1" fill="currentColor" /> <circle cx="25" cy="60" r="1" fill="currentColor" /> <circle cx="15" cy="75" r="0.9" fill="currentColor" />
      </svg>
    </>
  ),
  "CrB": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="20" cy="20" r="0.4" fill="currentColor" opacity="0.2" /><circle cx="80" cy="80" r="0.3" fill="currentColor" opacity="0.3" />
        <polyline points="20,25 25,45 40,65 60,65 75,45 80,25" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" />
        <path d="M 20 25 Q 50 15 80 25" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.4" strokeDasharray="1 2" />
        <circle cx="50" cy="67" r="1.4" fill="#e0f7ff" className="drop-shadow-[0_0_8px_rgba(200,240,255,1)]" /> <circle cx="40" cy="65" r="1" fill="currentColor" />
        <circle cx="60" cy="65" r="1" fill="currentColor" />
        <circle cx="25" cy="45" r="0.9" fill="currentColor" />
        <circle cx="75" cy="45" r="0.9" fill="currentColor" />
        <circle cx="20" cy="25" r="0.9" fill="currentColor" />
        <circle cx="80" cy="25" r="0.9" fill="currentColor" />
      </svg>
    </>
  ),
  "Tuc": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
        <circle cx="15" cy="15" r="0.3" fill="currentColor" opacity="0.2" /><circle cx="85" cy="15" r="0.4" fill="currentColor" opacity="0.2" />
        <ellipse cx="80" cy="70" rx="12" ry="8" fill="#e0f7ff" opacity="0.2" className="drop-shadow-[0_0_8px_rgba(200,240,255,0.5)]" />
        <circle cx="76" cy="68" r="1" fill="currentColor" opacity="0.5" />
        <polyline points="20,80 40,50 60,30" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.7" />
        <line x1="40" y1="50" x2="55" y2="70" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
        <polygon points="60,30 90,20 70,40" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.4" strokeDasharray="1 1.5" />
        <circle cx="60" cy="30" r="1.1" fill="currentColor" />
        <circle cx="40" cy="50" r="0.9" fill="currentColor" />
        <circle cx="20" cy="80" r="0.9" fill="currentColor" />
        <circle cx="55" cy="70" r="0.9" fill="currentColor" />
      </svg>
    </>
  ),
  "Aur": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="85" cy="85" r="0.4" fill="currentColor" opacity="0.3" /><circle cx="10" cy="40" r="0.3" fill="currentColor" opacity="0.3" />
        <circle cx="60" cy="80" r="0.4" fill="currentColor" opacity="0.4" /><circle cx="70" cy="50" r="0.3" fill="currentColor" opacity="0.5" />
        <polygon points="40,15 75,30 65,75 25,65 15,35" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" />
        <polyline points="35,25 30,30 35,35" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.6" /> <circle cx="40" cy="15" r="2" fill="#fff5cc" className="drop-shadow-[0_0_12px_rgba(255,245,200,1)]" /> <circle cx="75" cy="30" r="1.1" fill="currentColor" /> <circle cx="65" cy="75" r="1.1" fill="currentColor" />
        <circle cx="25" cy="65" r="1.1" fill="currentColor" /> <circle cx="15" cy="35" r="1.1" fill="currentColor" />
        <circle cx="35" cy="25" r="0.8" fill="currentColor" />
        <circle cx="30" cy="30" r="0.8" fill="currentColor" />
        <circle cx="35" cy="35" r="0.8" fill="currentColor" />
      </svg>
    </>
  ),
  "Cam": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
        <circle cx="15" cy="15" r="0.3" fill="currentColor" opacity="0.2" /><circle cx="85" cy="50" r="0.4" fill="currentColor" opacity="0.2" />
        <polyline points="75,15 65,35 45,45 25,60 15,85" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.6" />
        <line x1="45" y1="45" x2="65" y2="70" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
        <line x1="25" y1="60" x2="35" y2="90" stroke="currentColor" strokeWidth="0.3" opacity="0.4" strokeDasharray="1 1.5" />
        <line x1="75" y1="15" x2="85" y2="10" stroke="currentColor" strokeWidth="0.3" opacity="0.4" strokeDasharray="1 1.5" />
        <circle cx="75" cy="15" r="0.8" fill="currentColor" opacity="0.8" />
        <circle cx="65" cy="35" r="0.8" fill="currentColor" opacity="0.8" />
        <circle cx="45" cy="45" r="0.8" fill="currentColor" opacity="0.8" />
        <circle cx="25" cy="60" r="0.8" fill="currentColor" opacity="0.8" />
        <circle cx="15" cy="85" r="0.8" fill="currentColor" opacity="0.8" />
        <circle cx="65" cy="70" r="0.8" fill="currentColor" opacity="0.8" />
      </svg>
    </>
  ),
  "Pav": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="10" cy="90" r="0.3" fill="currentColor" opacity="0.3" /><circle cx="90" cy="10" r="0.4" fill="currentColor" opacity="0.2" />
        <polyline points="25,25 45,40 55,60 40,75 25,65" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.7" />
        <path d="M 45 40 Q 75 20 85 50 Q 75 80 55 60" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.4" strokeDasharray="1 2" />
        <line x1="45" y1="40" x2="65" y2="35" stroke="currentColor" strokeWidth="0.3" opacity="0.4" strokeDasharray="1 2" />
        <line x1="50" y1="50" x2="75" y2="50" stroke="currentColor" strokeWidth="0.3" opacity="0.4" strokeDasharray="1 2" />
        <circle cx="25" cy="25" r="1.4" fill="#e0f7ff" className="drop-shadow-[0_0_8px_rgba(200,240,255,1)]" /> <circle cx="45" cy="40" r="0.9" fill="currentColor" />
        <circle cx="55" cy="60" r="0.9" fill="currentColor" />
        <circle cx="40" cy="75" r="0.9" fill="currentColor" />
        <circle cx="25" cy="65" r="0.9" fill="currentColor" />
        <circle cx="65" cy="35" r="0.6" fill="currentColor" opacity="0.7" />
        <circle cx="75" cy="50" r="0.6" fill="currentColor" opacity="0.7" />
        <circle cx="85" cy="50" r="0.6" fill="currentColor" opacity="0.7" />
      </svg>
    </>
  ),
  "Cet": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="15" cy="85" r="0.4" fill="currentColor" opacity="0.3" /><circle cx="90" cy="15" r="0.3" fill="currentColor" opacity="0.4" />
        <circle cx="45" cy="55" r="3" fill="#ff9999" opacity="0.2" className="drop-shadow-[0_0_10px_rgba(255,100,100,0.6)]" />
        <polygon points="75,25 85,35 70,45 60,30" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <polyline points="70,45 45,55 30,50 15,65" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <polyline points="15,65 25,80 35,75 30,50" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <polyline points="45,55 50,75 60,80" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.5" strokeDasharray="1 1.5" />
        <circle cx="45" cy="55" r="1.3" fill="#ffbaba" /> <circle cx="75" cy="25" r="1.1" fill="currentColor" /> <circle cx="85" cy="35" r="1" fill="currentColor" />
        <circle cx="70" cy="45" r="1" fill="currentColor" />
        <circle cx="60" cy="30" r="1" fill="currentColor" />
        <circle cx="30" cy="50" r="1.1" fill="currentColor" />
        <circle cx="15" cy="65" r="1.1" fill="currentColor" /> <circle cx="25" cy="80" r="0.9" fill="currentColor" />
        <circle cx="35" cy="75" r="0.9" fill="currentColor" />
      </svg>
    </>
  ),
  "Cep": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="20" cy="20" r="0.3" fill="currentColor" opacity="0.3" /><circle cx="80" cy="80" r="0.4" fill="currentColor" opacity="0.2" />
        <circle cx="40" cy="80" r="0.4" fill="currentColor" opacity="0.4" /><circle cx="60" cy="70" r="0.3" fill="currentColor" opacity="0.5" />
        <polygon points="50,20 30,45 35,70 65,70 70,45" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" />
        <line x1="50" y1="20" x2="50" y2="10" stroke="currentColor" strokeWidth="0.6" opacity="0.8" /> <polyline points="30,45 40,35 50,45 60,35 70,45" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.5" strokeDasharray="1 1.5" />
        <circle cx="60" cy="75" r="1.5" fill="#ff6b6b" className="drop-shadow-[0_0_10px_rgba(255,100,100,0.8)]" /> <circle cx="50" cy="20" r="1.1" fill="currentColor" /> <circle cx="30" cy="45" r="1.1" fill="currentColor" /> <circle cx="70" cy="45" r="1" fill="currentColor" />
        <circle cx="35" cy="70" r="1" fill="currentColor" />
        <circle cx="65" cy="70" r="1" fill="currentColor" />
        <circle cx="50" cy="10" r="0.8" fill="currentColor" />
      </svg>
    </>
  ),
  "Cen": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="20" cy="80" r="2.5" fill="currentColor" opacity="0.1" className="drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
        <polyline points="45,20 60,35 55,60 80,75" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <polyline points="55,60 30,65 15,85" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <line x1="30" y1="65" x2="35" y2="85" stroke="currentColor" strokeWidth="0.6" opacity="0.8" /> <line x1="60" y1="35" x2="85" y2="25" stroke="currentColor" strokeWidth="0.3" opacity="0.5" strokeDasharray="1 1.5" />
        <circle cx="15" cy="85" r="2.2" fill="#fff5cc" className="drop-shadow-[0_0_12px_rgba(255,245,200,1)]" /> <circle cx="35" cy="85" r="1.8" fill="#e0f7ff" /> <circle cx="45" cy="20" r="1" fill="currentColor" />
        <circle cx="60" cy="35" r="1.1" fill="currentColor" />
        <circle cx="55" cy="60" r="1.1" fill="currentColor" />
        <circle cx="80" cy="75" r="1" fill="currentColor" />
        <circle cx="30" cy="65" r="1.1" fill="currentColor" />
        <circle cx="85" cy="25" r="0.8" fill="currentColor" /> <circle cx="10" cy="65" r="0.5" fill="currentColor" opacity="0.4" />
        <circle cx="5" cy="70" r="0.5" fill="currentColor" opacity="0.4" />
        <circle cx="15" cy="70" r="0.5" fill="currentColor" opacity="0.4" />
        <circle cx="10" cy="75" r="0.5" fill="currentColor" opacity="0.4" />
      </svg>
    </>
  ),
  "Mic": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
        <circle cx="10" cy="10" r="0.3" fill="currentColor" opacity="0.2" /><circle cx="90" cy="90" r="0.4" fill="currentColor" opacity="0.2" />
        <polygon points="40,75 70,75 65,85 45,85" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.3" strokeDasharray="1 2" />
        <polyline points="60,35 55,55 45,65" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.3" strokeDasharray="1 2" />
        <polyline points="40,30 60,45 50,70" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.6" />
        <circle cx="40" cy="30" r="0.8" fill="currentColor" opacity="0.8" />
        <circle cx="60" cy="45" r="0.8" fill="currentColor" opacity="0.8" />
        <circle cx="50" cy="70" r="0.8" fill="currentColor" opacity="0.8" />
      </svg>
    </>
  ),
  "CMi": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="15" cy="80" r="0.3" fill="currentColor" opacity="0.3" /><circle cx="85" cy="15" r="0.4" fill="currentColor" opacity="0.4" />
        <path d="M 35 40 Q 30 25 45 20 Q 60 25 55 40 Q 70 60 65 80 Q 40 85 30 75 Z" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.3" strokeDasharray="1 2" />
        <line x1="45" y1="45" x2="65" y2="35" stroke="currentColor" strokeWidth="0.7" opacity="0.9" />
        <circle cx="45" cy="45" r="2" fill="#fffbe6" className="drop-shadow-[0_0_12px_rgba(255,250,200,1)]" /> <circle cx="65" cy="35" r="1.1" fill="currentColor" />
      </svg>
    </>
  ),
  "Equ": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
        <circle cx="20" cy="20" r="0.3" fill="currentColor" opacity="0.3" /><circle cx="80" cy="80" r="0.4" fill="currentColor" opacity="0.2" />
        <path d="M 60 30 Q 75 40 70 60 Q 50 65 40 50 Z" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.3" strokeDasharray="1 2" />
        <polygon points="55,35 65,45 55,55 45,45" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.8" />
        <circle cx="55" cy="35" r="0.9" fill="currentColor" /> <circle cx="65" cy="45" r="0.8" fill="currentColor" />
        <circle cx="55" cy="55" r="0.8" fill="currentColor" />
        <circle cx="45" cy="45" r="0.8" fill="currentColor" />
      </svg>
    </>
  ),
  "Vul": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
        <circle cx="20" cy="50" r="0.4" fill="currentColor" opacity="0.3" /><circle cx="80" cy="40" r="0.5" fill="currentColor" opacity="0.4" />
        <circle cx="65" cy="50" r="3" fill="#a8ffb2" opacity="0.2" className="drop-shadow-[0_0_6px_rgba(150,255,150,0.6)]" />
        <circle cx="63" cy="50" r="1.5" fill="#ffbaba" opacity="0.4" />
        <circle cx="67" cy="50" r="1.5" fill="#ffbaba" opacity="0.4" />
        <polyline points="25,45 50,55 75,45" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.7" />
        <ellipse cx="80" cy="40" rx="3" ry="5" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.4" strokeDasharray="1 1.5" transform="rotate(30 80 40)" />
        <circle cx="25" cy="45" r="0.9" fill="currentColor" opacity="0.9" />
        <circle cx="50" cy="55" r="0.9" fill="currentColor" opacity="0.9" /> <circle cx="75" cy="45" r="0.8" fill="currentColor" opacity="0.9" />
      </svg>
    </>
  ),
  "UMi": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">
        <circle cx="80" cy="20" r="20" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.2" strokeDasharray="2 4" />
        <circle cx="80" cy="20" r="40" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.1" strokeDasharray="2 4" />
        <circle cx="80" cy="20" r="60" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.05" strokeDasharray="2 4" />
        <polyline points="80,20 65,30 50,45 35,50" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.9" /> <polygon points="35,50 25,70 40,80 50,60" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.9" /> <circle cx="80" cy="20" r="1.6" fill="#fffbe6" className="drop-shadow-[0_0_10px_rgba(255,250,200,1)]" /> <circle cx="65" cy="30" r="0.8" fill="currentColor" />
        <circle cx="50" cy="45" r="0.9" fill="currentColor" />
        <circle cx="35" cy="50" r="0.9" fill="currentColor" />
        <circle cx="25" cy="70" r="1.1" fill="currentColor" /> <circle cx="40" cy="80" r="1.1" fill="currentColor" /> <circle cx="50" cy="60" r="0.9" fill="currentColor" />
      </svg>
    </>
  ),
  "LMi": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
        <circle cx="15" cy="15" r="0.3" fill="currentColor" opacity="0.3" /><circle cx="85" cy="85" r="0.4" fill="currentColor" opacity="0.2" />
        <path d="M 40 40 Q 60 20 70 40 Q 65 65 45 60 Q 30 50 40 40 Z" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.3" strokeDasharray="1 2" />
        <polygon points="40,40 65,35 55,60" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.7" />
        <line x1="65" y1="35" x2="80" y2="45" stroke="currentColor" strokeWidth="0.5" opacity="0.7" /> <circle cx="40" cy="40" r="0.9" fill="currentColor" /> <circle cx="65" cy="35" r="0.8" fill="currentColor" />
        <circle cx="55" cy="60" r="0.8" fill="currentColor" />
        <circle cx="80" cy="45" r="0.8" fill="currentColor" />
      </svg>
    </>
  ),
  "Crt": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="20" cy="20" r="0.3" fill="currentColor" opacity="0.3" /><circle cx="80" cy="20" r="0.4" fill="currentColor" opacity="0.3" />
        <polyline points="10,85 50,80 90,90" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.3" strokeDasharray="2 3" />
        <circle cx="75" cy="60" r="0.4" fill="currentColor" opacity="0.5" />
        <circle cx="80" cy="70" r="0.5" fill="currentColor" opacity="0.5" />
        <polyline points="30,30 40,60 60,60 70,30" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <polyline points="40,60 45,75 35,80" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <polyline points="60,60 55,75 65,80" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <circle cx="30" cy="30" r="0.9" fill="currentColor" /> <circle cx="40" cy="60" r="1" fill="currentColor" />
        <circle cx="60" cy="60" r="1" fill="currentColor" />
        <circle cx="70" cy="30" r="0.9" fill="currentColor" />
        <circle cx="45" cy="75" r="0.9" fill="currentColor" />
        <circle cx="35" cy="80" r="0.8" fill="currentColor" />
        <circle cx="55" cy="75" r="0.9" fill="currentColor" />
        <circle cx="65" cy="80" r="0.8" fill="currentColor" />
      </svg>
    </>
  ),
  "Lyr": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">
        <circle cx="55" cy="80" r="3" stroke="#ffbaba" strokeWidth="0.8" fill="none" opacity="0.5" className="drop-shadow-[0_0_4px_rgba(255,150,150,0.8)]" />
        <circle cx="55" cy="80" r="1.5" fill="#e0f7ff" opacity="0.3" />
        <circle cx="15" cy="15" r="0.5" fill="currentColor" opacity="0.4" /><circle cx="85" cy="20" r="0.4" fill="currentColor" opacity="0.5" /><circle cx="80" cy="90" r="0.5" fill="currentColor" opacity="0.3" />
        <polygon points="50,20 35,45 65,40" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <polygon points="35,45 65,40 75,70 45,75" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <line x1="42" y1="44" x2="52" y2="73" stroke="currentColor" strokeWidth="0.3" opacity="0.4" strokeDasharray="1 1" />
        <line x1="50" y1="43" x2="60" y2="72" stroke="currentColor" strokeWidth="0.3" opacity="0.4" strokeDasharray="1 1" />
        <line x1="58" y1="41" x2="68" y2="71" stroke="currentColor" strokeWidth="0.3" opacity="0.4" strokeDasharray="1 1" />
        <circle cx="50" cy="20" r="2.2" fill="#e0f7ff" className="drop-shadow-[0_0_15px_rgba(200,240,255,1)]" /> <circle cx="35" cy="45" r="1.1" fill="currentColor" />
        <circle cx="65" cy="40" r="1.1" fill="currentColor" />
        <circle cx="75" cy="70" r="1.1" fill="currentColor" />
        <circle cx="45" cy="75" r="1.1" fill="currentColor" />
      </svg>
    </>
  ),
  "Cir": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
        <circle cx="20" cy="80" r="0.4" fill="currentColor" opacity="0.3" /><circle cx="80" cy="20" r="0.5" fill="currentColor" opacity="0.2" />
        <circle cx="50" cy="50" r="0.3" fill="currentColor" opacity="0.4" /><circle cx="70" cy="80" r="0.4" fill="currentColor" opacity="0.3" />
        <path d="M 30 70 A 40 40 0 0 0 70 70" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.4" strokeDasharray="1 2" />
        <polyline points="30,70 50,30 65,65" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.7" />
        <line x1="50" y1="30" x2="50" y2="20" stroke="currentColor" strokeWidth="0.5" opacity="0.7" /> <circle cx="50" cy="30" r="1.1" fill="currentColor" />
        <circle cx="30" cy="70" r="0.9" fill="currentColor" />
        <circle cx="65" cy="65" r="0.9" fill="currentColor" />
        <circle cx="50" cy="20" r="0.7" fill="currentColor" opacity="0.8" />
      </svg>
    </>
  ),
  "Ara": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="50" cy="20" r="4" fill="currentColor" opacity="0.15" className="drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
        <circle cx="45" cy="15" r="0.5" fill="currentColor" opacity="0.4" /><circle cx="55" cy="25" r="0.6" fill="currentColor" opacity="0.3" /><circle cx="50" cy="10" r="0.4" fill="currentColor" opacity="0.5" /><circle cx="40" cy="30" r="0.5" fill="currentColor" opacity="0.3" />
        <path d="M 35 45 Q 45 25 50 15 Q 55 35 65 45" stroke="#ffbaba" strokeWidth="0.3" fill="none" opacity="0.5" strokeDasharray="1 1.5" />
        <polygon points="35,45 65,45 75,75 25,75" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" />
        <line x1="30" y1="60" x2="70" y2="60" stroke="currentColor" strokeWidth="0.6" opacity="0.8" />
        <circle cx="35" cy="45" r="1.1" fill="currentColor" />
        <circle cx="65" cy="45" r="1.1" fill="currentColor" />
        <circle cx="25" cy="75" r="1.1" fill="currentColor" />
        <circle cx="75" cy="75" r="1.1" fill="currentColor" />
        <circle cx="30" cy="60" r="0.9" fill="currentColor" />
        <circle cx="70" cy="60" r="0.9" fill="currentColor" />
      </svg>
    </>
  ),
  "Sco": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">
        <circle cx="80" cy="80" r="3" fill="#e0f7ff" opacity="0.2" className="drop-shadow-[0_0_8px_rgba(200,240,255,0.5)]" /> <circle cx="15" cy="20" r="0.4" fill="currentColor" opacity="0.4" /><circle cx="90" cy="50" r="0.3" fill="currentColor" opacity="0.3" /><circle cx="70" cy="85" r="0.5" fill="currentColor" opacity="0.4" />
        <line x1="25" y1="20" x2="10" y2="10" stroke="currentColor" strokeWidth="0.3" opacity="0.5" strokeDasharray="1 1.5" />
        <line x1="35" y1="25" x2="45" y2="10" stroke="currentColor" strokeWidth="0.3" opacity="0.5" strokeDasharray="1 1.5" />
        <polyline points="25,20 30,35 45,45 55,60 50,75 60,85 80,80 85,65 75,55" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.9" />
        <line x1="30" y1="35" x2="35" y2="25" stroke="currentColor" strokeWidth="0.7" opacity="0.9" />
        <circle cx="45" cy="45" r="2" fill="#ff6b6b" className="drop-shadow-[0_0_12px_rgba(255,100,100,1)]" /> <circle cx="25" cy="20" r="1.1" fill="currentColor" /> <circle cx="35" cy="25" r="1.1" fill="currentColor" /> <circle cx="30" cy="35" r="1.1" fill="currentColor" />
        <circle cx="55" cy="60" r="1.1" fill="currentColor" />
        <circle cx="50" cy="75" r="1.1" fill="currentColor" />
        <circle cx="60" cy="85" r="1.1" fill="currentColor" />
        <circle cx="80" cy="80" r="1.2" fill="currentColor" /> <circle cx="85" cy="65" r="1.2" fill="currentColor" /> <circle cx="75" cy="55" r="0.9" fill="currentColor" />
      </svg>
    </>
  ),
  "Tri": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <ellipse cx="70" cy="30" rx="8" ry="4" fill="#e0f7ff" opacity="0.25" className="drop-shadow-[0_0_10px_rgba(200,240,255,0.6)]" transform="rotate(-30 70 30)" />
        <circle cx="70" cy="30" r="1.5" fill="currentColor" opacity="0.5" />
        <circle cx="20" cy="20" r="0.3" fill="currentColor" opacity="0.3" /><circle cx="80" cy="80" r="0.4" fill="currentColor" opacity="0.2" />
        <polygon points="50,15 30,70 70,60" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" />
        <circle cx="50" cy="15" r="1" fill="currentColor" /> <circle cx="30" cy="70" r="1" fill="currentColor" />
        <circle cx="70" cy="60" r="0.9" fill="currentColor" />
      </svg>
    </>
  ),
  "Leo": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">
        <circle cx="10" cy="20" r="0.3" fill="currentColor" opacity="0.3" /><circle cx="90" cy="80" r="0.4" fill="currentColor" opacity="0.2" />
        <polyline points="75,60 85,85 95,85" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.5" strokeDasharray="1 1.5" /> <polyline points="25,50 15,75 5,75" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.5" strokeDasharray="1 1.5" /> <path d="M 70 20 Q 55 15 60 35 Q 65 45 75 60" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <polygon points="75,60 50,65 25,50 35,30 60,35" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <circle cx="75" cy="60" r="1.8" fill="#e0f7ff" className="drop-shadow-[0_0_12px_rgba(200,240,255,1)]" /> <circle cx="25" cy="50" r="1.2" fill="currentColor" /> <circle cx="60" cy="35" r="1.1" fill="currentColor" /> <circle cx="70" cy="20" r="1" fill="currentColor" />
        <circle cx="55" cy="20" r="0.9" fill="currentColor" opacity="0.8" />
        <circle cx="50" cy="65" r="1" fill="currentColor" />
        <circle cx="35" cy="30" r="1.1" fill="currentColor" />
      </svg>
    </>
  ),
  "Nor": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
        <circle cx="50" cy="50" r="5" fill="currentColor" opacity="0.1" className="drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
        <circle cx="40" cy="30" r="0.4" fill="currentColor" opacity="0.4" /><circle cx="60" cy="70" r="0.5" fill="currentColor" opacity="0.3" /><circle cx="30" cy="60" r="0.3" fill="currentColor" opacity="0.5" /><circle cx="70" cy="40" r="0.6" fill="currentColor" opacity="0.3" />
        <line x1="45" y1="45" x2="48" y2="48" stroke="currentColor" strokeWidth="0.2" opacity="0.5" />
        <line x1="55" y1="55" x2="58" y2="58" stroke="currentColor" strokeWidth="0.2" opacity="0.5" />
        <polyline points="20,20 70,70 90,50" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.7" />
        <circle cx="20" cy="20" r="0.9" fill="currentColor" opacity="0.9" />
        <circle cx="70" cy="70" r="0.9" fill="currentColor" opacity="0.9" />
        <circle cx="90" cy="50" r="0.9" fill="currentColor" opacity="0.9" />
      </svg>
    </>
  ),
  "Sct": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <ellipse cx="50" cy="50" rx="20" ry="15" fill="#e0f7ff" opacity="0.25" className="drop-shadow-[0_0_15px_rgba(200,240,255,0.8)]" />
        <circle cx="45" cy="45" r="0.5" fill="currentColor" opacity="0.6" /><circle cx="55" cy="55" r="0.6" fill="currentColor" opacity="0.5" /><circle cx="40" cy="50" r="0.4" fill="currentColor" opacity="0.7" /><circle cx="60" cy="40" r="0.5" fill="currentColor" opacity="0.6" /><circle cx="50" cy="60" r="0.7" fill="currentColor" opacity="0.5" />
        <circle cx="65" cy="35" r="2" fill="currentColor" opacity="0.4" />
        <polygon points="50,15 75,30 65,75 35,75 25,30" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.7" />
        <circle cx="50" cy="15" r="1" fill="currentColor" />
        <circle cx="75" cy="30" r="0.9" fill="currentColor" />
        <circle cx="65" cy="75" r="0.9" fill="currentColor" />
        <circle cx="35" cy="75" r="0.9" fill="currentColor" />
        <circle cx="25" cy="30" r="0.9" fill="currentColor" />
      </svg>
    </>
  ),
  "Cae": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
        <circle cx="10" cy="10" r="0.3" fill="currentColor" opacity="0.2" /><circle cx="85" cy="90" r="0.4" fill="currentColor" opacity="0.2" />
        <polygon points="65,25 75,35 60,50 50,40" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.3" strokeDasharray="1 2" />
        <polyline points="55,45 25,75 35,85" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.7" />
        <line x1="25" y1="75" x2="20" y2="80" stroke="currentColor" strokeWidth="0.5" opacity="0.7" /> <circle cx="55" cy="45" r="0.9" fill="currentColor" opacity="0.9" />
        <circle cx="25" cy="75" r="0.9" fill="currentColor" opacity="0.9" />
        <circle cx="35" cy="85" r="0.8" fill="currentColor" opacity="0.9" />
        <circle cx="20" cy="80" r="0.7" fill="currentColor" opacity="0.9" />
      </svg>
    </>
  ),
  "Scl": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
        <ellipse cx="80" cy="30" rx="8" ry="2" fill="#e0f7ff" opacity="0.3" className="drop-shadow-[0_0_6px_rgba(200,240,255,0.5)]" transform="rotate(-20 80 30)" />
        <circle cx="20" cy="80" r="0.3" fill="currentColor" opacity="0.2" /><circle cx="15" cy="20" r="0.4" fill="currentColor" opacity="0.3" />
        <polyline points="30,80 70,80 60,60 40,60 30,80" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.3" strokeDasharray="1 2" />
        <polyline points="25,25 45,60 85,55" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.7" />
        <circle cx="25" cy="25" r="0.9" fill="currentColor" opacity="0.9" />
        <circle cx="45" cy="60" r="0.9" fill="currentColor" opacity="0.9" />
        <circle cx="85" cy="55" r="0.9" fill="currentColor" opacity="0.9" />
      </svg>
    </>
  ),
  "Gru": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="10" cy="20" r="0.3" fill="currentColor" opacity="0.3" /><circle cx="85" cy="85" r="0.4" fill="currentColor" opacity="0.3" />
        <polyline points="20,80 40,50 65,15" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <polyline points="15,40 40,50 75,65" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <path d="M 15 40 Q 30 20 65 15" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.4" strokeDasharray="1 1.5" />
        <path d="M 75 65 Q 80 30 65 15" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.4" strokeDasharray="1 1.5" />
        <circle cx="40" cy="50" r="1.3" fill="#e0f7ff" className="drop-shadow-[0_0_8px_rgba(200,240,255,1)]" /> <circle cx="20" cy="80" r="1.1" fill="currentColor" />
        <circle cx="65" cy="15" r="1.1" fill="currentColor" /> <circle cx="15" cy="40" r="1" fill="currentColor" />
        <circle cx="75" cy="65" r="1" fill="currentColor" />
      </svg>
    </>
  ),
  "Men": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
        <circle cx="20" cy="20" r="0.3" fill="currentColor" opacity="0.3" /><circle cx="80" cy="80" r="0.4" fill="currentColor" opacity="0.2" />
        <ellipse cx="60" cy="80" rx="20" ry="12" fill="#e0f7ff" opacity="0.2" className="drop-shadow-[0_0_12px_rgba(200,240,255,0.5)]" />
        <circle cx="55" cy="75" r="2" fill="currentColor" opacity="0.4" />
        <circle cx="65" cy="85" r="1.5" fill="currentColor" opacity="0.3" />
        <polyline points="25,75 35,45 65,45 75,75" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.6" />
        <circle cx="35" cy="45" r="0.8" fill="currentColor" opacity="0.8" />
        <circle cx="65" cy="45" r="0.8" fill="currentColor" opacity="0.8" />
        <circle cx="25" cy="75" r="0.7" fill="currentColor" opacity="0.8" />
        <circle cx="75" cy="75" r="0.7" fill="currentColor" opacity="0.8" />
      </svg>
    </>
  ),
  "Lib": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="15" cy="20" r="0.4" fill="currentColor" opacity="0.3" /><circle cx="85" cy="80" r="0.3" fill="currentColor" opacity="0.4" />
        <polygon points="50,25 25,50 50,70 75,50" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" />
        <line x1="25" y1="50" x2="15" y2="40" stroke="currentColor" strokeWidth="0.6" opacity="0.8" />
        <line x1="75" y1="50" x2="85" y2="40" stroke="currentColor" strokeWidth="0.6" opacity="0.8" />
        <polyline points="25,50 20,70 30,70 25,50" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.5" strokeDasharray="1 1.5" />
        <polyline points="75,50 70,70 80,70 75,50" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.5" strokeDasharray="1 1.5" />
        <circle cx="50" cy="25" r="1.1" fill="#e0f7ff" /> <circle cx="50" cy="70" r="1.2" fill="currentColor" /> <circle cx="25" cy="50" r="1" fill="currentColor" />
        <circle cx="75" cy="50" r="1" fill="currentColor" />
        <circle cx="15" cy="40" r="0.9" fill="currentColor" />
        <circle cx="85" cy="40" r="0.9" fill="currentColor" />
      </svg>
    </>
  ),
  "Lac": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
        <circle cx="30" cy="20" r="0.4" fill="currentColor" opacity="0.3" /><circle cx="70" cy="80" r="0.5" fill="currentColor" opacity="0.4" /><circle cx="80" cy="30" r="0.3" fill="currentColor" opacity="0.3" /><circle cx="20" cy="70" r="0.4" fill="currentColor" opacity="0.3" />
        <polyline points="75,15 65,25 70,40 55,50 60,65 45,70 35,85" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.7" />
        <line x1="70" y1="40" x2="85" y2="45" stroke="currentColor" strokeWidth="0.3" opacity="0.4" strokeDasharray="1 1.5" />
        <line x1="55" y1="50" x2="40" y2="40" stroke="currentColor" strokeWidth="0.3" opacity="0.4" strokeDasharray="1 1.5" />
        <circle cx="75" cy="15" r="0.9" fill="currentColor" />
        <circle cx="65" cy="25" r="0.9" fill="currentColor" />
        <circle cx="70" cy="40" r="0.9" fill="currentColor" />
        <circle cx="55" cy="50" r="0.9" fill="currentColor" />
        <circle cx="60" cy="65" r="0.9" fill="currentColor" />
        <circle cx="45" cy="70" r="0.9" fill="currentColor" />
        <circle cx="35" cy="85" r="0.8" fill="currentColor" />
      </svg>
    </>
  ),
  "Hor": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
        <circle cx="20" cy="50" r="0.3" fill="currentColor" opacity="0.2" /><circle cx="80" cy="50" r="0.4" fill="currentColor" opacity="0.2" />
        <circle cx="50" cy="25" r="10" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.4" strokeDasharray="1 1.5" />
        <path d="M 40 85 Q 50 90 60 85" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.5" strokeDasharray="1 2" />
        <polyline points="40,15 60,35 45,75 55,85" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.7" />
        <circle cx="40" cy="15" r="0.9" fill="currentColor" />
        <circle cx="60" cy="35" r="0.9" fill="currentColor" />
        <circle cx="45" cy="75" r="0.9" fill="currentColor" />
        <circle cx="55" cy="85" r="0.9" fill="currentColor" />
      </svg>
    </>
  ),
  "Vol": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="15" cy="15" r="0.3" fill="currentColor" opacity="0.3" /><circle cx="85" cy="85" r="0.4" fill="currentColor" opacity="0.3" />
        <polygon points="50,20 25,45 50,70 75,45" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" />
        <line x1="50" y1="70" x2="50" y2="90" stroke="currentColor" strokeWidth="0.6" opacity="0.8" /> <path d="M 50 95 Q 60 70 75 45" stroke="#e0f7ff" strokeWidth="0.3" fill="none" opacity="0.4" strokeDasharray="2 3" />
        <circle cx="50" cy="20" r="1" fill="currentColor" />
        <circle cx="25" cy="45" r="1.1" fill="currentColor" />
        <circle cx="75" cy="45" r="1.1" fill="currentColor" />
        <circle cx="50" cy="70" r="1" fill="currentColor" />
        <circle cx="50" cy="90" r="0.9" fill="currentColor" />
      </svg>
    </>
  ),
  "Pup": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="70" cy="30" r="2.5" fill="currentColor" opacity="0.3" />
        <circle cx="40" cy="60" r="3" fill="currentColor" opacity="0.25" />
        <circle cx="20" cy="40" r="0.4" fill="currentColor" opacity="0.4" /><circle cx="80" cy="80" r="0.5" fill="currentColor" opacity="0.3" /><circle cx="60" cy="20" r="0.4" fill="currentColor" opacity="0.5" /><circle cx="30" cy="70" r="0.5" fill="currentColor" opacity="0.4" />
        <polyline points="25,25 45,15 65,30 85,25" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <polyline points="45,15 35,50 55,80" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" />
        <line x1="65" y1="30" x2="70" y2="65" stroke="currentColor" strokeWidth="0.6" opacity="0.8" />
        <path d="M 10 90 Q 30 85 55 80 Q 80 75 90 65" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.4" strokeDasharray="1 2" />
        <circle cx="25" cy="25" r="1.1" fill="currentColor" />
        <circle cx="45" cy="15" r="1.2" fill="currentColor" /> <circle cx="65" cy="30" r="1.1" fill="currentColor" />
        <circle cx="85" cy="25" r="1.1" fill="currentColor" />
        <circle cx="35" cy="50" r="1.1" fill="currentColor" />
        <circle cx="55" cy="80" r="1.1" fill="currentColor" />
        <circle cx="70" cy="65" r="1" fill="currentColor" />
      </svg>
    </>
  ),
  "Mus": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="15" cy="15" r="0.3" fill="currentColor" opacity="0.3" /><circle cx="85" cy="85" r="0.4" fill="currentColor" opacity="0.2" />
        <polyline points="50,5 50,15" stroke="#e0f7ff" strokeWidth="0.3" opacity="0.3" strokeDasharray="1 1" />
        <polyline points="45,10 55,10" stroke="#e0f7ff" strokeWidth="0.3" opacity="0.3" strokeDasharray="1 1" />
        <polygon points="30,40 70,45 60,70 40,65" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" />
        <line x1="30" y1="40" x2="60" y2="70" stroke="currentColor" strokeWidth="0.6" opacity="0.8" /> <circle cx="30" cy="40" r="1.1" fill="currentColor" />
        <circle cx="70" cy="45" r="1" fill="currentColor" />
        <circle cx="60" cy="70" r="1.1" fill="currentColor" />
        <circle cx="40" cy="65" r="1" fill="currentColor" />
      </svg>
    </>
  ),
  "Cyg": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">
        <ellipse cx="50" cy="50" rx="30" ry="15" fill="#e0f7ff" opacity="0.15" transform="rotate(45 50 50)" />
        <circle cx="40" cy="25" r="4" fill="#ffbaba" opacity="0.2" className="drop-shadow-[0_0_8px_rgba(255,150,150,0.5)]" /> <circle cx="10" cy="80" r="0.4" fill="currentColor" opacity="0.4" /><circle cx="80" cy="10" r="0.5" fill="currentColor" opacity="0.3" /><circle cx="20" cy="30" r="0.3" fill="currentColor" opacity="0.5" />
        <polyline points="50,15 50,45 50,85" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.9" /> <polyline points="15,30 30,35 50,45 70,35 85,30" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.9" /> <path d="M 15 30 Q 30 15 50 15 Q 70 15 85 30" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.4" strokeDasharray="1 2" />
        <circle cx="50" cy="15" r="2" fill="#ffffff" className="drop-shadow-[0_0_12px_rgba(255,255,255,1)]" /> <circle cx="50" cy="45" r="1.2" fill="currentColor" /> <circle cx="50" cy="85" r="1.3" fill="#ffd700" className="drop-shadow-[0_0_6px_rgba(255,215,0,0.8)]" /> <circle cx="30" cy="35" r="1.1" fill="currentColor" />
        <circle cx="15" cy="30" r="1" fill="currentColor" />
        <circle cx="70" cy="35" r="1.1" fill="currentColor" />
        <circle cx="85" cy="30" r="1" fill="currentColor" />
      </svg>
    </>
  ),
  "Oct": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
        <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.2" strokeDasharray="2 4" />
        <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.1" strokeDasharray="2 4" />
        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.05" strokeDasharray="2 4" />
        <line x1="48" y1="50" x2="52" y2="50" stroke="#e0f7ff" strokeWidth="0.4" opacity="0.5" />
        <line x1="50" y1="48" x2="50" y2="52" stroke="#e0f7ff" strokeWidth="0.4" opacity="0.5" />
        <polygon points="50,20 25,75 75,65" stroke="currentColor" strokeWidth="0.4" fill="none" opacity="0.6" />
        <circle cx="50" cy="20" r="0.8" fill="currentColor" opacity="0.8" />
        <circle cx="25" cy="75" r="0.8" fill="currentColor" opacity="0.8" />
        <circle cx="75" cy="65" r="0.8" fill="currentColor" opacity="0.8" />
        <circle cx="45" cy="40" r="0.6" fill="currentColor" opacity="0.7" />
      </svg>
    </>
  ),
  "Col": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="20" cy="20" r="0.3" fill="currentColor" opacity="0.3" /><circle cx="85" cy="80" r="0.4" fill="currentColor" opacity="0.2" />
        <path d="M 75 15 Q 85 20 95 10" stroke="#a8ffb2" strokeWidth="0.3" fill="none" opacity="0.6" strokeDasharray="1 1.5" />
        <polyline points="25,75 40,55 70,30" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <polyline points="15,40 40,55 60,75" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <circle cx="40" cy="55" r="1.2" fill="currentColor" /> <circle cx="70" cy="30" r="1" fill="currentColor" />
        <circle cx="25" cy="75" r="1" fill="currentColor" />
        <circle cx="15" cy="40" r="0.9" fill="currentColor" />
        <circle cx="60" cy="75" r="0.9" fill="currentColor" />
      </svg>
    </>
  ),
  "Aps": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
        <circle cx="10" cy="15" r="0.3" fill="currentColor" opacity="0.3" /><circle cx="85" cy="85" r="0.4" fill="currentColor" opacity="0.3" />
        <path d="M 40 45 Q 60 70 80 80 Q 90 85 95 90" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.4" strokeDasharray="1 1.5" />
        <path d="M 45 45 Q 65 65 85 70" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.4" strokeDasharray="1 2" />
        <polyline points="20,25 40,45 60,40" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.7" />
        <line x1="40" y1="45" x2="30" y2="60" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
        <circle cx="20" cy="25" r="1.1" fill="currentColor" opacity="0.9" />
        <circle cx="40" cy="45" r="1" fill="currentColor" opacity="0.9" />
        <circle cx="60" cy="40" r="0.9" fill="currentColor" opacity="0.9" />
        <circle cx="30" cy="60" r="0.9" fill="currentColor" opacity="0.9" />
      </svg>
    </>
  ),
  "Gem": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="20" cy="80" r="0.5" fill="currentColor" opacity="0.4" /><circle cx="40" cy="90" r="0.4" fill="currentColor" opacity="0.3" /><circle cx="10" cy="60" r="0.3" fill="currentColor" opacity="0.5" />
        <path d="M 35 25 Q 50 35 60 25" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.4" strokeDasharray="1 1.5" /> <line x1="30" y1="65" x2="45" y2="60" stroke="currentColor" strokeWidth="0.3" opacity="0.4" strokeDasharray="1 1.5" /> <polyline points="35,25 25,45 30,65 20,85" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.9" /> <polyline points="60,25 55,45 45,60 50,80" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.9" /> <circle cx="35" cy="25" r="1.6" fill="#e0f7ff" className="drop-shadow-[0_0_10px_rgba(200,240,255,1)]" /> <circle cx="60" cy="25" r="1.7" fill="#ffcc99" className="drop-shadow-[0_0_10px_rgba(255,200,150,1)]" /> <circle cx="25" cy="45" r="1" fill="currentColor" />
        <circle cx="30" cy="65" r="1" fill="currentColor" />
        <circle cx="20" cy="85" r="1.1" fill="currentColor" /> <circle cx="55" cy="45" r="1" fill="currentColor" />
        <circle cx="45" cy="60" r="1" fill="currentColor" />
        <circle cx="50" cy="80" r="1" fill="currentColor" />
      </svg>
    </>
  ),
  "Peg": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="10" cy="15" r="0.3" fill="currentColor" opacity="0.3" /><circle cx="90" cy="90" r="0.4" fill="currentColor" opacity="0.2" />
        <path d="M 45 40 Q 20 20 15 45" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.4" strokeDasharray="1 2" /> <polygon points="35,40 65,35 75,65 45,70" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.9" /> <polyline points="65,35 80,20 90,25" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <polyline points="35,40 25,25 10,20" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <polyline points="45,70 30,85 15,80" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <circle cx="45" cy="70" r="1.3" fill="currentColor" /> <circle cx="35" cy="40" r="1.3" fill="#ffbaba" /> <circle cx="65" cy="35" r="1.3" fill="currentColor" /> <circle cx="75" cy="65" r="1.2" fill="currentColor" /> <circle cx="80" cy="20" r="1.1" fill="currentColor" />
        <circle cx="90" cy="25" r="1.2" fill="#ffcc99" /> <circle cx="25" cy="25" r="0.9" fill="currentColor" />
        <circle cx="10" cy="20" r="0.9" fill="currentColor" />
        <circle cx="30" cy="85" r="0.9" fill="currentColor" />
        <circle cx="15" cy="80" r="0.9" fill="currentColor" />
      </svg>
    </>
  ),
  "Oph": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="15" cy="15" r="0.4" fill="currentColor" opacity="0.3" /><circle cx="85" cy="85" r="0.3" fill="currentColor" opacity="0.4" />
        <polyline points="40,40 25,35 15,45" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.5" strokeDasharray="1 1.5" /> <polyline points="60,40 75,35 85,45" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.5" strokeDasharray="1 1.5" /> <polygon points="50,15 35,40 30,65 70,65 65,40" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.9" /> <line x1="30" y1="65" x2="25" y2="85" stroke="currentColor" strokeWidth="0.6" opacity="0.8" /> <line x1="70" y1="65" x2="75" y2="85" stroke="currentColor" strokeWidth="0.6" opacity="0.8" /> <circle cx="50" cy="15" r="1.5" fill="#e0f7ff" className="drop-shadow-[0_0_8px_rgba(200,240,255,0.8)]" /> <circle cx="35" cy="40" r="1.1" fill="currentColor" />
        <circle cx="65" cy="40" r="1.1" fill="currentColor" />
        <circle cx="30" cy="65" r="1.2" fill="currentColor" /> <circle cx="70" cy="65" r="1.1" fill="currentColor" />
        <circle cx="25" cy="85" r="1.1" fill="currentColor" />
        <circle cx="75" cy="85" r="1" fill="currentColor" />
      </svg>
    </>
  ),
  "Ser": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="85" cy="80" r="3" fill="#ffbaba" opacity="0.3" className="drop-shadow-[0_0_8px_rgba(255,100,100,0.5)]" />
        <polyline points="84,82 85,78 86,81" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.5" /> <polyline points="40,50 30,35 25,20 15,15" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" />
        <polygon points="25,20 15,15 20,10" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.8" /> <polyline points="60,45 75,55 80,70" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" />
        <line x1="40" y1="50" x2="60" y2="45" stroke="currentColor" strokeWidth="0.2" opacity="0.2" strokeDasharray="2 3" />
        <circle cx="30" cy="35" r="1.3" fill="#ffcc99" /> <circle cx="40" cy="50" r="1" fill="currentColor" />
        <circle cx="25" cy="20" r="1" fill="currentColor" />
        <circle cx="15" cy="15" r="0.9" fill="currentColor" />
        <circle cx="20" cy="10" r="0.9" fill="currentColor" />
        <circle cx="60" cy="45" r="1" fill="currentColor" />
        <circle cx="75" cy="55" r="1" fill="currentColor" />
        <circle cx="80" cy="70" r="1" fill="currentColor" />
      </svg>
    </>
  ),
  "Her": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="65" cy="40" r="2.5" fill="#e0f7ff" opacity="0.6" className="drop-shadow-[0_0_10px_rgba(200,240,255,0.8)]" />
        <circle cx="65" cy="40" r="1" fill="#ffffff" opacity="0.9" />
        <polygon points="40,35 60,35 65,60 35,60" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.9" /> <polyline points="40,35 25,20 15,25" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <polyline points="60,35 75,25 85,35" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <polyline points="35,60 25,80" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <polyline points="65,60 75,75 70,90" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <polyline points="15,25 10,15 5,20" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.5" strokeDasharray="1 1.5" />
        <circle cx="70" cy="90" r="1.4" fill="#ffbaba" className="drop-shadow-[0_0_8px_rgba(255,150,150,0.8)]" /> <circle cx="40" cy="35" r="1.1" fill="currentColor" />
        <circle cx="60" cy="35" r="1.1" fill="currentColor" />
        <circle cx="35" cy="60" r="1.1" fill="currentColor" />
        <circle cx="65" cy="60" r="1.1" fill="currentColor" />
        <circle cx="25" cy="20" r="1" fill="currentColor" />
        <circle cx="15" cy="25" r="0.9" fill="currentColor" />
        <circle cx="75" cy="25" r="1" fill="currentColor" />
        <circle cx="85" cy="35" r="0.9" fill="currentColor" />
        <circle cx="25" cy="80" r="1.1" fill="currentColor" />
        <circle cx="75" cy="75" r="1.1" fill="currentColor" />
      </svg>
    </>
  ),
  "Per": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="85" cy="15" r="2.5" fill="#e0f7ff" opacity="0.4" className="drop-shadow-[0_0_8px_rgba(200,240,255,0.6)]" />
        <circle cx="78" cy="18" r="2.5" fill="#e0f7ff" opacity="0.4" className="drop-shadow-[0_0_8px_rgba(200,240,255,0.6)]" />
        <polyline points="70,30 50,45 35,70 20,85" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.9" /> <polyline points="50,45 65,65 75,80" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.9" /> <line x1="50" y1="45" x2="30" y2="35" stroke="currentColor" strokeWidth="0.6" opacity="0.8" /> <circle cx="65" cy="65" r="6" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.4" strokeDasharray="1 2" />
        <circle cx="50" cy="45" r="1.5" fill="#fffbe6" /> <circle cx="65" cy="65" r="1.6" fill="#ff4d4d" opacity="0.9" className="drop-shadow-[0_0_12px_rgba(255,50,50,1)]" /> <circle cx="70" cy="30" r="1.1" fill="currentColor" />
        <circle cx="35" cy="70" r="1.1" fill="currentColor" />
        <circle cx="20" cy="85" r="1" fill="currentColor" />
        <circle cx="75" cy="80" r="1.1" fill="currentColor" />
        <circle cx="30" cy="35" r="1" fill="currentColor" />
      </svg>
    </>
  ),
  "Tel": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
        <circle cx="15" cy="15" r="0.3" fill="currentColor" opacity="0.2" /><circle cx="85" cy="85" r="0.4" fill="currentColor" opacity="0.2" />
        <polygon points="35,35 65,20 70,25 40,40" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.3" strokeDasharray="1 2" /> <polyline points="50,30 50,70" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.3" strokeDasharray="1 2" /> <polyline points="40,30 60,35 55,60" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.6" />
        <circle cx="40" cy="30" r="0.9" fill="currentColor" opacity="0.8" />
        <circle cx="60" cy="35" r="0.9" fill="currentColor" opacity="0.8" />
        <circle cx="55" cy="60" r="0.8" fill="currentColor" opacity="0.8" />
      </svg>
    </>
  ),
  "Phe": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <path d="M 50 60 Q 40 80 50 90 Q 60 80 50 60" stroke="#ffbaba" strokeWidth="0.3" fill="none" opacity="0.5" strokeDasharray="1 1.5" /> <path d="M 30 35 Q 20 20 10 30" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.4" strokeDasharray="1 2" /> <path d="M 70 45 Q 85 30 95 40" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.4" strokeDasharray="1 2" /> <polyline points="50,60 40,45 50,25" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <line x1="40" y1="45" x2="30" y2="35" stroke="currentColor" strokeWidth="0.6" opacity="0.8" /> <line x1="40" y1="45" x2="70" y2="45" stroke="currentColor" strokeWidth="0.6" opacity="0.8" /> <circle cx="40" cy="45" r="1.5" fill="#ffcc99" className="drop-shadow-[0_0_10px_rgba(255,200,150,0.9)]" /> <circle cx="50" cy="25" r="1.1" fill="currentColor" /> <circle cx="50" cy="60" r="1.1" fill="currentColor" /> <circle cx="30" cy="35" r="1.1" fill="currentColor" />
        <circle cx="70" cy="45" r="1.1" fill="currentColor" />
      </svg>
    </>
  ),
  "Ant": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
        <circle cx="10" cy="20" r="0.3" fill="currentColor" opacity="0.2" /><circle cx="90" cy="80" r="0.4" fill="currentColor" opacity="0.2" />
        <rect x="45" y="30" width="10" height="40" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.3" strokeDasharray="1 2" />
        <path d="M 55 60 Q 70 70 80 60" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.3" strokeDasharray="1 2" />
        <polyline points="30,40 50,30 60,70 40,80" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.6" />
        <circle cx="30" cy="40" r="0.8" fill="currentColor" opacity="0.8" />
        <circle cx="50" cy="30" r="0.8" fill="currentColor" opacity="0.8" />
        <circle cx="60" cy="70" r="0.8" fill="currentColor" opacity="0.8" />
        <circle cx="40" cy="80" r="0.8" fill="currentColor" opacity="0.8" />
      </svg>
    </>
  ),
  "Vel": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="35" cy="45" r="8" fill="#ffbaba" opacity="0.15" className="drop-shadow-[0_0_15px_rgba(255,100,100,0.5)]" />
        <circle cx="20" cy="80" r="0.4" fill="currentColor" opacity="0.3" /><circle cx="80" cy="20" r="0.5" fill="currentColor" opacity="0.4" />
        <circle cx="45" cy="55" r="0.5" fill="currentColor" opacity="0.4" /><circle cx="30" cy="40" r="0.6" fill="currentColor" opacity="0.5" /><circle cx="55" cy="35" r="0.4" fill="currentColor" opacity="0.3" />
        <path d="M 65 25 Q 85 50 60 75" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.4" strokeDasharray="1 2" />
        <path d="M 40 15 Q 20 45 45 80" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.4" strokeDasharray="1 2" />
        <polyline points="40,15 65,25 60,75 45,80" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" />
        <line x1="65" y1="25" x2="35" y2="45" stroke="currentColor" strokeWidth="0.6" opacity="0.8" />
        <circle cx="65" cy="25" r="1.1" fill="currentColor" /> <circle cx="40" cy="15" r="1" fill="currentColor" />
        <circle cx="35" cy="45" r="1.1" fill="currentColor" />
        <circle cx="60" cy="75" r="1.1" fill="currentColor" />
        <circle cx="45" cy="80" r="1" fill="currentColor" />
      </svg>
    </>
  ),
  "Aqr": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="10" cy="50" r="0.3" fill="currentColor" opacity="0.3" /><circle cx="90" cy="20" r="0.4" fill="currentColor" opacity="0.2" />
        <path d="M 70 40 Q 60 60 40 75 Q 30 85 20 95" stroke="#e0f7ff" strokeWidth="0.4" fill="none" opacity="0.5" strokeDasharray="1 2" /> <circle cx="35" cy="78" r="0.5" fill="currentColor" opacity="0.6" />
        <circle cx="25" cy="90" r="0.6" fill="currentColor" opacity="0.5" />
        <polyline points="25,35 45,30 65,25 80,45" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <polygon points="65,40 75,35 70,45 60,45" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <polyline points="70,45 65,55 55,65 45,75 25,85" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.7" /> <circle cx="45" cy="30" r="1.1" fill="currentColor" /> <circle cx="25" cy="35" r="1.1" fill="currentColor" /> <circle cx="65" cy="25" r="1" fill="currentColor" />
        <circle cx="80" cy="45" r="1" fill="currentColor" />
        <circle cx="65" cy="40" r="0.9" fill="currentColor" />
        <circle cx="75" cy="35" r="0.9" fill="currentColor" />
        <circle cx="70" cy="45" r="0.9" fill="currentColor" />
        <circle cx="60" cy="45" r="0.9" fill="currentColor" />
        <circle cx="65" cy="55" r="0.8" fill="currentColor" />
        <circle cx="55" cy="65" r="0.8" fill="currentColor" />
        <circle cx="45" cy="75" r="0.8" fill="currentColor" />
        <circle cx="25" cy="85" r="0.8" fill="currentColor" />
      </svg>
    </>
  ),
  "Hyi": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
        <ellipse cx="15" cy="20" rx="10" ry="6" fill="#e0f7ff" opacity="0.1" className="drop-shadow-[0_0_6px_rgba(200,240,255,0.4)]" />
        <ellipse cx="85" cy="80" rx="6" ry="4" fill="#e0f7ff" opacity="0.1" className="drop-shadow-[0_0_6px_rgba(200,240,255,0.4)]" />
        <path d="M 30 75 Q 50 85 70 70" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.3" strokeDasharray="1 2" />
        <polygon points="25,30 35,20 40,35" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.7" /> <polyline points="35,20 60,40 50,65 75,60" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.7" /> <circle cx="25" cy="30" r="0.9" fill="currentColor" opacity="0.9" />
        <circle cx="35" cy="20" r="0.9" fill="currentColor" opacity="0.9" />
        <circle cx="40" cy="35" r="0.8" fill="currentColor" opacity="0.9" />
        <circle cx="60" cy="40" r="0.9" fill="currentColor" opacity="0.9" />
        <circle cx="50" cy="65" r="0.9" fill="currentColor" opacity="0.9" />
        <circle cx="75" cy="60" r="0.9" fill="currentColor" opacity="0.9" />
      </svg>
    </>
  ),
  "PsA": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="85" cy="80" r="0.4" fill="currentColor" opacity="0.2" />
        <circle cx="30" cy="15" r="0.5" fill="#e0f7ff" opacity="0.5" />
        <circle cx="28" cy="25" r="0.6" fill="#e0f7ff" opacity="0.6" />
        <circle cx="25" cy="35" r="0.5" fill="#e0f7ff" opacity="0.7" />
        <path d="M 22 42 Q 50 20 80 50 Q 50 80 22 42 Z" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.3" strokeDasharray="1 2" />
        <polyline points="22,42 45,35 70,45 80,50 65,65 40,60 22,42" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" />
        <circle cx="22" cy="42" r="1.8" fill="#e0f7ff" className="drop-shadow-[0_0_12px_rgba(200,240,255,1)]" /> <circle cx="45" cy="35" r="0.9" fill="currentColor" />
        <circle cx="70" cy="45" r="0.9" fill="currentColor" />
        <circle cx="80" cy="50" r="0.8" fill="currentColor" />
        <circle cx="65" cy="65" r="0.9" fill="currentColor" />
        <circle cx="40" cy="60" r="0.9" fill="currentColor" />
      </svg>
    </>
  ),
  "CrA": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
        <circle cx="80" cy="20" r="2" fill="currentColor" opacity="0.1" className="drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
        <circle cx="20" cy="80" r="0.4" fill="currentColor" opacity="0.3" /><circle cx="50" cy="50" r="0.3" fill="currentColor" opacity="0.4" />
        <path d="M 25 35 Q 50 15 75 35" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.4" strokeDasharray="1 1.5" />
        <polyline points="25,45 35,60 50,65 65,60 75,45 70,35" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" />
        <circle cx="25" cy="45" r="0.9" fill="currentColor" />
        <circle cx="35" cy="60" r="1" fill="currentColor" />
        <circle cx="50" cy="65" r="1" fill="currentColor" /> <circle cx="65" cy="60" r="1" fill="currentColor" />
        <circle cx="75" cy="45" r="0.9" fill="currentColor" />
        <circle cx="70" cy="35" r="0.8" fill="currentColor" />
      </svg>
    </>
  ),
  "TrA": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="15" cy="20" r="0.3" fill="currentColor" opacity="0.3" /><circle cx="85" cy="80" r="0.4" fill="currentColor" opacity="0.2" />
        <line x1="50" y1="20" x2="50" y2="70" stroke="currentColor" strokeWidth="0.2" opacity="0.4" strokeDasharray="1 2" /> <circle cx="50" cy="55" r="5" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.4" /> <polygon points="50,20 20,70 80,70" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.9" />
        <circle cx="50" cy="20" r="1.3" fill="#ffcc99" /> <circle cx="20" cy="70" r="1.1" fill="currentColor" />
        <circle cx="80" cy="70" r="1.1" fill="currentColor" />
      </svg>
    </>
  ),
  "Cru": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">
        <circle cx="50" cy="50" r="30" fill="currentColor" opacity="0.1" className="drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
        <circle cx="30" cy="30" r="0.6" fill="currentColor" opacity="0.5" /><circle cx="70" cy="20" r="0.5" fill="currentColor" opacity="0.4" /><circle cx="20" cy="70" r="0.7" fill="currentColor" opacity="0.3" />
        <ellipse cx="70" cy="75" rx="15" ry="10" fill="#00001a" opacity="0.8" transform="rotate(-30 70 75)" className="drop-shadow-[0_0_5px_rgba(0,0,0,1)]" />
        <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="0.8" opacity="0.9" /> <line x1="25" y1="45" x2="75" y2="45" stroke="currentColor" strokeWidth="0.8" opacity="0.9" /> <circle cx="50" cy="80" r="1.6" fill="#e0f7ff" className="drop-shadow-[0_0_10px_rgba(200,240,255,1)]" /> <circle cx="25" cy="45" r="1.5" fill="#e0f7ff" className="drop-shadow-[0_0_10px_rgba(200,240,255,1)]" /> <circle cx="50" cy="20" r="1.4" fill="#ffbaba" /> <circle cx="75" cy="45" r="1.2" fill="currentColor" /> <circle cx="60" cy="60" r="1" fill="currentColor" />
      </svg>
    </>
  ),
  "Cap": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="15" cy="15" r="0.3" fill="currentColor" opacity="0.3" /><circle cx="85" cy="85" r="0.4" fill="currentColor" opacity="0.2" />
        <path d="M 80 25 Q 90 10 70 15" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.5" strokeDasharray="1 1.5" /> <path d="M 20 25 Q 10 10 5 25" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.5" strokeDasharray="1 1.5" /> <polygon points="80,25 50,80 20,25 40,40 60,40" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" />
        <circle cx="80" cy="25" r="1.1" fill="currentColor" /> <circle cx="75" cy="28" r="1" fill="currentColor" /> <circle cx="50" cy="80" r="1.1" fill="currentColor" /> <circle cx="20" cy="25" r="1" fill="currentColor" />
        <circle cx="40" cy="40" r="0.9" fill="currentColor" />
        <circle cx="60" cy="40" r="0.9" fill="currentColor" />
      </svg>
    </>
  ),
  "Lyn": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
        <circle cx="80" cy="80" r="0.3" fill="currentColor" opacity="0.2" />
        <circle cx="25" cy="25" r="0.8" fill="#a8ffb2" opacity="0.6" className="drop-shadow-[0_0_4px_rgba(150,255,150,0.8)]" />
        <circle cx="35" cy="22" r="0.8" fill="#a8ffb2" opacity="0.6" className="drop-shadow-[0_0_4px_rgba(150,255,150,0.8)]" />
        <polyline points="20,30 40,35 30,55 50,60 45,80 70,85" stroke="currentColor" strokeWidth="0.4" fill="none" opacity="0.6" />
        <circle cx="20" cy="30" r="0.7" fill="currentColor" opacity="0.8" />
        <circle cx="40" cy="35" r="0.7" fill="currentColor" opacity="0.8" />
        <circle cx="30" cy="55" r="0.7" fill="currentColor" opacity="0.8" />
        <circle cx="50" cy="60" r="0.7" fill="currentColor" opacity="0.8" />
        <circle cx="45" cy="80" r="0.7" fill="currentColor" opacity="0.8" />
        <circle cx="70" cy="85" r="0.8" fill="currentColor" opacity="0.8" />
      </svg>
    </>
  ),
  "Sge": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">
        <line x1="10" y1="40" x2="30" y2="40" stroke="currentColor" strokeWidth="0.2" opacity="0.3" />
        <line x1="15" y1="60" x2="40" y2="60" stroke="currentColor" strokeWidth="0.2" opacity="0.4" />
        <line x1="25" y1="50" x2="45" y2="50" stroke="currentColor" strokeWidth="0.2" opacity="0.5" />
        <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="0.7" opacity="0.9" /> <polyline points="65,40 80,50 65,60" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <polyline points="20,50 10,40" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <polyline points="20,50 10,60" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <circle cx="80" cy="50" r="0.9" fill="currentColor" /> <circle cx="65" cy="40" r="0.9" fill="currentColor" />
        <circle cx="65" cy="60" r="0.9" fill="currentColor" />
        <circle cx="40" cy="50" r="0.9" fill="currentColor" /> <circle cx="20" cy="50" r="0.9" fill="currentColor" />
        <circle cx="10" cy="40" r="0.8" fill="currentColor" />
        <circle cx="10" cy="60" r="0.8" fill="currentColor" />
      </svg>
    </>
  ),
  "Pyx": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
        <circle cx="20" cy="20" r="0.3" fill="currentColor" opacity="0.3" /><circle cx="80" cy="80" r="0.4" fill="currentColor" opacity="0.2" />
        <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.4" strokeDasharray="1 2" />
        <line x1="25" y1="50" x2="75" y2="50" stroke="currentColor" strokeWidth="0.2" opacity="0.4" strokeDasharray="1 1.5" />
        <polyline points="35,60 50,45 70,55" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.7" />
        <circle cx="50" cy="45" r="0.9" fill="currentColor" />
        <circle cx="35" cy="60" r="0.8" fill="currentColor" />
        <circle cx="70" cy="55" r="0.8" fill="currentColor" />
      </svg>
    </>
  ),
  "Car": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">
        <ellipse cx="65" cy="45" rx="6" ry="4" fill="#ffbaba" opacity="0.3" className="drop-shadow-[0_0_12px_rgba(255,100,100,0.8)]" transform="rotate(-20 65 45)" />
        <circle cx="65" cy="45" r="1.5" fill="#ffffff" opacity="0.8" /> <circle cx="50" cy="50" r="0.5" fill="currentColor" opacity="0.5" /><circle cx="70" cy="30" r="0.4" fill="currentColor" opacity="0.4" /><circle cx="80" cy="60" r="0.6" fill="currentColor" opacity="0.3" />
        <polyline points="15,80 30,55 50,50 70,40 85,25" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" />
        <line x1="50" y1="50" x2="60" y2="70" stroke="currentColor" strokeWidth="0.6" opacity="0.8" />
        <line x1="70" y1="40" x2="80" y2="55" stroke="currentColor" strokeWidth="0.6" opacity="0.8" /> <circle cx="15" cy="80" r="2.2" fill="#fffbe6" className="drop-shadow-[0_0_15px_rgba(255,250,200,1)]" /> <circle cx="30" cy="55" r="1.1" fill="currentColor" /> <circle cx="50" cy="50" r="1.1" fill="currentColor" />
        <circle cx="70" cy="40" r="1.1" fill="currentColor" />
        <circle cx="85" cy="25" r="1" fill="currentColor" />
        <circle cx="60" cy="70" r="1" fill="currentColor" />
        <circle cx="80" cy="55" r="1" fill="currentColor" />
      </svg>
    </>
  ),
  "Dra": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <circle cx="10" cy="50" r="0.3" fill="currentColor" opacity="0.3" /><circle cx="90" cy="80" r="0.4" fill="currentColor" opacity="0.2" />
        <polygon points="75,15 85,20 80,30 70,25" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <polyline points="75,15 60,15 45,30 30,25 15,40 25,60 45,65 55,85 75,80" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" /> <path d="M 85 20 Q 95 15 90 5" stroke="#ffbaba" strokeWidth="0.3" fill="none" opacity="0.5" strokeDasharray="1 1.5" />
        <circle cx="75" cy="15" r="1" fill="currentColor" /> <circle cx="85" cy="20" r="0.9" fill="currentColor" />
        <circle cx="80" cy="30" r="0.9" fill="currentColor" />
        <circle cx="70" cy="25" r="0.9" fill="currentColor" />
        <circle cx="60" cy="15" r="0.9" fill="currentColor" />
        <circle cx="45" cy="30" r="0.9" fill="currentColor" />
        <circle cx="30" cy="25" r="0.9" fill="currentColor" />
        <circle cx="15" cy="40" r="1.1" fill="currentColor" /> <circle cx="25" cy="60" r="0.9" fill="currentColor" />
        <circle cx="45" cy="65" r="0.9" fill="currentColor" />
        <circle cx="55" cy="85" r="0.9" fill="currentColor" />
        <circle cx="75" cy="80" r="0.9" fill="currentColor" />
      </svg>
    </>
  ),
  "CVn": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <path d="M 30 20 Q 35 15 40 20 Q 45 30 35 35 Q 20 35 25 25" stroke="#e0f7ff" strokeWidth="0.5" fill="none" opacity="0.5" className="drop-shadow-[0_0_6px_rgba(200,240,255,0.6)]" />
        <circle cx="32" cy="25" r="1.5" fill="#ffffff" opacity="0.7" /> <circle cx="42" cy="18" r="0.8" fill="#e0f7ff" opacity="0.6" /> <circle cx="15" cy="80" r="0.3" fill="currentColor" opacity="0.3" /><circle cx="85" cy="15" r="0.4" fill="currentColor" opacity="0.2" />
        <path d="M 30 55 Q 45 40 55 55" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.4" strokeDasharray="1 2" /> <path d="M 50 80 Q 65 65 75 80" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.4" strokeDasharray="1 2" /> <line x1="45" y1="50" x2="65" y2="75" stroke="currentColor" strokeWidth="0.7" opacity="0.8" />
        <circle cx="45" cy="50" r="1.4" fill="#e0f7ff" className="drop-shadow-[0_0_8px_rgba(200,240,255,0.8)]" /> <circle cx="65" cy="75" r="1" fill="currentColor" />
      </svg>
    </>
  ),
  "Ret": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
        <circle cx="20" cy="20" r="0.3" fill="currentColor" opacity="0.3" /><circle cx="80" cy="80" r="0.4" fill="currentColor" opacity="0.2" />
        <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.2" opacity="0.4" strokeDasharray="1 1.5" />
        <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.2" opacity="0.4" strokeDasharray="1 1.5" />
        <polygon points="50,30 65,50 50,70 35,50" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.8" />
        <circle cx="50" cy="30" r="0.9" fill="currentColor" />
        <circle cx="65" cy="50" r="0.9" fill="currentColor" />
        <circle cx="50" cy="70" r="0.9" fill="currentColor" />
        <circle cx="35" cy="50" r="0.9" fill="currentColor" />
      </svg>
    </>
  ),
  "Sex": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
        <circle cx="15" cy="15" r="0.3" fill="currentColor" opacity="0.2" /><circle cx="85" cy="85" r="0.4" fill="currentColor" opacity="0.2" />
        <path d="M 30 70 A 30 30 0 0 0 70 70" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.5" strokeDasharray="1 1.5" />
        <line x1="30" y1="70" x2="30" y2="73" stroke="currentColor" strokeWidth="0.2" opacity="0.5" />
        <line x1="50" y1="80" x2="50" y2="83" stroke="currentColor" strokeWidth="0.2" opacity="0.5" />
        <line x1="70" y1="70" x2="70" y2="73" stroke="currentColor" strokeWidth="0.2" opacity="0.5" />
        <polygon points="50,40 30,70 70,70" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.7" />
        <circle cx="50" cy="40" r="0.8" fill="currentColor" opacity="0.8" />
        <circle cx="30" cy="70" r="0.8" fill="currentColor" opacity="0.8" />
        <circle cx="70" cy="70" r="0.8" fill="currentColor" opacity="0.8" />
      </svg>
    </>
  ),
  "For": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
        <ellipse cx="70" cy="30" rx="4" ry="2" fill="#e0f7ff" opacity="0.3" transform="rotate(45 70 30)" />
        <ellipse cx="60" cy="40" rx="3" ry="1.5" fill="#ffbaba" opacity="0.3" transform="rotate(-20 60 40)" />
        <circle cx="75" cy="45" r="2" fill="currentColor" opacity="0.2" />
        <circle cx="20" cy="20" r="0.3" fill="currentColor" opacity="0.2" /><circle cx="80" cy="80" r="0.4" fill="currentColor" opacity="0.2" />
        <path d="M 45 60 Q 50 45 55 60" stroke="#ffbaba" strokeWidth="0.3" fill="none" opacity="0.5" strokeDasharray="1 1.5" />
        <polyline points="25,40 50,75 75,60" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.7" />
        <circle cx="25" cy="40" r="0.9" fill="currentColor" opacity="0.9" />
        <circle cx="50" cy="75" r="0.9" fill="currentColor" opacity="0.9" />
        <circle cx="75" cy="60" r="0.9" fill="currentColor" opacity="0.9" />
      </svg>
    </>
  ),
  "Aql": (
    <>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">
        <circle cx="50" cy="50" r="25" fill="currentColor" opacity="0.1" className="drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
        <circle cx="30" cy="20" r="0.5" fill="currentColor" opacity="0.5" /><circle cx="45" cy="45" r="0.4" fill="currentColor" opacity="0.6" /><circle cx="60" cy="70" r="0.6" fill="currentColor" opacity="0.4" /><circle cx="80" cy="40" r="0.5" fill="currentColor" opacity="0.3" />
        <polyline points="45,85 50,95 55,85" stroke="#fffbe6" strokeWidth="0.4" fill="none" opacity="0.6" strokeDasharray="1 1.5" />
        <line x1="50" y1="35" x2="50" y2="20" stroke="currentColor" strokeWidth="0.7" opacity="0.9" /> <polyline points="15,45 50,35 85,55" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.9" /> <polygon points="15,45 50,75 85,55 50,35" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.9" /> <line x1="50" y1="75" x2="50" y2="85" stroke="currentColor" strokeWidth="0.7" opacity="0.9" /> <circle cx="50" cy="35" r="1.8" fill="#ffffff" className="drop-shadow-[0_0_15px_rgba(255,255,255,1)]" /> <circle cx="50" cy="20" r="1" fill="currentColor" /> <circle cx="50" cy="45" r="1" fill="currentColor" /> <circle cx="15" cy="45" r="1.1" fill="currentColor" /> <circle cx="85" cy="55" r="1.1" fill="currentColor" /> <circle cx="50" cy="75" r="1" fill="currentColor" />
        <circle cx="50" cy="85" r="1" fill="currentColor" />
      </svg>
    </>
  )
};
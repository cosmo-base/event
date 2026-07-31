"use client";

import { useState, useEffect } from "react";

interface AutoLinkProps {
  children: React.ReactNode;
  comingSoonUrl?: string;
  openUrl?: string;
}

export function AutoLink({
  children,
  comingSoonUrl = "https://cosmo-base.github.io/event/coming-soon",
  openUrl = "https://discord.gg/X78w86XE3v",
}: AutoLinkProps) {
  const [href, setHref] = useState(comingSoonUrl);

  useEffect(() => {
    const targetDate = new Date("2026-04-01T00:00:00+09:00").getTime();

    const checkTime = () => {
      if (new Date().getTime() >= targetDate) {
        setHref(openUrl);
      } else {
        setHref(comingSoonUrl);
      }
    };

    checkTime();

    const timer = setInterval(checkTime, 1000);
    return () => clearInterval(timer);
  }, [comingSoonUrl, openUrl]);

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
  style?: React.CSSProperties;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-blue-300" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
  style,
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-32 w-[17rem] sm:h-36 sm:w-[22rem] md:h-40 md:w-[26rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 border-zinc-800 bg-[#111111]/90 backdrop-blur-md px-4 py-3 sm:px-5 sm:py-4 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-[#0a0a0a] after:to-transparent after:content-[''] hover:border-zinc-700 hover:bg-[#1a1a1a] [&>*]:flex [&>*]:items-center [&>*]:gap-1 sm:[&>*]:gap-2",
        className
      )}
      style={style}
    >
      <div>
        <span className="relative inline-block rounded-full bg-blue-800 p-1">
          {icon}
        </span>
        <p className={cn("text-base sm:text-lg font-medium", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-sm sm:text-base md:text-lg text-zinc-200 truncate block w-full">{description}</p>
      <p className="text-xs sm:text-sm md:text-base text-zinc-400">{date}</p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards = [
    {
      className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-[#0a0a0a]/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-[#0a0a0a]/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
    },
  ];

  const displayCards = cards || defaultCards;
  const [offset, setOffset] = useState(0);

  const handleClick = () => {
    setOffset((prev) => (prev + 1) % displayCards.length);
  };

  return (
    <div 
      className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700 cursor-pointer"
      onClick={handleClick}
    >
      {displayCards.map((content, i) => {
        const visualPos = (i + offset) % displayCards.length;
        const visualClasses = displayCards[visualPos].className;

        return (
          <DisplayCard 
            key={i} 
            {...content} 
            className={visualClasses}
            style={{ zIndex: visualPos }}
          />
        );
      })}
    </div>
  );
}

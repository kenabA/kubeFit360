import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Quote, quotes } from "./quotes";

export function AnimatedQuote() {
  const [currentQuote, setCurrentQuote] = useState<Quote>(quotes[0]);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  console.log(setIsTyping);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAuthor, setShowAuthor] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const typeNextCharacter = () => {
      if (displayText.length < currentQuote.text.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentQuote.text.slice(0, displayText.length + 1));
        }, 50); // Typing speed
      } else {
        setShowAuthor(true);
        timeout = setTimeout(() => {
          // Reset states for next quote
          setShowAuthor(false);
          setDisplayText("");
          const nextIndex = (currentIndex + 1) % quotes.length;
          setCurrentIndex(nextIndex);
          setCurrentQuote(quotes[nextIndex]);
        }, 3000); // Display complete quote for 3 seconds
      }
    };

    if (isTyping) {
      typeNextCharacter();
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, currentQuote, currentIndex]);

  return (
    <div className="flex flex-col justify-center">
      <p className="para-md text-slate-700 mb-3 leading-relaxed italic">
        "{displayText}"
        <span
          className={cn(
            "inline-block w-0.5 h-5 ml-1 bg-slate-400",
            "animate-[blink_1s_infinite]",
            displayText.length === currentQuote.text.length
              ? "opacity-0"
              : "opacity-100"
          )}
        />
      </p>
      <p
        className={cn(
          " text-slate-500 transition-opacity duration-300 para-sm",
          showAuthor ? "opacity-100" : "opacity-0"
        )}
      >
        — {currentQuote.author}
      </p>
    </div>
  );
}

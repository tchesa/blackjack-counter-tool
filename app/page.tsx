"use client";

import Button from "@/components/button";
import { cx } from "@/lib/cx";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const formatKeyboardKey = (key: string) => {
  if (key === " ") {
    return "space";
  }

  return key.toUpperCase();
};

export default function Home() {
  const [count, setCount] = useState<number>(0);
  const [isSubtractPressed, setIsSubtractPressed] = useState<boolean>(false);
  const [isAddPressed, setIsAddPressed] = useState<boolean>(false);
  const [isResetPressed, setIsResetPressed] = useState<boolean>(false);

  const subtractKey = "a";
  const addKey = "d";
  const resetKey = " ";

  const handleReset = useCallback(() => {
    setCount(0);
  }, []);

  const handleAdd = useCallback(() => {
    setCount((x) => x + 1);
  }, []);

  const handleSubtract = useCallback(() => {
    setCount((x) => x - 1);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === addKey) {
        setIsAddPressed(true);
      }

      if (e.key === subtractKey) {
        setIsSubtractPressed(true);
      }

      if (e.key === resetKey) {
        setIsResetPressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === addKey) {
        setIsAddPressed(false);
        handleAdd();
      }

      if (e.key === subtractKey) {
        setIsSubtractPressed(false);
        handleSubtract();
      }

      if (e.key === resetKey) {
        setIsResetPressed(false);
        handleReset();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleAdd, handleSubtract, handleReset]);

  return (
    <div className="font-sans min-h-screen px-4 pt-4 pb-20 max-w-screen-md mx-auto flex flex-col">
      <header className="row-start-1 flex gap-2 flex-wrap items-center justify-start mb-6">
        <Image src="/diamonds.svg" alt="Diamonds" width={32} height={32} />
        <h1 className="text-4xl font-bold">Blackjack Counter Tool</h1>
      </header>
      <main className="justify-center flex flex-col gap-[32px] row-start-2 items-center sm:items-start grow">
        <p
          className={cx(
            "font-bold text-9xl rounded-lg px-4 py-8 w-full text-center",
            count > 0
              ? "bg-green-800"
              : count < 0
              ? "bg-red-800"
              : "bg-gray-800"
          )}
        >
          {count}
        </p>
        <div className="flex gap-4 w-full">
          <Button
            isActive={isSubtractPressed}
            label="-1"
            keyboardKey={formatKeyboardKey(subtractKey)}
            onClick={handleSubtract}
            className="grow"
          />
          <Button
            isActive={isAddPressed}
            label="+1"
            keyboardKey={formatKeyboardKey(addKey)}
            onClick={handleAdd}
            className="grow"
          />
        </div>
        <Button
          label="Reset"
          isActive={isResetPressed}
          keyboardKey={formatKeyboardKey(resetKey)}
          onClick={handleReset}
          className="w-full"
        />
      </main>
      {/* <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
      </footer> */}
    </div>
  );
}

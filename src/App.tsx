import Button from "./components/button";
import InputField from "./components/input-field";
import TextField from "./components/text-field";
import { cx } from "./lib/cx";
import { useCallback, useEffect, useState } from "react";

const formatKeyboardKey = (key: string) => {
  if (key === " ") {
    return "space";
  }

  return key.toUpperCase();
};

const NUMBER_OF_DECKS_STORAGE_KEY = "numberOfDecks";

const COUNTERS = ["count", "trueCount"] as const;
type Counter = (typeof COUNTERS)[number];

const CONTER_LABELS: Record<Counter, string> = {
  count: "Running count",
  trueCount: "True count",
};

type LastAction = "add" | "subtract" | "neutral" | null;

export default function Home() {
  const [count, setCount] = useState<number>(0);
  const [isSubtractPressed, setIsSubtractPressed] = useState<boolean>(false);
  const [isAddPressed, setIsAddPressed] = useState<boolean>(false);
  const [isNeutralPressed, setIsNeutralPressed] = useState<boolean>(false);
  const [isResetPressed, setIsResetPressed] = useState<boolean>(false);
  const [isUndoPressed, setIsUndoPressed] = useState<boolean>(false);
  const [numberOfDecks, setNumberOfDecks] = useState<number>(6);
  const [smallCardsPlayed, setSmallCardsPlayed] = useState<number>(0);
  const [largeCardsPlayed, setLargeCardsPlayed] = useState<number>(0);
  const [neutralCardsPlayed, setNeutralCardsPlayed] = useState<number>(0);
  const [lastAction, setLastAction] = useState<LastAction>(null);

  const cardsPlayed = smallCardsPlayed + largeCardsPlayed + neutralCardsPlayed;

  useEffect(() => {
    const storedNumberOfDecks = window.localStorage.getItem(
      NUMBER_OF_DECKS_STORAGE_KEY
    );

    if (storedNumberOfDecks) {
      const parsedNumberOfDecks = parseInt(storedNumberOfDecks);

      if (isNaN(parsedNumberOfDecks)) {
        return;
      }

      setNumberOfDecks(parsedNumberOfDecks);
    }
  }, []);

  const subtractKey = "d";
  const addKey = "a";
  const neutralKey = "s";
  const resetKey = " ";
  const undoKey = "u";

  const decksRemaining = numberOfDecks - cardsPlayed / 52;
  const trueCount = count / decksRemaining;

  const handleReset = useCallback(() => {
    setCount(0);
    setSmallCardsPlayed(0);
    setLargeCardsPlayed(0);
    setNeutralCardsPlayed(0);
    setLastAction(null);
  }, []);

  const handleAdd = useCallback(() => {
    setCount((x) => x + 1);
    setSmallCardsPlayed((x) => x + 1);
    setLastAction("add");
  }, []);

  const handleSubtract = useCallback(() => {
    setCount((x) => x - 1);
    setLargeCardsPlayed((x) => x + 1);
    setLastAction("subtract");
  }, []);

  const handleNeutral = useCallback(() => {
    setNeutralCardsPlayed((x) => x + 1);
    setLastAction("neutral");
  }, []);

  const handleUndo = useCallback(() => {
    if (lastAction === "add") {
      setCount((x) => x - 1);
      setSmallCardsPlayed((x) => Math.max(0, x - 1));
    } else if (lastAction === "subtract") {
      setCount((x) => x + 1);
      setLargeCardsPlayed((x) => Math.max(0, x - 1));
    } else if (lastAction === "neutral") {
      setNeutralCardsPlayed((x) => Math.max(0, x - 1));
    }
    setLastAction(null);
  }, [lastAction]);

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

      if (e.key === neutralKey) {
        setIsNeutralPressed(true);
      }

      if (e.key === undoKey) {
        setIsUndoPressed(true);
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

      if (e.key === neutralKey) {
        setIsNeutralPressed(false);
        handleNeutral();
      }

      if (e.key === undoKey) {
        setIsUndoPressed(false);
        handleUndo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleAdd, handleSubtract, handleReset, handleNeutral, handleUndo]);

  const counters: Record<Counter, number> = {
    count,
    trueCount,
  };

  useEffect(() => {
    window.localStorage.setItem(
      NUMBER_OF_DECKS_STORAGE_KEY,
      numberOfDecks.toString()
    );
  }, [numberOfDecks]);

  const KeyboardKeyElement = ({ text }: { text: string }) => {
    return (
      <span className="font-mono text-xs border border-gray-400 text-gray-400 rounded-sm px-1.5">
        {formatKeyboardKey(text)}
      </span>
    );
  };

  return (
    <div className="font-sans min-h-screen px-4 pt-4 pb-20 max-w-screen-md mx-auto flex flex-col">
      <header className="row-start-1 flex gap-2 flex-wrap items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <img
            src={`${location.href}/diamonds.svg`}
            alt="Diamonds"
            width={32}
            height={32}
          />
          <h1 className="text-4xl font-bold">Blackjack Counter Tool</h1>
        </div>
        <a
          href="https://github.com/tchesa/blackjack-counter-tool"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`${location.href}/github-white-icon.svg`}
            alt="GitHub"
            width={24}
            height={24}
          />
        </a>
      </header>
      <main className="justify-center flex flex-col gap-[32px] row-start-2 items-center sm:items-start grow">
        <div className="flex flex-col gap-4 w-full">
          <ul className="flex flex-col gap-2 text-sm text-gray-300 list-disc">
            {[
              <>Set the number of decks in the shoe;</>,
              <>
                Use the keyboard shortcuts to <strong>add</strong>{" "}
                <KeyboardKeyElement text={addKey} /> and{" "}
                <strong>subtract</strong>{" "}
                <KeyboardKeyElement text={subtractKey} /> from the true count;
              </>,
              <>
                The <strong>neutral</strong> cards are important to keep track
                of the <strong>true count</strong>. Add them with the keyboard
                shortcut <KeyboardKeyElement text={neutralKey} />;
              </>,
              <>
                <strong>Undo</strong> the last counting action using{" "}
                <KeyboardKeyElement text={undoKey} />;
              </>,
              <>
                Reset the counter using the keyboard shortcut{" "}
                <KeyboardKeyElement text={resetKey} /> when the shoe gets
                replaced.
              </>,
            ].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="gap-4 w-full grid grid-cols-3">
          <InputField
            type="number"
            value={numberOfDecks.toString()}
            onChange={(value) => setNumberOfDecks(parseInt(value))}
            label="Number of Decks"
          />
          <TextField
            label="Cards Played"
            value={`${cardsPlayed} / ${numberOfDecks * 52}`}
          />
          <TextField
            label="Decks Remaining"
            value={decksRemaining.toFixed(2)}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="gap-4 w-full grid grid-cols-3">
            {COUNTERS.map((key) => {
              const value = counters[key];

              return (
                <div
                  key={key}
                  className={cx(
                    "rounded-lg grow relative",
                    key === "trueCount" ? "col-span-2" : "col-span-1",
                    value > 0
                      ? "bg-green-800"
                      : value < 0
                      ? "bg-red-800"
                      : "bg-gray-800"
                  )}
                >
                  <p className="text-sm text-gray-300 font-bold absolute top-2 left-2">
                    {CONTER_LABELS[key]}
                  </p>
                  <p className="font-bold text-9xl px-4 py-8 w-full text-center">
                    {key === "trueCount" ? value.toFixed(2) : value}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="flex flex-row w-full h-2 rounded-lg overflow-hidden">
            <div
              className="bg-green-800 h-full"
              style={{ flexGrow: smallCardsPlayed }}
            />
            <div
              className="bg-gray-800 h-full"
              style={{ flexGrow: cardsPlayed === 0 ? 1 : neutralCardsPlayed }}
            />
            <div
              className="bg-red-800 h-full"
              style={{ flexGrow: largeCardsPlayed }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="w-full grid grid-cols-3 gap-4">
            <Button
              isActive={isAddPressed}
              label="+1"
              keyboardKey={formatKeyboardKey(addKey)}
              onClick={handleAdd}
              className="grow"
            />
            <Button
              isActive={isNeutralPressed}
              label="0"
              keyboardKey={formatKeyboardKey(neutralKey)}
              onClick={handleNeutral}
              className="grow"
            />
            <Button
              isActive={isSubtractPressed}
              label="-1"
              keyboardKey={formatKeyboardKey(subtractKey)}
              onClick={handleSubtract}
              className="grow"
            />
          </div>
          <div className="w-full grid grid-cols-2 gap-4">
            <Button
              label="Reset"
              isActive={isResetPressed}
              keyboardKey={formatKeyboardKey(resetKey)}
              onClick={handleReset}
              className="grow"
            />
            <Button
              label="Undo"
              isActive={isUndoPressed}
              keyboardKey={formatKeyboardKey(undoKey)}
              onClick={handleUndo}
              disabled={lastAction === null}
              className="grow"
            />
          </div>
        </div>
      </main>
      {/* <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
      </footer> */}
    </div>
  );
}

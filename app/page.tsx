"use client";
import Image from "next/image";
import { ComponentProps, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Alpaca, Background, Backgrounds } from "./lib/definitions";
import { dowloadImage, randomValue } from "./lib/utils";

const backgrounds = {
  blue: [50, 60, 70],
  darkblue: [30, 50, 70],
  green: [50, 60, 70],
  grey: [40, 70, 80],
  red: [50, 60, 70],
  yellow: [50, 60, 70],
};

const alpaca = {
  leg: ["bubble-tea", "cookie", "default", "game-console", "tilt-backward", "tilt-forward"],
  ears: ["default", "tilt-backward", "tilt-forward"],
  neck: ["bend-backward", "bend-forward", "default", "thick"],
  nose: ["nose"],
  mouth: ["astonished", "default", "eating", "laugh", "tongue"],
  hair: ["bang", "curls", "default", "elegant", "fancy", "quiff", "short"],
  accessories: ["earings", "flower", "glasses", "headphone"],
  eyes: ["angry", "default", "naughty", "panda", "smart", "star"],
};

const initialState = Object.entries(alpaca).map(([key, value]) => ({
  key: key as keyof Alpaca,
  value: value[0],
}));

const backgroundColors = Object.keys(backgrounds);

export default function Home() {
  const [alpacaParts, setAlpacaParts] = useState<{ key: keyof Alpaca; value: string }[]>(initialState);
  const [background, setBackground] = useState<Background>({
    color: "blue",
    value: 50,
  });
  const [selectedPart, setSelectedPart] = useState<keyof Alpaca | "backgrounds" | null>(null);
  return (
    <main className="pt-10 space-y-5 max-w-[1000px] mx-auto">
      <h1 className="text-3xl font-bold uppercase">alpaca generator</h1>
      <div className="grid grid-cols-[400px_1fr] grid-rows-[400px_auto] items-stretch gap-10 ">
        <div className="flex-1 relative">
          <BackgroundImage
            onClick={() => setSelectedPart("backgrounds")}
            color={background.color}
            value={background.value}
          />
          {alpacaParts.map(({ key, value }) => {
            return <PartImage key={key} part={key} value={value} />;
          })}
          di
        </div>
        <div className="flex-1 px-5 justify-between space-y-8">
          <SelectAlpacaPart alpacaParts={alpacaParts} selectedPart={selectedPart} setSelectedPart={setSelectedPart} />
          <div>
            {selectedPart ? (
              selectedPart === "backgrounds" ? (
                <ControlBackground background={background} setBackground={setBackground} />
              ) : (
                <ControlAlpacaParts
                  alpacaParts={alpacaParts}
                  selectedPart={selectedPart}
                  setAlpacaParts={setAlpacaParts}
                />
              )
            ) : null}
          </div>
        </div>
        <div className="flex justify-between gap-10 px-2">
          <button
            onClick={() => {
              const { alpacaPartsRandomed, backgroundRandomed } = randomValue(alpaca, backgrounds);
              setAlpacaParts(alpacaPartsRandomed);
              setBackground(backgroundRandomed);
            }}
            className="flex-1 py-2 bg-slate-400 font-semibold rounded-xl hover:bg-slate-600 hover:text-white capitalize">
            random
          </button>
          <button
            className="flex-1 py-2 bg-slate-400 font-semibold rounded-xl hover:bg-slate-600 hover:text-white capitalize"
            onClick={() => dowloadImage(alpacaParts, background)}>
            dowload
          </button>
        </div>
      </div>
    </main>
  );
}
const PartImage = ({ part, value }: { part: string; value: string } & ComponentProps<"image">) => {
  return (
    <Image
      className="absolute right-0 left-0 top-0 bottom-0 object-contain"
      src={`/alpaca/${part}/${value}.png`}
      alt="alpaca"
      width={720}
      height={720}
    />
  );
};

const BackgroundImage = ({ color, value }: { value: number; color: string } & ComponentProps<"image">) => {
  return (
    <Image
      className="absolute right-0 left-0 top-0 bottom-0 object-contain"
      src={`/alpaca/backgrounds/${color}${value}.png`}
      alt="alpaca"
      width={720}
      height={720}
    />
  );
};

const SelectAlpacaPart = ({
  alpacaParts,
  selectedPart,
  setSelectedPart,
}: {
  alpacaParts: typeof initialState;
  selectedPart: keyof typeof alpaca | "backgrounds" | null;
  setSelectedPart: Dispatch<SetStateAction<keyof typeof alpaca | "backgrounds" | null>>;
}) => {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Accesorize the alpaca&lsquo;s</h1>
      <ul className="flex flex-wrap gap-3">
        {alpacaParts
          .sort((a, b) => a.key.length - b.key.length)
          .map(({ key }) => {
            return (
              <li className={key === "nose" ? "hidden" : ""} key={key}>
                <Button isSelected={key === selectedPart} onClick={() => setSelectedPart(key as keyof Alpaca)}>
                  {key}
                </Button>
              </li>
            );
          })}
        <li>
          <Button isSelected={"backgrounds" === selectedPart} onClick={() => setSelectedPart("backgrounds")}>
            backgrounds
          </Button>
        </li>
      </ul>
    </div>
  );
};

const ControlAlpacaParts = ({
  selectedPart,
  alpacaParts,
  setAlpacaParts,
}: {
  selectedPart: keyof Alpaca;
  alpacaParts: typeof initialState;
  setAlpacaParts: Dispatch<SetStateAction<typeof initialState>>;
}) => {
  return (
    <>
      <h3 className="text-xl font-semibold mb-4">Style</h3>
      <div className="flex gap-4 flex-wrap">
        {alpaca[selectedPart]
          .sort((a, b) => a.length - b.length)
          .map((item) => (
            <Button
              onClick={() =>
                setAlpacaParts((prev) =>
                  prev.map((alpacaPart) =>
                    alpacaPart.key === selectedPart ? { ...alpacaPart, value: item } : alpacaPart
                  )
                )
              }
              isSelected={alpacaParts.find(({ key }) => key === selectedPart)?.value === item}
              key={item}>
              {item}
            </Button>
          ))}
      </div>
    </>
  );
};

const ControlBackground = ({
  background,
  setBackground,
}: {
  background: { color: keyof Backgrounds; value: number };
  setBackground: Dispatch<SetStateAction<typeof background>>;
}) => {
  return (
    <>
      <h3 className="text-xl font-semibold mb-4">Color</h3>
      <div className="flex gap-4 flex-wrap mb-8">
        {backgroundColors
          .sort((a, b) => a.length - b.length)
          .map((color) => (
            <Button
              onClick={() =>
                setBackground({
                  color: color as keyof Backgrounds,
                  value: backgrounds[color as keyof Backgrounds][0],
                })
              }
              isSelected={background.color === color}
              key={color}>
              {color}
            </Button>
          ))}
      </div>
      <h3 className="text-xl font-semibold mb-4">Style</h3>
      <div className="flex gap-4 flex-wrap">
        {backgrounds[background.color]
          .sort((a, b) => a - b)
          .map((value) => (
            <Button
              onClick={() => setBackground({ ...background, value })}
              isSelected={background.value === value}
              key={value}>
              {value}
            </Button>
          ))}
      </div>
    </>
  );
};

const Button = ({
  isSelected = false,
  children,
  ...rest
}: { isSelected: boolean; children: ReactNode } & ComponentProps<"button">) => {
  return (
    <button
      className={`py-2 px-4 text-lg capitalize border-[2px] rounded-full  ${
        isSelected
          ? "bg-blue-700 text-white font-medium border-blue-700"
          : "text-blue-400 border-blue-400 hover:text-blue-700 hover:border-blue-700"
      }`}
      {...rest}>
      {children}
    </button>
  );
};

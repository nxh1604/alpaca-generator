import { Alpaca, AlpacaPart, Background, Backgrounds } from "./definitions";
import mergeImages from "merge-images";

export const randomValue = (alpaca: Alpaca, backgrounds: Backgrounds) => {
  const backgroundColors = Object.keys(backgrounds);

  const backgroundRandomColor = backgroundColors[
    Math.floor(Math.random() * backgroundColors.length)
  ] as keyof Backgrounds;

  const backGroundRandomValues = backgrounds[backgroundRandomColor];
  const backgroundRandomValue = backGroundRandomValues[Math.floor(Math.random() * backGroundRandomValues.length)];

  const alpacaPartsRandomed = Object.entries(alpaca).map(([key, value]) => ({
    key: key as keyof Alpaca,
    value: value[Math.floor(Math.random() * value.length)],
  }));

  return {
    alpacaPartsRandomed,
    backgroundRandomed: { color: backgroundRandomColor, value: backgroundRandomValue },
  };
};

export const dowloadImage = (alpacaParts: AlpacaPart[], background: Background) => {
  const imagePath = alpacaParts.map(({ key, value }) => {
    return `/alpaca/${key}/${value}.png`;
  });
  imagePath.unshift(`/alpaca/backgrounds/${background.color}${background.value}.png`);
  mergeImages(imagePath).then((b64: string) => {
    const link = document.createElement("a");
    link.download = "Alpaca.png";
    link.href = b64;
    link.click();
  });
};

import { Card, Color, DeckTranslation, Picture } from "./types";

const points: Record<Picture, number> = {
  [Picture.Jack]: 2,
  [Picture.Queen]: 3,
  [Picture.King]: 4,
  [Picture.Ten]: 10,
  [Picture.Ace]: 11,
};

const isColor = (v: Color | string): v is Color => !!Number(v);
const isPicture = (v: Picture | string): v is Picture => !!Number(v);

const colors = Object.values(Color).filter(isColor);
const pictures = Object.values(Picture).filter(isPicture);

const cards: Array<Card> = colors.flatMap((color) =>
  pictures.map((picture) => ({
    picture,
    color,
    points: points[picture],
    id: color + picture,
  }))
);

export const applyTranslation = ({ colors, pictures }: DeckTranslation) =>
  cards.map((card) => ({
    ...card,
    color: colors[card.color],
    picture: pictures[card.picture],
  }));

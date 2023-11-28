import { Card, Color, type PictureV, Picture, ColorV } from 'shared';

const points: Record<PictureV, number> = {
	[Picture.Jack]: 2,
	[Picture.Queen]: 3,
	[Picture.King]: 4,
	[Picture.Ten]: 10,
	[Picture.Ace]: 11,
};

const isColor = (v: ColorV | string): v is ColorV => !!Number(v);
const isPicture = (v: PictureV | string): v is PictureV => !!Number(v);

const colors = Object.values(Color).filter(isColor);
const pictures = Object.values(Picture).filter(isPicture);

export const copies = ['1', '2'] as const;
type CopyV = (typeof copies)[number];

export const createCard = (copy: CopyV, color: ColorV, picture: PictureV): Card => ({
	picture,
	color,
	playable: true,
	points: points[picture],
	id: `${copy}${color}${picture}`,
});

export const cards: Array<Card> = copies.flatMap((copy) =>
	colors.flatMap((color) => pictures.map((picture) => createCard(copy, color, picture))),
);

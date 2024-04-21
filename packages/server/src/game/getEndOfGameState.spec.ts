import { describe, it } from 'bun:test';
import { Game } from 'shared';

const fixture: Game = {
	id: '884f1cc5-75a0-481d-b32c-d6369598effa',
	hands: [[], [], [], []],
	table: [],
	rounds: [
		[
			{
				from: 0,
				card: {
					picture: 1,
					color: 3,
					playable: true,
					points: 10,
					id: '131',
					order: 3,
					trump: false,
				},
			},
			{
				from: 1,
				card: {
					picture: 4,
					color: 3,
					playable: true,
					points: 4,
					id: '234',
					order: 2,
					trump: false,
				},
			},
			{
				from: 2,
				card: {
					picture: 4,
					color: 3,
					playable: true,
					points: 4,
					id: '134',
					order: 1,
					trump: false,
				},
			},
			{
				from: 3,
				card: {
					picture: 1,
					color: 3,
					playable: true,
					points: 10,
					id: '231',
					order: 4,
					trump: false,
				},
			},
		],
		[
			{
				from: 0,
				card: {
					picture: 4,
					color: 1,
					playable: true,
					points: 4,
					id: '214',
					order: 8,
					trump: false,
				},
			},
			{
				from: 1,
				card: {
					picture: 1,
					color: 1,
					playable: true,
					points: 10,
					id: '111',
					order: 9,
					trump: false,
				},
			},
			{
				from: 2,
				card: {
					picture: 5,
					color: 3,
					playable: true,
					points: 11,
					id: '135',
					order: 5,
					trump: false,
				},
			},
			{
				from: 3,
				card: {
					picture: 4,
					color: 1,
					playable: true,
					points: 4,
					id: '114',
					order: 7,
					trump: false,
				},
			},
		],
		[
			{
				from: 0,
				card: {
					picture: 4,
					color: 4,
					playable: true,
					points: 4,
					id: '144',
					order: 17,
					trump: true,
				},
			},
			{
				from: 1,
				card: {
					picture: 4,
					color: 2,
					playable: true,
					points: 4,
					id: '124',
					order: 13,
					trump: false,
				},
			},
			{
				from: 2,
				card: {
					picture: 5,
					color: 3,
					playable: true,
					points: 11,
					id: '235',
					order: 6,
					trump: false,
				},
			},
			{
				from: 3,
				card: {
					picture: 1,
					color: 1,
					playable: true,
					points: 10,
					id: '211',
					order: 10,
					trump: false,
				},
			},
		],
		[
			{
				from: 0,
				card: {
					picture: 1,
					color: 4,
					playable: true,
					points: 10,
					id: '141',
					order: 19,
					trump: true,
				},
			},
			{
				from: 1,
				card: {
					picture: 5,
					color: 2,
					playable: true,
					points: 11,
					id: '125',
					order: 15,
					trump: false,
				},
			},
			{
				from: 2,
				card: {
					picture: 5,
					color: 1,
					playable: true,
					points: 11,
					id: '115',
					order: 11,
					trump: false,
				},
			},
			{
				from: 3,
				card: {
					picture: 5,
					color: 1,
					playable: true,
					points: 11,
					id: '215',
					order: 12,
					trump: false,
				},
			},
		],
		[
			{
				from: 0,
				card: {
					picture: 5,
					color: 4,
					playable: true,
					points: 11,
					id: '145',
					order: 21,
					trump: true,
				},
			},
			{
				from: 1,
				card: {
					picture: 2,
					color: 1,
					playable: true,
					points: 2,
					id: '112',
					order: 27,
					trump: true,
				},
			},
			{
				from: 2,
				card: {
					picture: 1,
					color: 4,
					playable: true,
					points: 10,
					id: '241',
					order: 20,
					trump: true,
				},
			},
			{
				from: 3,
				card: {
					picture: 4,
					color: 2,
					playable: true,
					points: 4,
					id: '224',
					order: 14,
					trump: false,
				},
			},
		],
		[
			{
				from: 0,
				card: {
					picture: 2,
					color: 4,
					playable: true,
					points: 2,
					id: '142',
					order: 23,
					trump: true,
				},
			},
			{
				from: 1,
				card: {
					picture: 3,
					color: 4,
					playable: true,
					points: 3,
					id: '143',
					order: 31,
					trump: true,
				},
			},
			{
				from: 2,
				card: {
					picture: 5,
					color: 4,
					playable: true,
					points: 11,
					id: '245',
					order: 22,
					trump: true,
				},
			},
			{
				from: 3,
				card: {
					picture: 5,
					color: 2,
					playable: true,
					points: 11,
					id: '225',
					order: 16,
					trump: false,
				},
			},
		],
		[
			{
				from: 0,
				card: {
					picture: 2,
					color: 4,
					playable: true,
					points: 2,
					id: '242',
					order: 24,
					trump: true,
				},
			},
			{
				from: 1,
				card: {
					picture: 3,
					color: 2,
					playable: true,
					points: 3,
					id: '223',
					order: 34,
					trump: true,
				},
			},
			{
				from: 2,
				card: {
					picture: 2,
					color: 2,
					playable: true,
					points: 2,
					id: '122',
					order: 25,
					trump: true,
				},
			},
			{
				from: 3,
				card: {
					picture: 4,
					color: 4,
					playable: true,
					points: 4,
					id: '244',
					order: 18,
					trump: true,
				},
			},
		],
		[
			{
				from: 0,
				card: {
					picture: 2,
					color: 3,
					playable: true,
					points: 2,
					id: '132',
					order: 29,
					trump: true,
				},
			},
			{
				from: 1,
				card: {
					picture: 3,
					color: 1,
					playable: true,
					points: 3,
					id: '113',
					order: 35,
					trump: true,
				},
			},
			{
				from: 2,
				card: {
					picture: 2,
					color: 1,
					playable: true,
					points: 2,
					id: '212',
					order: 28,
					trump: true,
				},
			},
			{
				from: 3,
				card: {
					picture: 2,
					color: 2,
					playable: true,
					points: 2,
					id: '222',
					order: 26,
					trump: true,
				},
			},
		],
		[
			{
				from: 0,
				card: {
					picture: 2,
					color: 3,
					playable: true,
					points: 2,
					id: '232',
					order: 30,
					trump: true,
				},
			},
			{
				from: 1,
				card: {
					picture: 3,
					color: 3,
					playable: true,
					points: 3,
					id: '133',
					order: 37,
					trump: true,
				},
			},
			{
				from: 2,
				card: {
					picture: 3,
					color: 3,
					playable: true,
					points: 3,
					id: '233',
					order: 38,
					trump: true,
				},
			},
			{
				from: 3,
				card: {
					picture: 3,
					color: 4,
					playable: true,
					points: 3,
					id: '243',
					order: 32,
					trump: true,
				},
			},
		],
		[
			{
				from: 0,
				card: {
					picture: 3,
					color: 1,
					playable: true,
					points: 3,
					id: '213',
					order: 36,
					trump: true,
				},
			},
			{
				from: 1,
				card: {
					picture: 1,
					color: 2,
					playable: true,
					points: 10,
					id: '221',
					order: 40,
					trump: true,
				},
			},
			{
				from: 2,
				card: {
					picture: 1,
					color: 2,
					playable: true,
					points: 10,
					id: '121',
					order: 39,
					trump: true,
				},
			},
			{
				from: 3,
				card: {
					picture: 3,
					color: 2,
					playable: true,
					points: 3,
					id: '123',
					order: 33,
					trump: true,
				},
			},
		],
	],
	seats: [
		{
			name: '1',
		},
		{
			name: '2',
		},
		{
			name: '3',
		},
		{
			name: '4',
		},
	],
	activeSeat: 0,
};

describe('Get end of Game state.', () => {
	it.todo('Calculates the game points correctly');
	it.todo('Returns positive winpoints for winners and negative ones for losers');
	it.todo('Sets the parties correctly');
	it.todo('Lists what the win points were earned for');
});

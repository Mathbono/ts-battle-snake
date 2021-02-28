import {GameState} from '../types';

export const data: GameState = {
	game: {
		id: 'game-00fe20da-94ad-11ea-bb37',
		ruleset: {
			name: 'standard',
			version: 'v.1.2.3'
		},
		timeout: 500
	},
	turn: 1,
	board: {
		height: 11,
		width: 11,
		food: [
			{x: 5, y: 5},
			{x: 9, y: 0},
			{x: 2, y: 6}
		],
		hazards: [{x: 3, y: 2}],
		snakes: [
			{
				id: 'snake-508e96ac-94ad-11ea-bb37',
				name: 'My Snake',
				health: 54,
				body: [
					{x: 9, y: 8},
					{x: 10, y: 8},
					{x: 10, y: 9},
					{x: 10, y: 10},
					{x: 9, y: 10},
					{x: 8, y: 10},
					{x: 8, y: 9},
					{x: 8, y: 8},
					{x: 8, y: 7},
					{x: 8, y: 6}
				],
				latency: '111',
				head: {x: 9, y: 8},
				length: 10,
				shout: 'why are we shouting??',
				squad: ''
			},
			{
				id: 'snake-b67f4906-94ae-11ea-bb37',
				name: 'Another Snake',
				health: 16,
				body: [
					{x: 5, y: 4},
					{x: 5, y: 3},
					{x: 6, y: 3},
					{x: 6, y: 2}
				],
				latency: '222',
				head: {x: 5, y: 4},
				length: 4,
				shout: "I'm not really sure...",
				squad: ''
			}
		]
	},
	you: {
		id: 'snake-508e96ac-94ad-11ea-bb37',
		name: 'My Snake',
		health: 54,
		body: [
			{x: 9, y: 8},
			{x: 10, y: 8},
			{x: 10, y: 9},
			{x: 10, y: 10},
			{x: 9, y: 10},
			{x: 8, y: 10},
			{x: 8, y: 9},
			{x: 8, y: 8},
			{x: 8, y: 7},
			{x: 8, y: 6}
		],
		latency: '111',
		head: {x: 9, y: 8},
		length: 10,
		shout: 'why are we shouting??',
		squad: ''
	}
};

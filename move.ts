import {Response} from 'express';

import {Move, Direction, GameRequest, GameState} from './types';

const data: GameState = {
	game: {
		id: 'game-00fe20da-94ad-11ea-bb37',
		ruleset: {
			name: 'standard',
			version: 'v.1.2.3'
		},
		timeout: 500
	},
	turn: 14,
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
					{x: 0, y: 0},
					{x: 1, y: 0},
					{x: 2, y: 0}
				],
				latency: '111',
				head: {x: 0, y: 0},
				length: 3,
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
			{x: 0, y: 0},
			{x: 1, y: 0},
			{x: 2, y: 0}
		],
		latency: '111',
		head: {x: 0, y: 0},
		length: 3,
		shout: 'why are we shouting??',
		squad: ''
	}
};

export default function handleMove(
	request: GameRequest,
	response: Response<Move>
) {
	const data = request.body;

	const others = data.board.snakes.filter(
		snake => snake.name !== data.you.name
	);
	const snake = data.you;
	const diffX: number = snake.body[0].x - snake.body[1].x;
	const diffY: number = snake.body[0].y - snake.body[1].y;
	let lastMove: Direction;

	switch (diffX) {
		case 1:
			lastMove = 'right';
			break;
		case 0:
			switch (diffY) {
				case 1:
					lastMove = 'up';
					break;
				case -1:
					lastMove = 'down';
					break;
			}
			break;
		case -1:
			lastMove = 'left';
			break;
	}

	let possibleMoves: Direction[] = ['up', 'down', 'left', 'right'];
	const forbiddenMoves = {
		up: 'down',
		down: 'up',
		left: 'right',
		right: 'left'
	};
	possibleMoves = possibleMoves.filter(
		direction => direction !== forbiddenMoves[lastMove]
	);
	switch (snake.head.x) {
		case data.board.width - 1:
			possibleMoves = possibleMoves.filter(
				direction => direction !== 'right'
			);
			break;
		case 0:
			possibleMoves = possibleMoves.filter(
				direction => direction !== 'left'
			);
			break;
	}
	switch (snake.head.y) {
		case data.board.height - 1:
			possibleMoves = possibleMoves.filter(direction => direction !== 'up');
			break;
		case 0:
			possibleMoves = possibleMoves.filter(
				direction => direction !== 'down'
			);
			break;
	}

	const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

	console.log('POSSIBLE MOVES: ', possibleMoves);
	console.log('MOVE: ', move);
	console.log('MOVED');
	response.status(200).send({move});
}

//handleMove();

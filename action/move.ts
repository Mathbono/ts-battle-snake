import {Response} from 'express';

import {Move, Direction, GameRequest} from '../types';
//import {data} from '../data/data-mock';
import isDeadEnd from './isDeadEnd';

export default function handleMove(
	request: GameRequest,
	response: Response<Move>
) {
	const data = request.body;
	const others = data.board.snakes.filter(
		snake => snake.name !== data.you.name
	);
	const snake = data.you;

	// Ne pas aller en arrière
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

	// Ne pas sortir du board
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

	// Ne pas toucher le serpent
	// Si contact frontal, éviter l'impasse
	for (let possibleMove of possibleMoves) {
		let seeX: number;
		let seeY: number;
		switch (possibleMove) {
			case 'up':
				seeX = snake.head.x;
				seeY = snake.head.y + 1;
				break;
			case 'down':
				seeX = snake.head.x;
				seeY = snake.head.y - 1;
				break;
			case 'left':
				seeX = snake.head.x - 1;
				seeY = snake.head.y;
				break;
			case 'right':
				seeX = snake.head.x + 1;
				seeY = snake.head.y;
				break;
		}
		if (snake.body.find(coord => coord.x === seeX && coord.y === seeY)) {
			possibleMoves = possibleMoves.filter(
				direction => direction !== possibleMove
			);
			if (possibleMove === lastMove) {
				for (let possibleMove of possibleMoves) {
					if (
						isDeadEnd(
							data.board.width,
							data.board.height,
							data.you.body,
							possibleMove
						) === true
					) {
						possibleMoves = possibleMoves.filter(
							direction => direction !== possibleMove
						);
					}
				}
			}
		}
	}

	const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

	console.log('Turn: ', data.turn);
	console.log('Possible moves: ', possibleMoves);
	if (move) {
		console.log('Move: ', move.toUpperCase());
		response.status(200).send({move});
	}
}

//handleMove();

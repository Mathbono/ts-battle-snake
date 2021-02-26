import {Response} from 'express';

import {Move, Direction, GameRequest} from './types';

export default function handleMove(
	request: GameRequest,
	response: Response<Move>
) {
	const gameData = request.body;

	const possibleMoves: Direction[] = ['up', 'down', 'left', 'right'];
	const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

	console.log('MOVE: ' + move);
	response.status(200).send({move});
}

import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';

import {SnakeInfo, GameRequest} from './types';
import handleMove from './action/move';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

app.get('/', handleIndex);
app.post('/start', handleStart);
app.post('/move', handleMove);
app.post('/end', handleEnd);

app.listen(PORT, () =>
	console.log(
		`TypeScript Battlesnake Server listening at http://127.0.0.1:${PORT}`
	)
);

function handleIndex(request: Request, response: Response<SnakeInfo>) {
	const battlesnakeInfo: SnakeInfo = {
		apiversion: '1',
		author: 'Mathbono',
		color: '#00FF00',
		head: 'tongue',
		tail: 'freckle'
	};
	response.status(200).json(battlesnakeInfo);
}

function handleStart(request: GameRequest, response: Response) {
	const gameData = request.body;

	console.log('START');
	response.status(200).send('ok');
}

function handleEnd(request: GameRequest, response: Response) {
	const gameData = request.body;

	console.log('END');
	response.status(200).send('ok');
}

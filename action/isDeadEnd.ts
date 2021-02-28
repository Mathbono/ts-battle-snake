import {Coordinates, Direction} from '../types';

function forward(
	move: Direction,
	headX: number,
	headY: number
): [number, number] {
	switch (move) {
		case 'up':
			headY += 1;
			break;
		case 'down':
			headY -= 1;
			break;
		case 'left':
			headX -= 1;
			break;
		case 'right':
			headX += 1;
			break;
	}
	return [headX, headY];
}

function changeDirection(move: Direction): Direction {
	switch (move) {
		case 'up':
			return 'right';
		case 'down':
			return 'left';
		case 'left':
			return 'up';
		case 'right':
			return 'down';
	}
}

function shouldChangeDirection(
	move: Direction,
	body: Coordinates[],
	headX: number,
	headY: number
): boolean {
	let seeX: number;
	let seeY: number;
	switch (move) {
		case 'up':
			seeX = headX;
			seeY = headY + 1;
			break;
		case 'down':
			seeX = headX;
			seeY = headY - 1;
			break;
		case 'left':
			seeX = headX - 1;
			seeY = headY;
			break;
		case 'right':
			seeX = headX + 1;
			seeY = headY;
			break;
	}
	if (body.find(coord => coord.x === seeX && coord.y === seeY)) {
		return true;
	}
	return false;
}

function isPerimeter(
	boardX: number,
	boardY: number,
	x: number,
	y: number
): boolean {
	if (
		(x === 0 && y < boardY) ||
		(x < boardX && y === 0) ||
		(x === boardX - 1 && y < boardY) ||
		(x < boardX && y === boardY - 1)
	) {
		return true;
	}
	return false;
}

export default function isDeadEnd(
	boardX: number,
	boardY: number,
	body: Coordinates[],
	initialMove: Direction
): boolean {
	let initialHeadX: number;
	let initialHeadY: number;
	let headX: number = body[0].x;
	let headY: number = body[0].y;
	let move: Direction = initialMove;
	[initialHeadX, initialHeadY] = forward(move, headX, headY);
	headX = initialHeadX;
	headY = initialHeadY;
	do {
		if (isPerimeter(boardX, boardY, headX, headY) === true) {
			return false;
		}
		let counter: number = 4;
		while (shouldChangeDirection(move, body, headX, headY) === true) {
			move = changeDirection(move);
			counter--;
			if (counter === 0) {
				return true;
			}
		}
		[headX, headY] = forward(move, headX, headY);
	} while (headX !== initialHeadX || headY !== initialHeadY);
	return true;
}

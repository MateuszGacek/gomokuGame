let isPlayerOneMove = true;
const arr = new Array(15).fill(new Array(15).fill(null)).map((a) => [...a]);

const checkIfSomebodyWin = (lastMove) => {
	const { x, y } = lastMove;
	const minX = Math.max(0, x - 4);
	const maxX = Math.min(x + 4, 14);

	const minY = Math.max(0, y - 4);
	const maxY = Math.min(y + 4, 14);

	console.log({
		minX,
		maxX,
		minY,
		maxY,
		x,
		y,
	});

	let horizontal = [];
	let vertical = [];

	for (let i = minX; i <= maxX; i++) {
		horizontal.push(arr[i][y]);
	}
	for (let j = minY; j <= maxY; j++) {
		vertical.push(arr[x][j]);
	}
};

const checkIfEndIfTheGame = (state, lastMove) => {
	const arrayOfPatterns = [
		[
			[-5, 0],
			[-4, 0],
			[-3, 0],
			[-2, 0],
			[-1, 0],
			[0, 0],
			[1, 0],
			[2, 0],
			[3, 0],
			[4, 0],
			[5, 0],
		],
		[
			[0, -5],
			[0, -4],
			[0, -3],
			[0, -2],
			[0, -1],
			[0, 0],
			[0, 1],
			[0, 2],
			[0, 3],
			[0, 4],
			[0, 5],
		],
		[
			[-5, -5],
			[-4, -4],
			[-3, -3],
			[-2, -2],
			[-1, -1],
			[0, 0],
			[1, 1],
			[2, 2],
			[3, 3],
			[4, 4],
			[5, 5],
		],
		[
			[-5, 5],
			[-4, 4],
			[-3, 3],
			[-2, 2],
			[-1, 1],
			[0, 0],
			[1, -1],
			[2, -2],
			[3, -3],
			[4, -4],
			[5, -5],
		],
	];
	const player = isPlayerOneMove ? 'player-1' : 'player-2';
	arrayOfPatterns.forEach((pattern) => {
		let acc = 0;
		pattern.forEach((cords) => {
			let xToCheck = lastMove.x + cords[0];
			let yToCheck = lastMove.y + cords[1];
			if (xToCheck > -1 && xToCheck < 15 && yToCheck > -1 && yToCheck < 15) {
				let content = state[xToCheck][yToCheck];
				if (content === player) {
					acc += 1;
				} else {
					acc = 0;
				}
				console.log(acc);
				let winPlayer = isPlayerOneMove === true ? 'Player 1' : 'Player 2';

				if (acc >= 6) {
					alert(`${winPlayer} lose...`);
					return false;
				} else if (acc === 5) {
					alert(`Win  ${winPlayer}`);
					return true;
				}
			}
		});
	});
	return false;
};

const generateBoard = (size = 15) => {
	const board = document.getElementById('game');

	board.addEventListener('click', (e) => {
		const x = e.target.getAttribute('x');
		const y = e.target.getAttribute('y');
		const isClicked = e.target.getAttribute('isClicked');
		if (isClicked || x === null || y === null) return;

		e.target.setAttribute('isClicked', true);
		e.target.classList.add(isPlayerOneMove ? 'player-1' : 'player-2');
		if (isPlayerOneMove) {
			arr[x][y] = 'player-1';
		} else {
			arr[x][y] = 'player-2';
		}
		console.log(checkIfEndIfTheGame(arr, { x: +x, y: +y }));
		isPlayerOneMove = !isPlayerOneMove;
	});
	for (let i = 0; i < size; i++) {
		const row = document.createElement('div');
		row.classList.add('row');
		for (let j = 0; j < size; j++) {
			const singleField = document.createElement('div');
			singleField.setAttribute('x', i);
			singleField.setAttribute('y', j);
			singleField.classList.add('single-field');

			row.appendChild(singleField);
		}
		board.appendChild(row);
	}
};

generateBoard();

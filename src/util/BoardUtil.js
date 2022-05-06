export function getNeighborCells(row, col, rows, cols) {
	let neightborOffSets = [
		{ r: -1, c: -1 },
		{ r: -1, c: 0 },
		{ r: -1, c: 1 },
		{ r: 0, c: -1 },
		{ r: 0, c: 1 },
		{ r: 1, c: -1 },
		{ r: 1, c: 0 },
		{ r: 1, c: 1 },
	];
	const neighbors = [];

	neightborOffSets.forEach((offset) => {
		//account for board limits
		if (offset.r + row < 0 || offset.r + row >= rows) return;
		if (offset.c + col < 0 || offset.c + col >= cols) return;
		neighbors.push({ r: offset.r + row, c: offset.c + col });
	});

	return neighbors;
}

export function revealCell(
	board,
	x,
	y,
	boardRows,
	boardColumns,
	setBombs,
	setGameEnd
) {
	let cell = board[x][y];
	if (cell.revealed) return;
	cell.revealed = true;

	if (cell.value !== "X") {
		setBombs((currBombs) => currBombs - 1);
	} else if (cell.value === "X") {
		setGameEnd({ state: true, result: 0 });
	}

	if (cell.value === "0") {
		getNeighborCells(x, y, boardRows, boardColumns).forEach((newCell) =>
			revealCell(board, newCell.r, newCell.c)
		);
	}
}

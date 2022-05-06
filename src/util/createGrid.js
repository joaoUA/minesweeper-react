import { getNeighborCells } from "./BoardUtil";

export default function createGrid(rows, cols, bombChance) {
	let grid = [];
	let totalBombs = 0;
	for (let row = 0; row < rows; row++) {
		let rowArr = [];
		for (let col = 0; col < cols; col++) {
			rowArr.push({
				value: "0",
				revealed: false,
				flag: false,
				x: row,
				y: col,
			});
		}
		grid.push(rowArr);
	}

	//place bombs
	for (let r = 0; r < grid.length; r++) {
		for (let c = 0; c < grid[r].length; c++) {
			let rand = Math.floor(Math.random() * 10);
			if (rand < bombChance) {
				grid[r][c].value = "X";
				totalBombs++;
			}
		}
	}

	//place numbers
	for (let r = 0; r < grid.length; r++) {
		for (let c = 0; c < grid[r].length; c++) {
			if (grid[r][c].value === "X") continue;
			let neighborBombs = 0;

			getNeighborCells(r, c, rows, cols).forEach((cell) => {
				let x = cell.r;
				let y = cell.c;
				if (grid[x][y].value === "X") ++neighborBombs;
			});

			grid[r][c].value = neighborBombs.toString();
		}
	}

	return [grid, totalBombs];
}

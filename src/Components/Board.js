import Cell from "./Cell";

function Board({ board, handleOnLeftClick, handleOnRightClick }) {
	let k = 0;
	return (
		<div className="board">
			{board &&
				board.map((row, x) =>
					row.map((col, y) => (
						<Cell
							key={++k}
							cell={board[x][y]}
							handleOnLeftClick={handleOnLeftClick}
							handleOnRightClick={handleOnRightClick}
						/>
					))
				)}
		</div>
	);
}

export default Board;

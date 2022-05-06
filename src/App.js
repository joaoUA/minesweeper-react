import { useState, useEffect } from "react";
//Components
import Board from "./Components/Board";
import RestartButton from "./Components/RestartButton";
import Stopwatch from "./Components/Stopwatch";
//Util
import createGrid from "./util/createGrid";
import { getNeighborCells } from "./util/BoardUtil";

const App = () => {
	const boardRows = 10;
	const boardColumns = 10;
	const cells = boardRows * boardColumns;
	const chanceOfBomb = 1; //in 10
	const [freeCells, setBombs] = useState(-1);
	const [gameEnd, setGameEnd] = useState({ state: false, result: -1 });
	const [board, setBoard] = useState([]);

	const [timer, setTimer] = useState(1);
	const [timerOn, setTimerOn] = useState(true);
	let interval = null;

	//Initiate App
	useEffect(() => {
		start();
	}, []);

	//Check for remaining cells
	useEffect(() => {
		if (freeCells === 0) {
			setGameEnd({ state: true, result: 1 });
		}
	}, [freeCells]);

	//check for end of game
	useEffect(() => {
		if (gameEnd.state === true && gameEnd.result !== -1) {
			setTimerOn(false);
		}
	}, [gameEnd]);

	useEffect(() => {
		if (timerOn && !gameEnd.state) {
			interval = setInterval(() => {
				setTimer((currTimer) => currTimer + 1);
			}, 1000);
		}
		if (gameEnd.state) {
			clearInterval(interval);
			setTimerOn(false);
		}

		return () => {
			stopTimer();
		};
	}, [timerOn]);

	function handleOnLeftClick(x, y) {
		if (gameEnd.state) return;
		let nBoard = [...board];
		revealCell(nBoard, x, y, boardRows, boardColumns, setBombs, setGameEnd);
		setBoard(nBoard);
	}
	function handleOnRightClick(x, y) {
		if (gameEnd.state) return;
		let nBoard = [...board];
		nBoard[x][y].flag = !nBoard[x][y].flag;
		setBoard(nBoard);
	}

	function start() {
		initializeGame(boardRows, boardColumns, chanceOfBomb, cells);
		setGameEnd({ state: false, result: -1 });
		resetTimer();
	}
	function initializeGame(boardRows, boardColumns, chanceOfBomb, cells) {
		const [grid, totalBombs] = createGrid(
			boardRows,
			boardColumns,
			chanceOfBomb
		);
		setBombs(cells - totalBombs);
		setBoard(grid);
	}
	function stopTimer() {
		clearInterval(interval);
	}
	function resetTimer() {
		setTimer(0);
		setTimerOn(true);
	}

	function revealCell(board, x, y) {
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

	return (
		<div>
			<h1 className="match-title">Minesweeper</h1>
			<div className="options-container">
				<RestartButton handleOnRestart={start} />
				<Stopwatch timer={timer} />
			</div>
			<Board
				board={board}
				handleOnLeftClick={handleOnLeftClick}
				handleOnRightClick={handleOnRightClick}
			></Board>
			{gameEnd.state && (
				<div className="result-text">
					{gameEnd.result == 1 ? "you win!" : "you lose!"}
				</div>
			)}
		</div>
	);
};

export default App;

/*
	TODO:
	* reorganize color variables in sass file
*/

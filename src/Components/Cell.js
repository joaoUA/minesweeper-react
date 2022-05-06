import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFlag,
	faBomb,
	fa0,
	fa1,
	fa2,
	fa3,
	fa4,
	fa5,
	fa6,
	fa7,
	fa8,
} from "@fortawesome/free-solid-svg-icons";

const Cell = ({ cell, handleOnLeftClick, handleOnRightClick }) => {
	const x = cell.x;
	const y = cell.y;
	const faceUp = cell.revealed;
	const value = cell.value.toString();
	const flagged = cell.flag;
	let classes;

	let icon;

	if (faceUp) {
		icon = getIconNumber(value);
		classes = "cell cell-revealed";
		classes = classes + " cell-" + value.toString();
	} else if (flagged) {
		icon = faFlag;
		classes = "cell flag";
	} else {
		classes = "cell";
	}

	return (
		<div
			className={classes}
			onClick={() => {
				handleOnLeftClick(x, y);
			}}
			onContextMenu={(e) => {
				e.preventDefault();
				handleOnRightClick(x, y);
			}}
		>
			{icon && <FontAwesomeIcon icon={icon} />}
		</div>
	);
};

function getIconNumber(value) {
	switch (value) {
		case "0":
			return fa0;
		case "1":
			return fa1;
		case "2":
			return fa2;
		case "3":
			return fa3;
		case "4":
			return fa4;
		case "5":
			return fa5;
		case "6":
			return fa6;
		case "7":
			return fa7;
		case "8":
			return fa8;
		default:
			return faBomb;
	}
}

export default Cell;

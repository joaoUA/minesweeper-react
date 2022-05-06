import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";

const Stopwatch = ({ timer }) => {
	return (
		<div className="timer">
			<FontAwesomeIcon icon={faStopwatch} />
			<p className="options-text">{formatSeconds(timer)}</p>
		</div>
	);
};

function formatSeconds(seconds) {
	seconds = Math.floor(seconds);
	const min = Math.floor(seconds / 60);
	const sec = seconds % 60;
	console.log(`${min}+${sec}`);
	const f = `${min.toString().padStart(2, "0")}:${sec
		.toString()
		.padStart(2, "0")}`;
	return f;
}
function formatMSeconds(cs) {
	let s = cs / 100;
	let min = Math.floor(s / 60);
	let sec = s % 60;
	sec = Math.floor(sec);

	return `${min.toString().padStart(2, "0")}:${sec
		.toString()
		.padStart(2, "0")}`;
}

export default Stopwatch;

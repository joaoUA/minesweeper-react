import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";

const RestartButton = ({ handleOnRestart }) => {
	return (
		<button className="btn options-text" onClick={handleOnRestart}>
			<FontAwesomeIcon icon={faArrowRotateLeft} />
		</button>
	);
};

export default RestartButton;

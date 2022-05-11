import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

const SingleMessage = ({ handleVoteUp, handleVoteDown, message, vote }) => {
  return (
    <div className="card">
      <div className="leftside">
        <FontAwesomeIcon
          className="votes"
          onClick={handleVoteUp}
          value={vote}
          id="icon"
          icon={faAngleUp}
        />
        <br />
        <FontAwesomeIcon
          className="votes"
          onClick={handleVoteDown}
          value={vote}
          id="icon"
          icon={faAngleDown}
        />
        <br />
        <h3 className="vote">{vote}</h3>
        <br />
      </div>
      <div className="rightside">
        <div className="message">{message}</div>
      </div>
    </div>
  );
};

export default SingleMessage;

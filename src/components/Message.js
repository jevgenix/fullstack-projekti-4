import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import Commentaries from "./Commentaries";
import SingleMessage from "./SingleMessage";

const Message = ({ message }) => {
  const [openCommentaries, setOpenCommentaries] = useState(false);
  const [vote, setVote] = useState(0);

  const handleVoteUp = () => {
    setVote(vote + 1);
  };

  const handleVoteDown = () => {
    setVote(vote - 1);
  };

  const handleCommentaries = () => {
    setOpenCommentaries(true);
  };

  return (
    <div className="commentary_border">
      <SingleMessage
        message={message}
        handleVoteUp={handleVoteUp}
        handleVoteDown={handleVoteDown}
        vote={vote}
      />

      {openCommentaries && (
        <Commentaries
          closeCommentaries={setOpenCommentaries}
          vote={vote}
          setVote={setVote}
          message={message}
        />
      )}
      <FontAwesomeIcon
        className="icons"
        onClick={handleCommentaries}
        id="icon"
        icon={faMessage}
      />
    </div>
  );
};

export default Message;

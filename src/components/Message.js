import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faClose } from "@fortawesome/free-solid-svg-icons";
import Commentaries from "./Commentaries";
import SingleMessage from "./SingleMessage";
import messageService from "../services/posts";

const Message = ({ message }) => {
  const id = message[1];
  const [openCommentaries, setOpenCommentaries] = useState(false);
  const [vote, setVote] = useState(message[2]);

  const handleVoteUp = () => {
    const upVote = {
      vote: "up",
    };
    messageService
      .updateVote(id, upVote)
      .then((returnedObject) => {
        setVote(returnedObject.message.votes);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleVoteDown = () => {
    const downVote = {
      vote: "down",
    };
    messageService
      .updateVote(id, downVote)
      .then((returnedObject) => {
        setVote(returnedObject.message.votes);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCommentaries = () => {
    setOpenCommentaries(true);
  };

  const handleDeleteMessage = () => {
    if (window.confirm(`You sure want to delete this post?`)) {
      messageService
        .remove(id)
        .then(() => {
          console.log("removed");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="commentary_border">
      <FontAwesomeIcon
        className="delete"
        onClick={handleDeleteMessage}
        icon={faClose}
      />
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

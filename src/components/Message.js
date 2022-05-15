import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faClose } from "@fortawesome/free-solid-svg-icons";
import Commentaries from "./Commentaries";
import SingleMessage from "./SingleMessage";
import messageService from "../services/posts";

const Message = ({ message, handleDeleteMessage, setMessage, testVote }) => {
  const id = message._id;

  const [vote, setVote] = useState();
  const [openCommentaries, setOpenCommentaries] = useState(false);

  useEffect(() => {
    messageService
      .getAll()
      .then((initialMessages) => {
        if (initialMessages !== "No messages found") {
          setMessage(initialMessages);
        } else {
          setMessage([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setMessage]);

  useEffect(() => {
    testVote.forEach((vote) => {
      if (vote.id === id) {
        setVote(vote.votes);
      }
    });
  }, [id, testVote, setMessage]);

  const handleVoteUp = () => {
    const upVote = {
      vote: "up",
    };
    messageService
      .updateVote(id, upVote)
      .then((returnedObject) => {
        setVote(returnedObject.message.votes);
        console.log(returnedObject.message.votes);
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
        console.log(returnedObject.message.votes);
        setVote(returnedObject.message.votes);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCommentaries = () => {
    setOpenCommentaries(true);
  };

  //console.log(message.userId);
  const DeleteButton = () => {
    if (JSON.stringify(localStorage.getItem("userId")) === message.userId) {
      return (
        <FontAwesomeIcon
          className="delete"
          onClick={() => handleDeleteMessage(id)}
          icon={faClose}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <div className="commentary_border">
      <DeleteButton />
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
          setMessage={setMessage}
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

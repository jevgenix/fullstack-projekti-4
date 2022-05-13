import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faClose } from "@fortawesome/free-solid-svg-icons";
import Commentaries from "./Commentaries";
import SingleMessage from "./SingleMessage";
import messageService from "../services/posts";

const Message = ({ message, userId, setMessage }) => {
  const v = message[2];
  const [vote, setVote] = useState(v);
  const id = message[1];
  console.log(message[2]);
  const [openCommentaries, setOpenCommentaries] = useState(false);

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
          messageService
            .getAll()
            .then((initialMessages) => {
              if (initialMessages !== "No messages found") {
                let messages = initialMessages
                  .reverse()
                  .map((message) => [
                    message.message,
                    message._id,
                    message.votes,
                    message.comments,
                    message.userId,
                  ]);
                setMessage(messages);
              } else {
                setMessage([]);
              }
            })
            .catch((error) => {
              console.log(error);
            });

          console.log("removed");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const DeleteButton = () => {
    if (JSON.stringify(localStorage.getItem("userId")) === userId) {
      return (
        <FontAwesomeIcon
          className="delete"
          onClick={handleDeleteMessage}
          icon={faClose}
        />
      );
    } else {
      return null;
    }
  };

  //console.log(JSON.stringify(localStorage.getItem("userId")) === userId);

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

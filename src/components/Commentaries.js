import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import SingleMessage from "./SingleMessage";
import messageService from "../services/posts";

const Commentaries = ({ closeCommentaries, message, vote, setVote }) => {
  const commentaries = message[3].map((elem) => elem.comments);
  const id = message[1];
  const [comments, setComment] = useState(commentaries);
  const [commentTextarea, setCommentTextarea] = useState("");

  const messageCommentHandler = (event) => {
    setCommentTextarea(event.target.value);
    event.target.style.height = "auto";
    let scHeights = event.target.scrollHeight;
    event.target.style.height = `${scHeights}px`;
  };

  const addComment = () => {
    const commentObject = {
      comments: commentTextarea,
    };
    messageService.createComment(id, commentObject).then((returnedObject) => {
      setComment(comments.concat(commentTextarea));
      setCommentTextarea("");
    });
  };

  const handleSubmitComment = (event) => {
    if (event.which === 13 && event.shiftKey === false) {
      event.preventDefault();
      addComment();
    }
  };

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

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <header className="modalHeader">
          <FontAwesomeIcon
            className="close-icon"
            onClick={() => closeCommentaries(false)}
            icon={faClose}
          />
          <h3>Comments</h3>
        </header>
        <SingleMessage
          message={message}
          handleVoteUp={handleVoteUp}
          handleVoteDown={handleVoteDown}
          vote={vote}
        />

        <div className="reply">
          <form onKeyDown={handleSubmitComment}>
            <textarea
              placeholder="What do you think?"
              className="textarea"
              value={commentTextarea}
              onChange={messageCommentHandler}
            ></textarea>
          </form>
        </div>

        <div className="comment-sector">
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              <img
                className="leftside"
                alt="user"
                src="https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max"
              ></img>
              <p className="rightside">{comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Commentaries;

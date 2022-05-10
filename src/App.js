import "./App.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faAngleDown,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

const Message = ({ message }) => {
  const [comments, setComment] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [vote, setVote] = useState(0);

  const messageCommentHandler = (event) => {
    setCommentInput(event.target.value);
  };

  const commentMessageHandler = (event) => {
    event.preventDefault();
    setComment(comments.concat(commentInput));
    setCommentInput("");
  };

  const handleVoteUp = () => {
    setVote(vote + 1);
  };

  const handleVoteDown = () => {
    setVote(vote - 1);
  };

  return (
    <div className="commentary_border">
      <div className="votes">
        <FontAwesomeIcon
          onClick={handleVoteUp}
          value={vote}
          id="icon"
          icon={faAngleUp}
        />
        <br />
        <FontAwesomeIcon
          onClick={handleVoteDown}
          value={vote}
          id="icon"
          icon={faAngleDown}
        />
      </div>
      <h3 className="vote">{vote}</h3>
      <div className="message">{message}</div>

      {/* commentary */}
      <div className="message_commentaries">
        {comments.map((comment, index) => (
          <p key={index}>{comment}</p>
        ))}
        <form onSubmit={commentMessageHandler}>
          <input value={commentInput} onChange={messageCommentHandler}></input>
        </form>
        <div className="icons">
          <FontAwesomeIcon id="icon" icon={faMessage} />
        </div>
      </div>
    </div>
  );
};

function App() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
    event.target.style.height = "auto";
    let scHeights = event.target.scrollHeight;
    event.target.style.height = `${scHeights}px`;
  };

  const handleSubmitForm = (event) => {
    if (event.which === 13 && event.shiftKey === false) {
      event.preventDefault();
      setMessage(message.concat(input));
      setInput("");
    }
  };

  return (
    <div className="App">
      <div className="wrapper">
        <h2> Shift + Enter for line break, Enter to input message </h2>
        <h3>Tell us something!</h3>
        <form onKeyDown={handleSubmitForm}>
          <textarea
            value={input}
            name="message"
            className="textarea"
            placeholder="Tell us something!"
            autoComplete="off"
            onChange={handleInputChange}
          ></textarea>
        </form>
      </div>
      <div className="messages">
        {message.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
    </div>
  );
}

export default App;

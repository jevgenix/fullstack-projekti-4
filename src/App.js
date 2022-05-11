import "./App.css";
import { useState } from "react";
import Message from "./components/Message";

function App() {
  const [textarea, setTextarea] = useState("");
  const [message, setMessage] = useState([]);

  const handleTextareaChange = (event) => {
    setTextarea(event.target.value);
    event.target.style.height = "auto";
    let scHeights = event.target.scrollHeight;
    event.target.style.height = `${scHeights}px`;
  };

  const handleSubmitForm = (event) => {
    if (event.which === 13 && event.shiftKey === false) {
      event.preventDefault();
      setMessage(message.concat(textarea));
      setTextarea("");
    }
  };

  return (
    <div className="App">
      <div className="wrapper">
        <h2> Shift + Enter for line break, Enter to input message </h2>
        <h3>Tell us something!</h3>
        <form onKeyDown={handleSubmitForm}>
          <textarea
            value={textarea}
            name="message"
            className="textarea"
            placeholder="Tell us something!"
            autoComplete="off"
            onChange={handleTextareaChange}
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

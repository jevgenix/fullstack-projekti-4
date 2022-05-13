import "./App.css";
import { useState, useEffect } from "react";
import Message from "./components/Message";
import Form from "./components/Form";
import messageService from "./services/posts";

function App() {
  const [textarea, setTextarea] = useState("");
  const [message, setMessage] = useState([]);

  useEffect(() => {
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
            ]);
          setMessage(messages);
        } else {
          setMessage([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const addPost = () => {
    const messageObject = {
      message: textarea,
    };
    messageService
      .create(messageObject)
      .then((returnedObject) => {
        setMessage(message.concat(returnedObject.message));
        console.log(console.log(`Message ${messageObject.message} added`));
        setTextarea("");
      })
      .catch((error) => console.log(error));
  };

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
      addPost();
    }
  };

  return (
    <div className="App">
      <Form
        handleSubmitForm={handleSubmitForm}
        handleTextareaChange={handleTextareaChange}
        textarea={textarea}
      />
      <div className="messages">
        {message.map((message) => (
          <Message key={message[1]} message={message} />
        ))}
      </div>
    </div>
  );
}

export default App;

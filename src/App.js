import "./App.css";
import { useState, useEffect } from "react";
import Message from "./components/Message";
import Form from "./components/Form";
import messageService from "./services/posts";

function App() {
  const [textarea, setTextarea] = useState("");
  const [message, setMessage] = useState([]);
  const [userId, setUserId] = useState("");

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
              message.userId,
            ]);
          console.log(messages);
          setMessage(messages);
        } else {
          setMessage([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // create unique userId and save it to localStorage
  useEffect(() => {
    const generateId = () => Math.random().toString(36).substr(2, 18);

    if (JSON.parse(localStorage.length === 0)) {
      JSON.stringify(localStorage.setItem("userId", generateId()));
    }
    setUserId(JSON.stringify(localStorage.getItem("userId")));
  }, [userId]);

  const addPost = () => {
    const messageObject = {
      message: textarea,
      userId: userId,
    };

    messageService
      .create(messageObject)
      .then((returnedObject) => {
        // kun teen concat, sen sijaan että lisään kaikki tiedot minä lisään vain ja ainoastaan sen viestin
        console.log(console.log(`Message ${messageObject.message} added`));
        if (message.length === 0) {
          setMessage([
            [
              returnedObject.message,
              returnedObject._id,
              returnedObject.votes,
              returnedObject.comments,
              returnedObject.userId,
            ],
          ]);
          console.log(message);
        } else {
          setMessage(
            message
              .concat([
                [
                  returnedObject.message,
                  returnedObject._id,
                  returnedObject.votes,
                  returnedObject.comments,
                  returnedObject.userId,
                ],
              ])
              .reverse()
          );
        }
        console.log(message);
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
        {message.map((message, index) => (
          <Message
            key={index}
            setMessage={setMessage}
            message={message}
            userId={userId}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

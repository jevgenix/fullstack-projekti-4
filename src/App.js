import "./App.css";
import { useState, useEffect } from "react";
import Message from "./components/Message";
import Form from "./components/Form";
import messageService from "./services/posts";

function App() {
  const [textarea, setTextarea] = useState("");
  const [message, setMessage] = useState([]);
  const [userId, setUserId] = useState("");

  const [testVote, setTestVote] = useState([]);

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
        // console.log(console.log(`Message ${messageObject.message} added`));
        setMessage(message.concat(returnedObject));
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
    if (textarea.length > 2) {
      if (event.which === 13 && event.shiftKey === false) {
        event.preventDefault();
        addPost();
      }
    }
  };

  const handleDeleteMessage = (id) => {
    if (window.confirm(`You sure want to delete this post?`)) {
      messageService
        .remove(id)
        .then(() => {
          setMessage(message.filter((m) => m._id !== id));
          console.log("removed");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    let array = [];
    message
      .slice(0)
      .reverse()
      .forEach((m) => {
        var obj = {};
        obj["id"] = m._id;
        obj["votes"] = m.votes;
        return array.push(obj);
      });
    setTestVote(array);
  }, [message]);

  //console.log(testVote);

  return (
    <div className="App">
      <Form
        handleSubmitForm={handleSubmitForm}
        handleTextareaChange={handleTextareaChange}
        textarea={textarea}
      />

      <div className="messages">
        {message
          .slice(0)
          .reverse()
          .map((message, index) => (
            <Message
              key={index}
              setMessage={setMessage}
              message={message}
              handleDeleteMessage={handleDeleteMessage}
              testVote={testVote}
              setTestVote={setTestVote}
            />
          ))}
      </div>
    </div>
  );
}

export default App;

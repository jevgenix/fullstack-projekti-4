import Message from "./Message";

const Content = ({
  message,
  setMessage,
  handleDeleteMessage,
  searchValue,
  testVote,
}) => {
  const content = message
    .filter((message) => {
      if (searchValue === "") {
        return message;
      } else if (
        message.message.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        return message;
      }
      return NaN;
    })
    .slice(0)
    .reverse()
    .map((message, index) => {
      return (
        <Message
          key={index}
          setMessage={setMessage}
          message={message}
          handleDeleteMessage={handleDeleteMessage}
          testVote={testVote}
        />
      );
    });
  return <div className="messages">{content}</div>;
};

export default Content;

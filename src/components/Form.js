const Form = ({ handleSubmitForm, handleTextareaChange, textarea }) => {
  return (
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
  );
};

export default Form;

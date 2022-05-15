import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
const DeleteButton = ({ handleDeleteMessage, id, message }) => {
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

export default DeleteButton;

import axios from "axios";

// online REST API
const baseUrl = "https://rest-api-project-3.herokuapp.com/api/";

// offline REST API
// const baseUrl = "http://localhost:5000/api";

const getAll = () => {
  const request = axios.get(`${baseUrl}/getall`);
  return request.then((response) => response.data);
};

const create = (messageObject) => {
  const request = axios.post(`${baseUrl}/add`, messageObject);
  return request.then((response) => response.data);
};

const updateVote = (id, messageObject) => {
  const request = axios.patch(`${baseUrl}/${id}/vote`, messageObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/delete/${id}`);
  return request.then((response) => response.data);
};

const createComment = (id, commentObject) => {
  const request = axios.put(`${baseUrl}/comment/${id}`, commentObject);
  return request.then((response) => response.data);
};

const exportedObject = { getAll, create, updateVote, remove, createComment };

export default exportedObject;

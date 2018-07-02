import { BACKEND_URL, GET_TO_DOS_ENDPOINT } from '../constants';
async function fetchToDos(userId) {
  const byIdMap = new Map();
  fetch(BACKEND_URL + GET_TO_DOS_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({
      _id: userId
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(({ response }) => {
      response.forEach(toDoItem => {
        return byIdMap.set(toDoItem._id, toDoItem);
      });
    });
  return byIdMap;
}

module.exports = {
  fetchToDos
};

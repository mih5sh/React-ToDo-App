import { BACKEND_URL, GET_TO_DOS_ENDPOINT } from '../constants';
async function fetchToDos(userId) {
  const byIdToDoMap = await fetch(BACKEND_URL + GET_TO_DOS_ENDPOINT, {
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
      const byIdMap = new Map();
      response.forEach(toDoItem => {
        return byIdMap.set(toDoItem._id, toDoItem);
      });
      return byIdMap;
    });
  return byIdToDoMap;
}

module.exports = {
  fetchToDos
};

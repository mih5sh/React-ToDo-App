import { BACKEND_URL, ADD_TO_DO_ENDPOINT } from '../constants';

async function addToDoInDBHelper(toDoItem) {
  const toDoItemAdded = await fetch(BACKEND_URL + ADD_TO_DO_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({
      userId: toDoItem.userId,
      itemName: toDoItem.itemName,
      done: false
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(({ response, newToDo }) => {
      if (response === 'Added') {
        return newToDo;
      }
      return undefined;
    });
  return toDoItemAdded;
}

module.exports = {
  addToDoInDBHelper
};

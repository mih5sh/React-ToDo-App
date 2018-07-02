import { BACKEND_URL, CHANGE_STATUS_OF_TODOS_ENDPOINT } from '../constants';
async function changeStatusOfToDoHelper(toDoId, currentStatus) {
  const response = await fetch(BACKEND_URL + CHANGE_STATUS_OF_TODOS_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({
      _id: toDoId,
      done: !currentStatus
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(({ response, updatedToDo }) => {
      return { response, updatedToDo };
    });
  return response;
}
export { changeStatusOfToDoHelper };

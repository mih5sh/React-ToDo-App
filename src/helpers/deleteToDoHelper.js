import { BACKEND_URL, DELETE_TODO_ENDPOINT } from '../constants';
async function deleteToDoHelper(toDoId) {
  const response = await fetch(BACKEND_URL + DELETE_TODO_ENDPOINT, {
    method: 'DELETE',
    body: JSON.stringify({
      _id: toDoId
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(({ response }) => {
      return response;
    });
  return response;
}
export { deleteToDoHelper };

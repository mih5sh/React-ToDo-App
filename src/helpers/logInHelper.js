import { BACKEND_URL, LOGIN_ENDPOINT } from '../constants';
async function logInHelper(userName, password) {
  const response = await fetch(BACKEND_URL + LOGIN_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({ userName, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(serverResponse => serverResponse.json())
    .then(({ response, userId }) => {
      if (response === 'LoggedIn') {
        return { response, userId };
      }
      return { response };
    });
  return response;
}
export { logInHelper };

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import LogIn from './loginPage';
import ToDos from './todos';
import SignUp from './signupPage';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={LogIn} />
        <Route path="/todos" component={ToDos} />
        <Route path="/signup" component={SignUp} />
      </div>
    </BrowserRouter>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

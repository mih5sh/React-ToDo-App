import React from 'react';
import { Link } from 'react-router-dom';

const GreetWithoutLogIn = props => {
  return (
    <div>
      <h1> Click the link below to login </h1>
      <Link to="/"> Log-In </Link>
    </div>
  );
};

const Greet = props => {
  return (
    <div className="greetingsContainer">
      <span className="username"> Hello, {props.userName} </span>
      <span className="greetings"> {`Let's start adding your To-Dos!`} </span>
    </div>
  );
};

export { GreetWithoutLogIn, Greet };

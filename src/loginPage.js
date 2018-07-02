import React, { Component } from 'react';
import { BACKEND_URL, LOGIN_ENDPOINT } from './constants';
import { logInHelper } from './helpers/logInHelper';
import { Redirect } from 'react-router-dom';
import './styles/style.css';

class LogIn extends Component {
  state = {
    logInError: '',
    loggedIn: false,
    userName: '',
    userId: '',
    loggingIn: false,
    signingUp: false
  };

  signUp = () => {
    this.setState({ signingUp: true });
  };

  logIn = () => {
    const userName = this.usernameNode.value;
    const password = this.passwordNode.value;
    logInHelper(userName, password).then(({ response, userId }) => {
      if (userId) {
        this.setState({
          loggedIn: true,
          userName: userName,
          userId: userId
        });
      } else {
        this.setState({ logInError: response, loggingIn: false });
        this.passwordNode.value = '';
        this.usernameNode.value = '';
      }
    });
    this.setState({ loggingIn: true });
  };

  handleLogInByEnterKey = event => {
    if (event.key !== 'Enter') {
      return;
    }
    this.logIn();
  };

  removePlaceHolderText = event => {
    event.target.placeholder = '';
  };
  addPlaceHolderText = event => {
    if (event.target === this.usernameNode) {
      event.target.placeholder = 'Enter Username';
    } else if (event.target === this.passwordNode) {
      event.target.placeholder = 'Enter Password';
    }
  };

  renderRedirect = () => {
    if (this.state.loggedIn) {
      const { userName, userId } = this.state;
      return (
        <Redirect
          to={{
            pathname: '/todos',
            userDetails: {
              userName: userName,
              userId: userId
            }
          }}
        />
      );
    } else if (this.state.signingUp) {
      return (
        <Redirect
          to={{
            pathname: '/signup'
          }}
        />
      );
    }
  };

  render() {
    const { logInError, loggingIn } = this.state;
    return (
      <div className="logInContainer">
        {this.renderRedirect()}
        <input
          className="userInput"
          ref={node => (this.usernameNode = node)}
          placeholder="Enter Username"
          onKeyDown={this.handleLogInByEnterKey}
          onFocus={this.removePlaceHolderText}
          onBlur={this.addPlaceHolderText}
        />
        <input
          className="userInput"
          ref={node => (this.passwordNode = node)}
          placeholder="Enter Password"
          type="password"
          onKeyDown={this.handleLogInByEnterKey}
          onFocus={this.removePlaceHolderText}
          onBlur={this.addPlaceHolderText}
        />
        <div className="buttonsContainer">
          <button className="actionButtons" onClick={this.logIn}>
            Log In
          </button>
          <button className="actionButtons" onClick={this.signUp}>
            Sign Up
          </button>
        </div>
        {logInError && !loggingIn ? (
          <h3 className="error">{logInError}</h3>
        ) : null}
        {loggingIn ? <h3>Loading</h3> : null}
      </div>
    );
  }
}

export default LogIn;

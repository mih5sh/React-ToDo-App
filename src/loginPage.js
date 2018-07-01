import React, { Component } from "react";
import { BACKEND_URL, LOGIN_ENDPOINT } from "./constants";
import { Redirect } from "react-router-dom";
import "../styles/style.css";

class LogIn extends Component {
  state = {
    logInError: "",
    loggedIn: false,
    userName: "",
    userId: "",
    signingUp: false
  };

  signUp = () => {
    this.setState({ signingUp: true });
  };

  logIn = () => {
    const userName = this.usernameNode.value;
    const password = this.passwordNode.value;
    fetch(BACKEND_URL + LOGIN_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        userName,
        password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(jsonRes => {
        console.log(jsonRes);
        if (jsonRes.response === "LoggedIn") {
          console.log("Should be redirected!");
          this.setState({
            loggedIn: true,
            userName: userName,
            userId: jsonRes.userId
          });
        } else {
          this.setState({ logInError: jsonRes.response });
          this.passwordNode.value = "";
          this.usernameNode.value = "";
        }
      });
  };

  handleLogInByEnterKey = event => {
    if (event.key !== "Enter") {
      return;
    }
    this.logIn();
  };

  removePlaceHolderText = event => {
    event.target.placeholder = "";
  };
  addPlaceHolderText = event => {
    if (event.target === this.usernameNode) {
      event.target.placeholder = "Enter Username";
    } else if (event.target === this.passwordNode) {
      event.target.placeholder = "Enter Password";
    }
  };

  renderRedirect = () => {
    if (this.state.loggedIn) {
      const { userName, userId } = this.state;
      return (
        <Redirect
          to={{
            pathname: "/todos",
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
            pathname: "/signup"
          }}
        />
      );
    }
  };

  render() {
    const { logInError } = this.state;
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
        {logInError ? <h3 className="error">{logInError}</h3> : null}
      </div>
    );
  }
}

export default LogIn;

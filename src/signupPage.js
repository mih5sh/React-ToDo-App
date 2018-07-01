import React, { Component } from "react";
import { BACKEND_URL, SIGNUP_ENDPOINT } from "./constants";
import { Redirect } from "react-router-dom";
import "../styles/style.css";

class SignUp extends Component {
  state = {
    signUpError: "",
    signedUp: false,
    userName: "",
    userId: ""
  };
  signUp = () => {
    const userName = this.usernameNode.value;
    const name = this.fullNameNode.value;
    const password = this.passwordNode.value;
    fetch(BACKEND_URL + SIGNUP_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        userName,
        password,
        name
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(({ response, newUser }) => {
        if (newUser) {
          this.setState({
            signedUp: true,
            userName: newUser.userName,
            userId: newUser.id
          });
        } else {
          this.setState({ signUpError: response });
          this.passwordNode.value = "";
          this.usernameNode.value = "";
          this.fullNameNode.value = "";
        }
      });
  };
  handleEnterKeyForSignUp = event => {
    if (event.key !== "Enter") {
      return;
    }
    this.signUp();
  };
  removePlaceHolderText = event => {
    event.target.placeholder = "";
  };
  addPlaceHolderText = event => {
    if (event.target === this.usernameNode) {
      event.target.placeholder = "Enter Username";
    } else if (event.target === this.fullNameNode) {
      event.target.placeholder = "Enter Fullname";
    } else if (event.target === this.passwordNode) {
      event.target.placeholder = "Enter Password";
    }
  };
  renderRedirect = () => {
    if (this.state.signedUp)
      return (
        <Redirect
          to={{
            pathname: "/todos",
            userDetails: {
              userName: this.state.userName,
              userId: this.state.userId
            }
          }}
        />
      );
  };
  render() {
    const { signUpError } = this.state;
    return (
      <div className="logInContainer">
        {this.renderRedirect()}
        <input
          className="userInput"
          ref={node => (this.fullNameNode = node)}
          placeholder="Enter Fullname"
          onFocus={this.removePlaceHolderText}
          onBlur={this.addPlaceHolderText}
          onKeyDown={this.handleEnterKeyForSignUp}
        />
        <input
          className="userInput"
          ref={node => (this.usernameNode = node)}
          placeholder="Enter Username"
          onFocus={this.removePlaceHolderText}
          onBlur={this.addPlaceHolderText}
          onKeyDown={this.handleEnterKeyForSignUp}
        />
        <input
          className="userInput"
          ref={node => (this.passwordNode = node)}
          placeholder="Enter Password"
          onFocus={this.removePlaceHolderText}
          onBlur={this.addPlaceHolderText}
          onKeyDown={this.handleEnterKeyForSignUp}
          type="password"
        />
        <button className="actionButtons" onClick={this.signUp}>
          Sign Up
        </button>
        {signUpError ? <h3 className="error">{signUpError}</h3> : null}
      </div>
    );
  }
}

export default SignUp;

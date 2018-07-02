import React, { Component } from 'react';
import { GreetWithoutLogIn, Greet } from './greetings';
import { fetchToDos } from './helpers/fetchToDos';
import { addToDoInDBHelper } from './helpers/addToDoHelper';
import AddToDo from './addToDo';
import {
  BACKEND_URL,
  ADD_TO_DO_ENDPOINT,
  GET_TO_DOS_ENDPOINT,
  CHANGE_STATUS_OF_TODOS_ENDPOINT,
  DELETE_TODO_ENDPOINT
} from './constants';
import ToDoItem from './toDoItem';

import '../styles/style.css';

class ToDos extends Component {
  constructor() {
    super();
    let userDetails;
  }

  state = {
    toDos: new Map(),
    notification: 'Loading',
    isLoading: true
  };

  componentWillMount() {
    this.userDetails = this.props.location
      ? this.props.location.userDetails
      : undefined;
  }

  componentDidMount() {
    if (this.userDetails === undefined) {
      return;
    }
    /* Fetch all the ToDos */
    fetchToDos(this.userDetails.userId).then(byIdToDoMap => {
      this.setState({ toDos: byIdToDoMap, isLoading: false });
    });
  }

  addToDo = toDoItem => {
    /* Add ToDo in the backend and the state */
    addToDoInDBHelper(toDoItem).then(newToDoItem => {
      if (newToDoItem) {
        this.setState(({ toDos, notification }) => {
          toDos.set(newToDoItem._id, newToDoItem);
          return {
            toDos: toDos,
            notification: `Added: ${newToDoItem.itemName}`
          };
        });
      } else {
        this.setState({ notification: `Couldn't add: ${toDoItem.itemName}` });
      }
    });
  };

  changeStatusOfToDo = (toDoItemId, previousStatus) => {
    this.setState(({ toDos }) => {
      const toDoToUpdate = toDos.get(toDoItemId);
      previousStatus = toDoToUpdate.done;
      toDoToUpdate.done = !toDoToUpdate.done;
      return {
        toDos: toDos
      };
    });
    fetch(BACKEND_URL + CHANGE_STATUS_OF_TODOS_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        _id: toDoItemId,
        done: !previousStatus
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(({ response, toDoToUpdate }) => {
        this.setState({ notification: `${response}` });
      });
  };

  deleteToDo = toDoItemId => {
    this.setState(({ toDos }) => {
      toDos.delete(toDoItemId);
      return {
        toDos: toDos
      };
    });
    fetch(BACKEND_URL + DELETE_TODO_ENDPOINT, {
      method: 'DELETE',
      body: JSON.stringify({
        _id: toDoItemId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(jsonRes => console.log(jsonRes));
  };

  render() {
    const { toDos } = this.state;
    if (this.userDetails === undefined) {
      return <GreetWithoutLogIn />;
    } else {
      return (
        <div className="container">
          <Greet userName={this.userDetails.userName} />
          <AddToDo addToDo={this.addToDo} userId={this.userDetails.userId} />
          {toDos.size > 0 ? (
            <div className="toDoContainer">
              {[...toDos.values()].map(toDoItem => {
                return (
                  <ToDoItem
                    key={toDoItem._id}
                    toDoItem={toDoItem}
                    changeStatus={this.changeStatusOfToDo}
                    deleteToDo={this.deleteToDo}
                  />
                );
              })}
            </div>
          ) : (
            <div className="toDoContainer noToDos">
              {this.state.toDos.size === 0 && this.state.isLoading === false
                ? "You don't have any ToDos yet"
                : 'Loading'}
            </div>
          )}
        </div>
      );
    }
  }
}
export default ToDos;

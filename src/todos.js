import React, { Component } from 'react';
import { GreetWithoutLogIn, Greet } from './greetings';
import { fetchToDos } from './helpers/fetchToDos';
import { addToDoInDBHelper } from './helpers/addToDoHelper';
import { changeStatusOfToDoHelper } from './helpers/changeStatusHelper';
import { deleteToDoHelper } from './helpers/deleteToDoHelper';
import AddToDo from './addToDo';
import ToDoItem from './toDoItem';

import './styles/style.css';

class ToDos extends Component {
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

  changeStatusOfToDo = (toDoItemId, currentStatus) => {
    /* Change status of ToDo in the backend and the state */
    this.setState(({ toDos }) => {
      const toDoToUpdate = toDos.get(toDoItemId);
      toDoToUpdate.done = !currentStatus;
      return {
        toDos: toDos
      };
    });
    changeStatusOfToDoHelper(toDoItemId, currentStatus).then(
      ({ response, updatedToDo }) => {
        this.setState({
          notification: response
        });
      }
    );
  };

  deleteToDo = toDoItemId => {
    this.setState(({ toDos }) => {
      toDos.delete(toDoItemId);
      return {
        toDos: toDos
      };
    });
    deleteToDoHelper(toDoItemId).then(response => {
      this.setState({ notification: response });
    });
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

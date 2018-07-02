import React, { Component } from 'react';
import './styles/style.css';

class ToDoItem extends Component {
  deleteToDoItem = () => {
    const { _id, itemName } = this.props.toDoItem;
    this.props.deleteToDo(_id, itemName);
  };

  changeStatusOfToDo = () => {
    const { _id, done } = this.props.toDoItem;
    this.props.changeStatus(_id, done);
  };

  render() {
    const { done, itemName } = this.props.toDoItem;
    return (
      <div className="toDoItemContainer">
        <input
          type="checkbox"
          defaultChecked={done}
          onChange={this.changeStatusOfToDo}
        />
        <span className={done ? 'toDoItemDone' : ''}>{itemName}</span>
        <button onClick={this.deleteToDoItem} children="X" />
      </div>
    );
  }
}

export default ToDoItem;

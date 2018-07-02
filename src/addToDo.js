import React, { Component } from 'react';

import './styles/style.css';

class AddToDo extends Component {
  handleKeyDown = e => {
    if (e.key !== 'Enter') {
      return;
    }
    const toDoItemName = this.addToDoNode.value;
    if (toDoItemName === '') {
      return;
    }
    const newToDoItem = {
      userId: this.props.userId,
      itemName: toDoItemName,
      done: false
    };
    this.addToDoNode.value = '';
    this.props.addToDo(newToDoItem);
  };

  render() {
    return (
      <input
        className="toDoInput"
        placeholder={'New To-Do'}
        onKeyDown={this.handleKeyDown}
        ref={node => (this.addToDoNode = node)}
      />
    );
  }
}
export default AddToDo;

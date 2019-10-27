import React, { Fragment } from 'react';
import TodoListEditContainer from '../components/todolist-edit/TodoListEditContainer';
import EditTodoItemModal from '../components/todolist-edit/EditTodoItemModal';
const Todo = () => {
  return (
    <Fragment>
      <TodoListEditContainer />
      <EditTodoItemModal />
    </Fragment>
  );
};

export default Todo;

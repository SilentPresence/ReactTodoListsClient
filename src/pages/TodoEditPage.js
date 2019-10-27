import React, { Fragment } from 'react';
import TodoListEditContainer from '../components/TodoListEdit/TodoListEditContainer';
import TodoItemEditModal from '../components/TodoListEdit/TodoItemEditModal/EditTodoItemModal';
const TodoEditPage = () => {
  return (
    <Fragment>
      <TodoListEditContainer />
      <TodoItemEditModal />
    </Fragment>
  );
};

export default TodoEditPage;

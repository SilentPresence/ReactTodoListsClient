import React, { Fragment } from 'react';
import TodoListsContainer from '../components/TodoLists/TodoListsContainer';
import DeleteTodoListModal from '../components/TodoLists/DeleteTodoListModal/DeleteTodoListModal';
import ViewTodoListModal from '../components/TodoLists/ViewTodoListModal/ViewTodoListModal';
const TodoListsPage = () => {
  return (
    <Fragment>
      <TodoListsContainer />
      <DeleteTodoListModal />
      <ViewTodoListModal />
    </Fragment>
  );
};

export default TodoListsPage;

import React, { Fragment } from 'react';
import TodoListsContainer from '../components/todolists/TodoListsContainer';
import DeleteTodoListModal from '../components/todolists/DeleteTodoListModal';
import ViewTodoListModal from '../components/todolists/ViewTodoListModal';
const Home = () => {
  return (
    <Fragment>
      <TodoListsContainer />
      <DeleteTodoListModal />
      <ViewTodoListModal />
    </Fragment>
  );
};

export default Home;

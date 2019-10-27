import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ProgressSpinner from '../layout/ProgressSpinner/ProgressSpinner';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTodoLists } from '../../actions/todoListsActions';
import M from 'materialize-css/dist/js/materialize.min.js';
import TodoLists from './TodoLists';
const TodoListsContainer = ({
  todoLists: { todoLists, loading, toastMessage, error },
  getTodoLists
}) => {
  //Fetch the todo lists
  useEffect(() => {
    getTodoLists();
  }, [getTodoLists]);

  //Initialize the materialize library
  useEffect(() => {
    M.AutoInit();
  }, []);

  //Show a toast message
  useEffect(() => {
    if (toastMessage) {
      M.toast({ html: toastMessage });
    }
  }, [toastMessage]);

  //Show errors that occured
  useEffect(() => {
    if (error) {
      //Check if the errors are from the validation at the api
      if (error.errors && error.errors.length) {
        for (let i = 0; i < error.errors.length; ++i) {
          if (error.errors[i].msg) {
            M.toast({ html: error.errors[i].msg });
          }
        }
      } else {
        M.toast({ html: error });
      }
    }
  }, [error]);

  //If loading or if the list are still not fetched show a progress spinner
  if (loading || !todoLists) {
    return <ProgressSpinner />;
  }

  return (
    <Fragment>
      <TodoLists todoLists={todoLists} />
      <div className='fixed-action-btn'>
        <Link
          to='/todo'
          className='btn-floating btn-large waves-effect waves-light indigo'
        >
          <i className='material-icons'>add</i>
        </Link>
      </div>
    </Fragment>
  );
};
TodoLists.propTypes = {
  todoLists: PropTypes.object.isRequired,
  getTodoLists: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  todoLists: state.todoLists
});
export default connect(
  mapStateToProps,
  { getTodoLists }
)(TodoListsContainer);

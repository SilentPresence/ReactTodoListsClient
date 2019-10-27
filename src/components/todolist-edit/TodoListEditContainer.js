import React, { useEffect, useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import TodoListEdit from './TodoListEdit';
import ProgressSpinner from '../layout/ProgressSpinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuid from 'uuid';
import M from 'materialize-css/dist/js/materialize.min.js';
import {
  getTodoList,
  addTodoListItem,
  updateTodoList,
  clearSavedFlag,
  todoListEditUnloaded,
  addTodoList
} from '../../actions/todoListEditActions';

const TodoListEditContainer = ({
  match,
  todoListEdit: { todoList, loading, saveSuccess, toastMessage, error },
  getTodoList,
  addTodoListItem,
  addTodoList,
  clearSavedFlag,
  todoListEditUnloaded,
  updateTodoList
}) => {
  const [title, setTitle] = useState('');
  const [newTodoItem, setNewTodoItem] = useState('');
  let { id } = useParams();

  //Initialize the materialize library
  useEffect(() => {
    M.AutoInit();
  }, []);

  //Clear the current state of the todo list
  useEffect(() => {
    todoListEditUnloaded();
  }, [todoListEditUnloaded]);

  //Set the title of the list when it is loaded
  useEffect(() => {
    if (todoList.title) {
      setTitle(todoList.title);
    }
  }, [todoList]);

  //Fetch the list if an id was provided
  useEffect(() => {
    if (id) {
      getTodoList(id);
    } else {
      setTitle('');
      setNewTodoItem('');
    }
    // eslint-disable-next-line
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
      if (error.errors && error.errors.length) {
        for (let i = 0; i < error.errors.length; ++i) {
          M.toast({ html: error.errors[i].msg });
        }
      } else {
        M.toast({ html: error });
      }
    }
  }, [error]);

  const titleChange = event => {
    setTitle(event.target.value);
  };
  const todoChange = event => {
    setNewTodoItem(event.target.value);
  };

  const addClicked = event => {
    if (!newTodoItem || !newTodoItem.trim()) {
      M.toast({ html: 'Cannot add an empty todo item' });
      return;
    }
    const newItem = {
      tempId: uuid(),
      todo: newTodoItem.trim(),
      completed: false
    };

    addTodoListItem(newItem);
    M.toast({ html: `"${newTodoItem}" was added` });
    setNewTodoItem('');
  };

  const saveClicked = async event => {
    if (!title || !title.trim()) {
      M.toast({ html: 'Cannot save a todo list without a title' });
      return;
    }
    if (!todoList.items.length) {
      M.toast({ html: 'Cannot save a todo list without items' });
      return;
    }
    const savedTodoList = { ...todoList, title: title };
    if (id) {
      updateTodoList(savedTodoList);
    } else {
      addTodoList(savedTodoList);
    }
  };

  //If a save was successful, go back to the todo lists
  if (saveSuccess) {
    M.toast({ html: `Saved ${title} successfully` });
    clearSavedFlag();
    return <Redirect to='/' />;
  }
  //If loading or if the list  is still not fetched show a progress spinner
  if (loading || !todoList) {
    return <ProgressSpinner />;
  }
  //Fix a problem with the floating label occuring if the input is prefilled
  const labelCss = title ? { className: 'active' } : {};
  return (
    <Fragment>
      <div className='row'>
        <form className='col s12'>
          <div className='row'>
            <div className='input-field col s12'>
              <input
                id='title'
                type='text'
                className='validate'
                value={title}
                onChange={titleChange}
              />
              <label {...labelCss} htmlFor='title'>
                Title
              </label>
            </div>
          </div>
        </form>
        <form className='col s12'>
          <div className='row'>
            <div className='input-field col s11'>
              <input
                id='newTodoItem'
                type='text'
                className='validate'
                value={newTodoItem}
                onChange={todoChange}
              />
              <label htmlFor='newTodoItem'>New Todo Item</label>
            </div>
            <div className='input-field col s1'>
              <a
                href='#!'
                className='waves-effect waves-light btn'
                onClick={addClicked}
              >
                Add Todo
              </a>
            </div>
          </div>
        </form>
        <TodoListEdit todoList={todoList} />
      </div>
      <div className='fixed-action-btn'>
        <a
          href='#!'
          onClick={saveClicked}
          className='btn-floating btn-large waves-effect waves-light indigo'
        >
          <i className='material-icons'>save</i>
        </a>
      </div>
    </Fragment>
  );
};

TodoListEdit.propTypes = {
  todoLists: PropTypes.object,
  getTodoList: PropTypes.func.isRequired,
  addTodoListItem: PropTypes.func.isRequired,
  addTodoList: PropTypes.func.isRequired,
  clearSavedFlag: PropTypes.func.isRequired,
  todoListEditUnloaded: PropTypes.func.isRequired,
  updateTodoList: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  todoListEdit: state.todoListEdit
});
export default connect(
  mapStateToProps,
  {
    getTodoList,
    addTodoListItem,
    addTodoList,
    updateTodoList,
    clearSavedFlag,
    todoListEditUnloaded
  }
)(TodoListEditContainer);

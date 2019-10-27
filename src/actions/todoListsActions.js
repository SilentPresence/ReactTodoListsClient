import {
  GET_TODO_LISTS,
  DELETE_TODO_LIST,
  SET_LOADING,
  SET_CURRENT_DELETED,
  CLEAR_CURRENT_DELETED,
  TODO_LISTS_ERROR,
  SET_CURRENT_VIEWED,
  SHOW_TOAST
} from './types';
import axios from 'axios';

export const getTodoLists = () => async dispatch => {
  try {
    setLoading();
    const res = await axios.get('/api/todo-lists');
    dispatch({
      type: GET_TODO_LISTS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: TODO_LISTS_ERROR,
      payload: error.response.data
    });
  }
};

export const deleteTodoLists = todoList => async dispatch => {
  try {
    setLoading();
    await axios.delete(`/api/todo-lists/${todoList._id}`);
    dispatch({
      type: DELETE_TODO_LIST,
      payload: todoList._id
    });
    dispatch({
      type: SHOW_TOAST,
      payload: `${todoList.title} was successfully deleted`
    });
  } catch (error) {
    dispatch({
      type: TODO_LISTS_ERROR,
      payload: error.response.data
    });
  }
};
//Set the current todo list that will be viewed in a modal
export const setCurrentViewed = todoList => {
  return {
    type: SET_CURRENT_VIEWED,
    payload: todoList
  };
};

//Set the todo list the will be deleted
export const setCurrentDeleted = todoList => {
  return {
    type: SET_CURRENT_DELETED,
    payload: todoList
  };
};
//Clear the todo list that was going to be deleted
export const clearCurrentDeleted = () => {
  return {
    type: CLEAR_CURRENT_DELETED
  };
};
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};

import React from 'react';
import TodoListsItem from './TodoListsItem/TodoListsItem';
const TodoLists = ({ todoLists }) => {
  return (
    <ul className='collection with-header'>
      <li className='collection-header'>
        <div className='center'>Todo Lists</div>
      </li>
      {todoLists.length === 0 ? (
        <p className='center'>Nothing to do yet</p>
      ) : (
        todoLists.map(todoList => (
          <TodoListsItem key={todoList._id} todoList={todoList} />
        ))
      )}
    </ul>
  );
};
export default TodoLists;

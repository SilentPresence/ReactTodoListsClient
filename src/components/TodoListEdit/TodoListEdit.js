import React from 'react';
import TodoListItem from './TodoListItem/TodoListItem';

const TodoListEdit = ({ todoList }) => {
  return (
    <ul className='collection with-header'>
      <li className='collection-header'>
        <div className='center'>Todo Items</div>
      </li>
      {todoList.items.length === 0 ? (
        <p className='center'>Nothing to do yet</p>
      ) : (
        todoList.items.map(todoItem => (
          <TodoListItem
            key={todoItem.tempId + todoItem.todo}
            todoItem={todoItem}
          />
        ))
      )}
    </ul>
  );
};

export default TodoListEdit;

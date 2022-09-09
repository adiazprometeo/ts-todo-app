import React, {FC} from "react";
import { TodoListItem } from '../todo-list-item';

interface TodoListProps {
  todos: Array<Todo>;
  toggleComplete: ToggleComplete;
}

export const TodoList: FC<TodoListProps> = ({ todos, toggleComplete }) => (
    <ul>
     {todos.map(todo => (
       <TodoListItem
          key={todo.text}
          todo={todo}
          toggleComplete={toggleComplete}
        />
     ))}
    </ul>
  );

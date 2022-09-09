// /components/todo-list-item/todo-list-item.tsx
import React, {FC} from "react";

interface TodoListItemProps {
  todo: Todo;
  toggleComplete: ToggleComplete;
}

export const TodoListItem: FC<TodoListItemProps> = ({ todo, toggleComplete }) => (
    <li>
      <label className={todo.complete? "todo-row completed" : "todo-row"}>
      <input
        type="checkbox"
        onChange={() => toggleComplete(todo)}
        checked={todo.complete}
        />
        {todo.text}
      </label>
    </li>
  )

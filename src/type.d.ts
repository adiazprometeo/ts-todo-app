/* eslint-disable */
type AddTodo = (newTodo: string) => void;

/* eslint-disable */
type Todo = {
    text: string;
    complete: boolean;
}

/* eslint-disable */
type ToggleComplete = (selectedTodo: Todo) => void;

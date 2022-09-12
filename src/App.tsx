import React, { useState } from 'react';
import './App.css';
import styled, { DefaultTheme, ThemeProvider } from 'styled-components';

import { TodoForm, TodoList } from './components';
import { defaultTheme, secondaryTheme } from './theme';
import { Modal } from './components/modal';

enum VARIANT {
  PRIMARY = 1,
  SECONDARY
}
interface IProps {
  variant?: VARIANT
}

const Button = styled.button<IProps>`
  margin: 8px;
  border-radius: ${props => props.theme.borderRadius};
  ${props => {
    switch (props.variant) {
      case VARIANT.SECONDARY:
        return `
          color: ${props.theme.palette.secondary.contrastText};
          background-color: ${props.theme.palette.secondary.main};
        `;
      case VARIANT.PRIMARY:
      default:
        return `
          color: ${props.theme.palette.primary.contrastText};
          background-color: ${props.theme.palette.primary.main};
        `;
    }
  }}
`;

const App = () => {
  const [theme, setTheme] = useState<DefaultTheme>(defaultTheme);
  const updateTheme = () => {
    setTheme(secondaryTheme);
  }  
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const toggleComplete: ToggleComplete = selectedTodo => {
  const updatedTodos = todos.map(todo => {
      if (todo === selectedTodo) {
        return { ...todo, complete: !todo.complete };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  const addTodo: AddTodo = newTodo => {
    if (newTodo !== "") {
      setTodos([...todos, { text: newTodo, complete: false }]);
    }
  };
  const [active, setActive] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <div className="todo-app">
      <header>
        <h1>
        Todo App
        </h1>
      </header>
      <Button onClick={() => setActive(true)}>Open Modal</Button>
      <Modal
        active={active}
        hideModal={() => setActive(false)}
        title="Modal title goes here"
        footer={<Button>Footer Button</Button>}
      >
        Modal body content goes here..
      </Modal>

      <TodoForm addTodo={addTodo}/>
      <TodoList todos={todos} toggleComplete={toggleComplete} />
      <Button variant={VARIANT.PRIMARY}
          onClick={updateTheme}>PRIMARY BUTTON</Button>
        <Button
          variant={VARIANT.SECONDARY}
          onClick={updateTheme}
      >
        SECONDARY BUTTON
      </Button>
    </div>
    </ThemeProvider>
    
  );
}

export default App;

# Crear una lista de tareas pendientes

## Creando la estructura inicial del proyecto

Vamos a utilizar React y crearemo el proyecto usando Creat React App, con la plantilla para Typescript.

```bash
$> npx create-react-app ts-todo-app --template typescript
$> rm -rf .git
$> cd ts-todo-app
```

Creará una carpeta de proyecto con el nombre 'todo-app'. Y podemos ejecutarlo localmente mediante el comando:

```bash
# NPM
$> npm start

# YARN
$> yarn start
```

Y abra http://localhost:3000 en el navegador para ver nuestra aplicación.

Pensemos en qué componentes necesitaríamos: 

- Necesitamos un formulario para que los usuarios ingresen sus tareas.
- Una lista de los elementos existentes actualmente. 

Creemos una carpeta `components` en nuestro proyecto y agreguemos nuestros componentes allí, comenzando con el formulario:

> **src/components/todo-form/todo-form.tsx**

```tsx
// /src/components/todo-form/todo-form.tsx
import React, { useState } from 'react';

export const TodoForm = () => { 
  const [newTodo, setNewTodo] = useState<string>("");

  return ( 
    <form className="todo-form"> 
      <input type="text" value={newTodo} className="todo-input" placeholder="Añadir una tarea pendiente" /> 
        <button type="submit" className="todo-button"> 
          Agregar Todo 
        </button> 
    </form> 
  ) 
};
```

Este formulario incluye entrada, donde los usuarios escribirán el elemento que desean agregar y un botón que creará ese elemento. Para almacenar la entrada del usuario, también agregué un gancho `newTodoque` que almacenará el valor mientras escriben. Como puede ver, dado que estamos usando TS, también tenemos que declarar tipos para nuevas variables, ganchos, funciones, etc. Aquí, dado que el valor de la entrada sería texto, declaré nuestro gancho como string.Ahora, podemos escribir pero el valor no se actualiza porque no tenemos un método `handleChange`, así que agreguemos eso:

```tsx
// /src/components/todo-form/todo-form.tsx
 const handleChange = (e: ChangeEvent<HTMLInputElement>) => { 
    setNewTodo(e.target.value); 
 }
```

Como acepta un evento, tenemos que describir qué tipo de evento es y podemos importar `ChangeEvent` desde React en la parte superior:

```tsx
// /src/components/todo-form/todo-form.tsx
import React, { useState, ChangeEvent } from 'react';
```

Agreguemos también el método de envío:

```tsx
// /src/components/todo-form/todo-form.tsx
  const handleSubmit = (evt: FormEvent<HTMLButtonElement>) => { 
    evt.preventDefault(); 
    addTodo(newTodo); // --> pasaremos esto al componente Funcional como props
    setNewTodo(""); 
  }
```

Aquí suceden algunas cosas: estamos definiendo el evento como `FormEvent` ya que el envío ocurre como parte del formulario y luego agregamos `preventDefault` para que la página no se vuelva a cargar y no perdamos nuestro estado. En tercer lugar, el método `addTodo` provendrá del componente principal como accesorios, porque el elemento principal tendrá la lista de elementos pendientes, por lo que necesita saber cuál es el nuevo elemento que queremos agregar. Y por último, actualizamos nuestro estado local de `newTodo` para que esté vacío `""` porque el usuario ya agregó el nuevo elemento, sin motivo para mantener el cuadro de entrada lleno con el valor anterior.

Ahora aquí está la parte interesante, una vez que agregamos argumentos a un componente funcional, debemos escribirlos para que el componente sepa qué tipos esperar. Para esto, suelo crear un `Interface`.

> **NOTAS**
>
> [TypeScript Types Vs. Interfaces](https://www.youtube.com/watch?v=bEuXRAr0BVo&t=111s): https://www.youtube.com/watch?v=bEuXRAr0BVo&t=111s

Así que antes del componente, podemos hacer:

```tsx
// /src/components/todo-form/todo-form.tsx
interface TodoFormProps { 
  addTodo: (newTodo: string) => void; 
}
```

Y actualice la declaración del componente para que sea:

```tsx
// /src/components/todo-form/todo-form.tsx
import React, { FC, useState, ChangeEvent } from 'react';

export const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => { 
// resto del código
```

Lo que esto hace es que declarará que **props** pasado por nombre `addTodo` es una función que no devuelve nada (tenemos `void` como valor de retorno), y que toma un argumento: `newTodo` que es de tipo **string**. Esta es información suficiente para el componente por ahora, pero también tenemos que crear `addTodo` en el componente principal antes de pasarlo como accesorios y allí también tendríamos que escribirlo. Para facilitar la escritura, podemos utilizar el archivo `type.d.ts` donde podemos definir los tipos que utilizan varios componentes para no tener que repetir las mismas escrituras varias veces. Tenga en cuenta que la extension `d.ts` se asegura de que los tipos definidos allí se importen en todas partes del proyecto y no tengamos que usar declaraciones de importación en la parte superior. Entonces, creemos ese archivo si aún no lo tiene en la raíz del proyecto y agregue el tipo `AddTodo`:

```tsx
type AddTodo = (newTodo: string) => void;
```

Ahora modificaremos nuestro componente `TodoForm` para usar este tipo y se verá así:

```tsx
// /src/components/todo-form/todo-form.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface TodoFormProps {
  addTodo: AddTodo;
}

export const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [newTodo, setNewTodo] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  }

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addTodo(newTodo);
    setNewTodo("");
  }

  return (
    <form className="todo-form">
      <input type="text" value={newTodo} className="todo-input" placeholder="Add a todo" onChange={handleChange} />
        <button type="submit" className="todo-button" onClick={handleSubmit}>
          Add Todo
        </button>
    </form>
  )
};
```

Y para ver cómo funciona el formulario, lo agregaremos a nuestro archivo `App.tsx`, tendríamos que pasar la función `addTodo` y crear una lista de elementos pendientes como estado:

```tsx
// /src/App.tsx
import React, { useState } from 'react';
import './App.css';
import { TodoForm } from './components/todo-form/todo-form';

function App() {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const addTodo: AddTodo = newTodo => {
    if (newTodo !== "") {
      setTodos([...todos, { text: newTodo, complete: false }]);
    }
  };

  return (
    <div className="todo-app">
      <header>
        <h1>
        Todo App
        </h1>
      </header>
      <TodoForm addTodo={addTodo}/>
    </div>
  );
};

export default App;
```

y crearé un nuevo tipo `Todo` que almacenará 2 valores: el nombre de la tarea pendiente y el estado (ya sea que se haya completado o no):

```ts
// /src/types.d.ts

type Todo = {
  text: string;
  complete: boolean;
}
```

Ahora, podemos pasar a la lista de tareas, comencemos con su componente más pequeño (último hijo) que será el elemento de la lista en sí:

```tsx
// /src/components/todo-list-item/todo-list-item.tsx
import React from "react";

interface TodoListItemProps {
  todo: Todo;
  toggleComplete: ToggleComplete;
}

export const TodoListItem: React.FC<TodoListItemProps> = ({ todo, toggleComplete }) => {
  return (
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
}
```

Los elementos de la lista serían casillas de verificación, que tendrán el nombre de Todo como texto y un método que se le pasará `toggleComplete`, así como el elemento `Todo` en sí.

Lo usé como un tipo `ToggleComplete` y lo declararé en el archivo de tipos:

```tsx
// /src/types.d.ts

type ToggleComplete = (selectedTodo: Todo) => void;
```

Tomará un argumento, ya que necesitamos saber en qué elemento de la lista se realizó la acción, pero no necesitamos devolver nada.
Pasando a su padre, necesitamos crear una lista donde podamos almacenar todos los elementos:

```tsx
// /src/components/todo-list/todo-list.tsx 
import React from "react";
import { TodoListItem } from '../todo-list-item';

interface TodoListProps {
  todos: Array<Todo>;
  toggleComplete: ToggleComplete;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, toggleComplete }) => {
  return (
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
};
```

Aquí simplemente estamos tomando la lista del tipo `Todo` y la función que necesitamos usar una vez que el usuario interactúa con el elemento de tareas pendientes y mapeando los elementos y pasándoles funciones.

Ahora que la lista está lista, podemos incluirla en nuestro App.tsx y agregar allí la función que debemos pasar a nuestro componente de lista, el resultado final de `App.tsx` se vería así:

```tsx
import React, { useState } from 'react';
import './App.css';

import { TodoForm, TodoList } from './components';

function App() {
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

  return (
    <div className="todo-app">
      <header>
        <h1>
        Todo App
        </h1>
      </header>
      <TodoForm addTodo={addTodo}/>
      <TodoList todos={todos} toggleComplete={toggleComplete} />
    </div>
  );
};

export default App;
```

Y estas son las actualizaciones de estilo que hice para `App.css`:

```css
.todo-app {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 500px;
  min-height: 500px;
  background: white;
  text-align: center;
  margin: 128px auto;
  border-radius: 5px;
}

h1 {
  margin: 32px 0;
  font-size: 24px;
}

.completed {
  text-decoration: line-through;
  opacity: 0.4;
}

.todo-form {
  margin-bottom: 32px;
}

.todo-button {
  padding: 16px;
  border: none;
  border-radius: 0 20px 20px 0;
  cursor: pointer;
  outline: none;
  background: linear-gradient(
    90deg,
    rgba(105, 20, 204, 1) 0%,
    rgba(44, 114, 251, 1) 100%
  );
  color: #fff;
  text-transform: capitalize;
}

.todo-input {
  padding: 15px 32px 15px 16px;
  border-radius: 20px 0 0 20px;
  border: 1px solid #dfe1e5;
  outline: none;
  width: 320px;
  background: transparent;
}

.todo-input.edit {
  border: 2px solid #149fff;
}

.todo-button.edit {
  background: linear-gradient(
    90deg,
    rgba(20, 159, 255, 1) 0%,
    rgba(17, 122, 255, 1) 100%
  );
  padding: 16px 22px;
}

.todo-container {
  display: flex;
  flex-direction: row;
  position: relative;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.todo-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  margin: 4px auto;
padding: 16px;
  border-radius: 20px;
  width: 80%;
}

.todo-row input {
  margin-right: 10px;
}
```

## Configure ESLint, Prettier y CommitLint

> Entonces, si quiere ir rápido, si quiere terminar rápido, si quiere que su código sea fácil de escribir, hágalo fácil de leer. Por **Robert C. Martín**.

Tener un código limpio es una gran ayuda cuando trabajas en equipo en un proyecto masivo. Esto ahorra una tonelada de tiempo durante la depuración y hace que la revisión del código entre pares sea muy fluida. Pero, ¿cómo logras eso? Es bastante simple. Usando `husky`, `pre-commit`, `es-lint`, `commitlint` y `prettier` en combinación. Vamos a discutir acerca de cada uno de ellos.

- **Husky**: Husky es una herramienta inmensamente popular que le permite ejecutar secuencias de comandos personalizadas en su repositorio. Puede funcionar perfectamente con cualquier repositorio que tenga un archivo `package.json`. Puede ayudar a mejorar la calidad del código al garantizar que las pruebas unitarias, el linting y otras verificaciones se ejecuten automáticamente antes de cada confirmación. Lea más sobre esto [aquí](https://typicode.github.io/husky).

- **Pre-Commit**: Pre-commit es un instalador de enlace de pre-commit para git. Los ganchos de confirmación previa son los scripts que le gustaría ejecutar antes de que el código se confirme en el repositorio remoto. Es diferente del husky. Puede imaginarse el compromiso previo de ser un automóvil y husky como su conductor. Sin, no puede aprovechar el potencial de compromiso previo.

- **EsLint**: desarrollado por **Nicholas C. Zakas en junio de 2013**, ESLint es una herramienta de linting EcmaScript/Javascript de código abierto que se utiliza para verificar patrones problemáticos o código que no se adhiere a ciertas pautas de estilo. Utiliza un árbol de sintaxis abstracta (AST) para evaluar patrones en el código. Lea más sobre AST [aquí](https://en.wikipedia.org/wiki/Abstract_syntax_tree). Es completamente conectable, cada regla es un complemento y puede agregar más en tiempo de ejecución.

- **Commitlint**: similar a Eslint, commit-lint es una utilidad que borra las confirmaciones y hace que su equipo se adhiera a un estilo de confirmación particular siguiendo las reglas definidas. Funciona como un gancho fornido de confirmación previa, lo que significa que se ejecuta mucho antes de que se confirme el código e impide que se confirme si fallan las comprobaciones de lint.

- **Prettier**: Prettier es un formateador de código obstinado. Aplica un estilo consistente analizando su código y reimprimiéndolo con sus propias reglas que toman en cuenta la longitud máxima de línea, ajustando el código cuando es necesario. Con mucho, la principal razón para adoptar Prettier es detener todos los debates en curso sobre los estilos . En general, se acepta que tener una guía de estilo común es valioso para un proyecto y un equipo, pero lograrlo es un proceso muy doloroso y poco gratificante.

Para habilitar la confirmación previa, debe inicializar un repositorio de git. Hagamos eso ahora.

```bash
$> git init
$> git add .
$> git branch -M develop
```

Ahora, instalemos nuestras dependencias.

```bash
$> yarn add --dev husky lint-staged prettier eslint eslint-config-airbnb eslint-config-airbnb-base @typescript-eslint/parser @typescript-eslint/eslint-plugin @commitlint/cli @commitlint/config-conventional eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks
```

Una vez finalizadas las instalaciones. Comencemos configurando **eslint**.

```bash
$> npx eslint --init

You can also run this command directly using 'npm init @eslint/config'.
? How would you like to use ESLint? … 
  To check syntax only
  To check syntax and find problems
❯ To check syntax, find problems, and enforce code style

# Elija los módulos de Javascript.
? What type of modules does your project use? … 
❯ JavaScript modules (import/export)
  CommonJS (require/exports)
  None of these

# Dado que estamos usando React.
? Which framework does your project use? … 
❯ React
  Vue.js
  None of these

# Dependiendo de si está utilizando Typescript o no, continúe con las opciones. Elegiré Sí por ahora.
? Does your project use TypeScript? › No / [Yes]

# Elija el navegador. Si está escribiendo una API de Node JS, debe seleccionar la segunda opción.
? Where does your code run? …  (Press <space> to select, <a> to toggle all, <i> to invert selection)
✔ Browser
✔ Node

How would you like to define a style for your project? · guide
? Which style guide do you want to follow? … 
❯ Standard: https://github.com/standard/eslint-config-standard-with-typescript
  XO: https://github.com/xojs/eslint-config-xo-typescript


? What format do you want your config file to be in? … 
❯ JavaScript
  YAML
  JSON

✔ Would you like to install them now? · No / [Yes]

? Which package manager do you want to use? … 
  npm
❯ yarn
  pnpm

```

Continúe con todas las instalaciones. Después de todas las instalaciones, se le presentará un `.eslintrc.js` o `.eslintrc.json` según el formato que elija anteriormente.

Agreguemos algunas reglas. Puede encontrar una documentación detallada sobre cada uno de ellos [aquí](https://eslint.org/docs/rules/). Voy a mencionar algunos de ellos aquí.

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'react/jsx-filename-extension': [
      2,
      {extensions: ['.js', '.jsx', '.ts', '.tsx']},
    ],
    'no-const-assign': 2,
    'no-dupe-args': 2,
    'no-dupe-class-members': 1,
    'no-dupe-else-if': 2,
    'no-duplicate-imports': 1,
    'no-ex-assign': 1,
    'no-func-assign': 2,
    'no-inner-declarations': 1,
    'no-self-assign': 1,
    'no-sparse-arrays': 2,
    'no-unreachable': 2,
    'no-unused-vars': 2,
    'no-use-before-define': 2,
    camelcase: 2,
    'consistent-return': 1,
    curly: 2,
    'default-case': 2,
    'default-case-last': 2,
    eqeqeq: 1,
    'func-style': [2, 'declaration', {allowArrowFunctions: true}],
    'max-classes-per-file': [2, 1],
    'max-nested-callbacks': [2, 3],
    'no-console': 0,
    'no-extra-semi': 1,
    'no-invalid-this': 0,
    'no-label-var': 2,
    'no-undefined': 2,
    'require-await': 2,
    'react/prefer-stateless-function': [0, {ignorePureComponents: true}],
    'jsx-quotes': [0, 'prefer-double'],
    quotes: 0,
    'spaced-comment': 0,
    'import/prefer-default-export': 0,
    'react/destructuring-assignment': 0,
    'import/newline-after-import': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/label-has-for': 0,
    'react/jsx-props-no-spreading': 0,
    'react/state-in-constructor': 0,
    'lines-between-class-members': 0,
    'react/default-props-match-prop-types': 0,
    'react/require-default-props': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'function-declaration',
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        semi: 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
```

Ahora agregue un script a su `package.json`.

```json
"scripts": {
  ...
 "lint:ts": "eslint \"src/**/*.{js,jsx,ts,tsx}*\" --cache --ignore-path .gitignore",
 "lint:ts:coverage": "yarn lint:ts -f json > coverage/eslint-report.json",
 "lint:ts:fix": "yarn lint:ts --fix"
},
```

Ahora ejecuta:

```bash
$> yarn lint:ts:fix
```

Si no ha seguido ninguna de las reglas anteriores, definitivamente verá algunos errores.

Ahora agreguemos `husky` para ejecutar esto como un enlace previo a la confirmación.

```bash
$> npx husky install
```

Encontrará una carpeta `.husky` creada en su directorio raíz. Navegue al directorio y ejecute:

```bash
$> cd .husky
$> touch commit-msg pre-commit
```

Y agregue el siguiente código dentro de él.

```bash
// /.husky/commit-msg
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn commitlint --edit $1
```

```bash
// /.husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn format && npx lint-staged
```

En su directorio raíz ejecute:

```bash
$> touch commitlint.config.js
```

En él, agregue el siguiente código:

```js
// build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
// ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
// docs: Documentation only changes
// feat: A new feature
// fix: A bug fix
// perf: A code change that improves performance
// refactor: A code change that neither fixes a bug nor adds a feature
// style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
// test: Adding missing tests or correcting existing tests

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'translation',
        'security',
        'changeset',
      ],
    ],
  },
};
```

package.json

```json
  ...
  "scripts: {
    ...
    "prepare": "husky install"
  }
```

```bash
npx husky add .husky/pre-push "yarn build"
npx husky add .husky/pre-commit "yarn lint:ts:fix"
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
# Sometimes above command doesn't work in some command interpreters
# You can try other commands below to write npx --no -- commitlint --edit $1
# in the commit-msg file.
npx husky add .husky/commit-msg \"npx --no -- commitlint --edit '$1'\"
# or
npx husky add .husky/commit-msg "npx --no -- commitlint --edit $1"
```

```bash
$> chmod +x .husky/commit-msg
$> chmod +x .husky/pre-commit
```

Ahora intentemos confirmar nuestro código.

```bash
$> git commit -m "testing commitlint"
```

Obtenga más información sobre las confirmaciones convencionales [aquí](https://www.conventionalcommits.org/en/v1.0.0/).

```bash
$> git commit -m "chore: configure husky"
$> git remote add origen YOUR_GIT_URL
$> git push
```


Es hora de agregar Prettier ahora. Inicia por:

```bash
touch .prettierrc.js
```

En él, agregue el siguiente código:

```js
module.exports = {
  bracketSpacing: false,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'avoid',
};
```

Theme with styled-components and Typescript

```bash
yarn add styled-components
yarn add @types/styled-components -D
```

## Bibliography

- https://judygabeskiria.medium.com/creating-a-to-do-in-typescript-c8b36f332745
- https://blog.devgenius.io/enforce-strict-code-style-in-a-team-cda6f68d944b




import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([])

  const handleAddTodo = () => {
    const title = window.prompt('enter a title')
    const description = window.prompt('enter a description')

    const todo = {title, description}

    setTodos([todo,...todos])
  }
  return (
    <div className="container">
      <h1>Meetup Topics</h1>
      <button className='add-todo-btn' onClick={handleAddTodo}>Add Todo</button>
      <main className='todo-list'>
       {todos.map(todo => (<article className='todo'>
         <h3>{todo.title}</h3>
         <p>{todo.description}</p>
       </article>))}
      </main>
    </div>
  );
}

export default App;

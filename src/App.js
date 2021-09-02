
import { useEffect, useState } from 'react';
import {API} from 'aws-amplify'
import {withAuthenticator, AmplifySignOut} from '@aws-amplify/ui-react'
import './App.css';

function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    API.get('todos', '/todos/title')
    .then(fetchedTodos => setTodos(fetchedTodos))
    .catch(e => console.log(e))
  }, [])

  const handleAddTodo = async () => {
    const title = window.prompt('enter a title')
    const description = window.prompt('enter a description')

    const todo = {title, description}

    setTodos([todo,...todos])
    try {
      const res = await API.post('todos', '/todos', {
        body: todo
      })
      console.log(res)
    }catch (e) {
      console.log(e)
    }
  }

  const handleTodoDelete  = async (title) => {
    console.log(title)
    await API.del('todos', `/todos/object/${title}`)
  } 
  return (
    <div className="container">
      <div style={{alignSelf: 'flex-end'}}>
      <AmplifySignOut/>

      </div>
      <h1>Meetup Topics</h1>
      <button className='add-todo-btn' onClick={handleAddTodo}>Add Todo</button>
      <main className='todo-list'>
       {todos.map(todo => (<article key={todo.title} className='todo' onClick={() => {handleTodoDelete(todo.title)}}>
         <h3>{todo.title}</h3>
         <p>{todo.description}</p>
       </article>))}
      </main>
    </div>
  );
}

export default withAuthenticator(App);

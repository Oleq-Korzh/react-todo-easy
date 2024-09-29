import { useState } from 'react'
import Todo from "./components/Todo/Todo.jsx";
import './styles/main.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container">
        <Todo />
    </div>
  )
}

export default App

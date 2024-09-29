import TodoItem from "./TodoItem.jsx";
import Title from "@/components/Title/Title.jsx";
import '@/styles/components/todo.css'
import {useEffect, useState} from "react";
import { v4 as uuidv4 } from 'uuid';

function Todo() {
    const [value, setValue] = useState("");
    const [todos, setTodos] = useState([]);

    function inputHandler(e) {
        setValue(e.target.value);
    }

    function buttonHandler() {
        if(value.trim() === "") {
            return;
        }

        setTodos((prev) => {
            return [...prev, {
                id: uuidv4(),
                completed: false,
                text: value,
            }]
        })

        setValue("");
    }

    function deleteTask(id) {
        const isConfirm = window.confirm("Are you sure you want to delete this task?");

        if(isConfirm) {
            setTodos(todos => todos.filter(el => el.id !== id));
        }
    }

    function toggleTask(id) {
        setTodos(todos => todos.map(task => {
            if(task.id === id) {
                return {
                    ...task, completed: !task.completed
                }
            }

            return task;
        }));
    }

    function renderTodos(todos) {
        return todos.map(task => {
           return <TodoItem key={task.id} {...task} deleteTask={deleteTask} toggleTask={toggleTask} />
        });
    }

    useEffect(() => {
        try {
            const storedTodos = JSON.parse(localStorage.getItem('todos'));

            if(storedTodos) {
                setTodos(storedTodos);
            }
        } catch (error) {
            console.error(error);
        }

    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    return (
        <div className="todo">
            <Title className="todo__title" text="Todo" />
            <div className="todo__head">
                <input className="todo__input" type="text" value={value} onChange={inputHandler}/>
                <button className="todo__button" onClick={buttonHandler}>Add Todo</button>
            </div>
            <div className="todo__inner">
                {todos.length === 0 && <span className="todo__empty">На даний момент список порожній</span>}
                {todos.length > 0 && (
                    <div className="todo__content">
                        {renderTodos(todos)}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Todo;
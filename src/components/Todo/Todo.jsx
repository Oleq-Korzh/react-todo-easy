import TodoItem from "./TodoItem.jsx";
import Title from "@/components/Title/Title.jsx";
import Button from "@/components/Button/Button.jsx";
import '@/styles/components/todo.css'
import {useCallback, useEffect, useState} from "react";
import { v4 as uuidv4 } from 'uuid';

function Todo() {
    const [value, setValue] = useState("");
    const [todos, setTodos] = useState([]);
    const [isEditing, setIsEditing] = useState('');

    const inputHandler = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    const buttonHandler = useCallback(() => {
        if(value.trim() === "") {
            return;
        }

        if(isEditing) {
            setTodos((prev) => {
               return prev.map(task => {
                  if(task.id === isEditing) {
                      return {
                          ...task,
                          text: value,
                          isEditing: !task.isEditing
                      }
                  } else {
                      return task;
                  }
               });
            });

            setIsEditing('');
        } else {
            setTodos((prev) => {
                return [...prev, {
                    id: uuidv4(),
                    completed: false,
                    isEditing: false,
                    text: value,
                }]
            })
        }

        setValue("");
    }, [value, isEditing]);

    const deleteTask = useCallback((id) => {
        const isConfirm = window.confirm("Are you sure you want to delete this task?");

        if(isConfirm) {
            setTodos(todos => todos.filter(el => el.id !== id));
        }
    }, []);

    const cleanTaskList = useCallback(() => {
        const isConfirm = window.confirm("Are you sure you want to delete all tasks?");

        if(isConfirm) {
            setTodos([]);
            setIsEditing("");
            setValue("");
        }
    }, []);

    const toggleTask = useCallback((id) => {
        setTodos(todos => todos.map(task => {
            if(task.id === id) {
                return {
                    ...task, completed: !task.completed
                }
            }

            return task;
        }));
    }, []);

    function startEditing(id, text) {
        setTodos(todos => todos.map(task => {
            if(task.id === id) {
                return {
                    ...task, isEditing: !task.isEditing
                }
            }

            return task;
        }));
        setIsEditing(id);
        setValue(text);
    }

    const renderTodos = useCallback(todos => {
        return todos.map(task => {
            return (
                <TodoItem
                    key={task.id}
                    {...task}
                    deleteTask={deleteTask}
                    toggleTask={toggleTask}
                    editTask={startEditing}
                />
            );
        });
    }, [deleteTask, toggleTask]);

    useEffect(() => {
        try {
            const storedTodos = JSON.parse(localStorage.getItem('todos'));

            if(storedTodos) {
                setTodos(storedTodos);
            }

            setTodos((prev) => {
               return prev.map(task => {
                   return {
                       ...task,
                       isEditing: false,
                   }
               })
            });
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
                <Button
                    className="todo__button"
                    onClick={buttonHandler}
                >
                    {isEditing ? 'Change Todo' : 'Add Todo'}
                </Button>
            </div>
            <div className="todo__inner">
                {todos.length === 0 && <span className="todo__empty">На даний момент список порожній</span>}
                {todos.length > 0 && (
                        <div className="todo__content">
                            {renderTodos(todos)}
                        </div>
                )}
                {todos.length > 2 && (
                    <div className="todo__allclean">
                        <Button className="todo__allclean-button" onClick={cleanTaskList}>
                            Clean all tasks
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Todo;
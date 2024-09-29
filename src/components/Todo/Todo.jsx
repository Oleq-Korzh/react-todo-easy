import TodoItem from "./TodoItem.jsx";
import Title from "@/components/Title/Title.jsx";
import '@/styles/components/todo.css'

function Todo() {
    return (
        <div className="todo">
            <Title className="todo__title" text="Todo" />
            <div className="todo__head">
                <input className="todo__input" type="text"/>
                <button className="todo__button">Add Todo</button>
            </div>
            <div className="todo__inner">
                <span className="todo__empty">На даний момент список порожній</span>
                <div className="todo__content">

                </div>
            </div>
        </div>
    );
}

export default Todo;
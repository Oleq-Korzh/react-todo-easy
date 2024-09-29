import '@/styles/components/todoItem.css';
import deleteIcon from "@/assets/icons/delete.svg";

function TodoItem({id, text, completed, deleteTask, toggleTask}) {
    return (
        <div className={`todo-item ${completed ? 'todo-item--completed' : ''}`}>
            <div className="todo-item__content">
                <label className="todo-item__label" htmlFor={`check-${id}`}>
                    <input className="todo-item__checkbox" id={`check-${id}`} type="checkbox" checked={completed} onChange={() => toggleTask(id)}/>
                    <span className="todo-item__text">{text}</span>
                </label>
            </div>
            <div className="todo-item__delete" onClick={() => deleteTask(id)}>
                <img className="todo-item__delete-icon" src={deleteIcon} alt="delete"/>
            </div>
        </div>
    );
}

export default TodoItem;
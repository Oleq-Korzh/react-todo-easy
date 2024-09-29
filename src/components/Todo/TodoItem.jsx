import '@/styles/components/todoItem.css';
import deleteIcon from "@/assets/icons/delete.svg";
import editIcon from "@/assets/icons/edit.svg";

function TodoItem({id, text, completed, isEditing, deleteTask, toggleTask, editTask}) {
    return (
        <div className={`todo-item ${completed ? 'todo-item--completed' : ""} ${isEditing ? 'todo-item--edit' : ""}`}>
            <div className="todo-item__content">
                <label className="todo-item__label" htmlFor={`check-${id}`}>
                    <input className="todo-item__checkbox" id={`check-${id}`} type="checkbox" checked={completed} onChange={() => toggleTask(id)}/>
                    <span className="todo-item__text">{text}</span>
                </label>
            </div>
            <div className="todo-item__buttons">
                <div className="todo-item__button todo-item__edit" onClick={() => editTask(id, text)}>
                    <img className="todo-item__button-icon todo-item__edit-icon" src={editIcon} alt="edit"/>
                </div>
                <div className="todo-item__button todo-item__delete" onClick={() => deleteTask(id)}>
                    <img className="todo-item__button-icon todo-item__delete-icon" src={deleteIcon} alt="delete"/>
                </div>
            </div>
        </div>
    );
}

export default TodoItem;
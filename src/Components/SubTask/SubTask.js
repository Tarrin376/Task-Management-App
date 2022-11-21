import styles from './SubTask.module.css';

function SubTask({ addNewTask, placeholder }) {
    return (
        <div className={styles.subTaskComponent}>
            <input type="text" name="" id="" placeholder={placeholder} />
            <button type="button" onClick={(e) => addNewTask(e, true)} id={styles.removeSubtask}>X</button>
        </div>
    )
}

export default SubTask;
import styles from './SubTask.module.css';
import { useRef } from 'react';

function AllSubTasks({ addSubTask, subTasksRefs, addNewSubTask }) {
    return (
        <>
            {addSubTask.map((subtask, index) => {
                return (
                    <SubTask
                        addNewTask={addNewSubTask} subtask={subtask}
                        subTasksRefs={subTasksRefs} key={index} index={index}
                    />
                );
            })}
        </>
    )
}

function SubTask({ addNewTask, subtask, subTasksRefs, index }) {
    const refVal = useRef();
    subTasksRefs[index] = refVal;

    return (
        <div className={styles.subTaskComponent}>
            <input type="text" name="" id="" defaultValue={subtask} ref={refVal} />
            <button type="button" onClick={(e) => addNewTask(true)} id={styles.removeSubtask}>X</button>
        </div>
    )
}

export default AllSubTasks;
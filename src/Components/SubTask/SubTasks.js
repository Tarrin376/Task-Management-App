import styles from './SubTask.module.css';
import { useRef } from 'react';

function AllSubTasks({ addSubTask, subTasksRefs }) {
    return (
        <>
            {addSubTask.map((subtask, index) => {
                return (
                    <SubTask subtask={subtask} subTasksRefs={subTasksRefs} key={index} index={index} />
                );
            })}
        </>
    )
}

function SubTask({ subtask, subTasksRefs, index }) {
    const refVal = useRef();
    subTasksRefs[index] = refVal;

    return (
        <div className={styles.subTaskComponent}>
            <input type="text" name="" id="" defaultValue={subtask} ref={refVal} />
            <button type="button" id={styles.removeSubtask}>X</button>
        </div>
    )
}

export default AllSubTasks;
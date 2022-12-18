import styles from './SubTask.module.css';
import { useState, useEffect } from 'react';

function AllSubTasks({ subtasksRef, removeSubTask }) {
    return (
        <>
            {subtasksRef.current.map((subtask, index) => {
                return (
                    <SubTask
                        textValue={subtask[0]} removeSubTask={removeSubTask}
                        key={subtask[1]} id={subtask[1]} index={index}
                        subtasksRef={subtasksRef.current}
                    />
                );
            })}
        </>
    )
}

export function SubTask({ textValue, removeSubTask, id, index, subtasksRef }) {
    const [value, setValue] = useState(textValue);

    useEffect(() => {
        subtasksRef[index][0] = value;
    }, [value, index, subtasksRef])

    return (
        <div className={styles.subTaskComponent} value={value}>
            <input type="text" name="" id="" defaultValue={textValue} onChange={(e) => setValue(e.target.value)} />
            <button type="button" id={styles.removeSubtask} onClick={() => removeSubTask(id)}>X</button>
        </div>
    )
}

export default AllSubTasks;
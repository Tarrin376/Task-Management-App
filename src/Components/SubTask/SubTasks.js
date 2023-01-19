import styles from './SubTasks.module.css';
import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../Wrappers/Theme';

function AllSubTasks({ subtasksRef, removeSubTask }) {
    return (
        <div className={styles.subtasks}>
            {subtasksRef.current.map((subtask, index) => {
                return (
                    <SubTask
                        textValue={subtask[0]} removeSubTask={removeSubTask}
                        key={subtask[1]} id={subtask[1]} index={index}
                        subtasksRef={subtasksRef.current}
                    />
                );
            })}
        </div>
    )
}

export function SubTask({ textValue, removeSubTask, id, index, subtasksRef }) {
    const [value, setValue] = useState(textValue);
    const context = useContext(ThemeContext);

    useEffect(() => {
        subtasksRef[index][0] = value;
    }, [value, index, subtasksRef])

    return (
        <div className={styles.subTaskComponent} value={value}>
            <input type="text" name="" id="" defaultValue={textValue} onChange={(e) => setValue(e.target.value)} />
            <button type="button" className={styles.removeSubtask} id={styles[`remove${context.theme}`]} onClick={() => removeSubTask(id)}>X</button>
        </div>
    )
}

export default AllSubTasks;
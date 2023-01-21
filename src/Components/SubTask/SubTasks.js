import styles from './SubTasks.module.css';
import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../Wrappers/Theme';
import { exampleSentences } from '../../utils/ExampleSentences';

const MAX_SUBTASK_CHARS = 120;

function AllSubTasks({ subtasksRef, removeSubTask, randomRef }) {
    return (
        <>
            {subtasksRef.current.map((subtask, index) => {
                return (
                    <SubTask
                        textValue={subtask[0]} removeSubTask={removeSubTask}
                        key={subtask[1]} id={subtask[1]} index={index}
                        subtasksRef={subtasksRef.current} randomRef={randomRef}
                    />
                );
            })}
        </>
    )
}

export function SubTask({ textValue, removeSubTask, id, index, subtasksRef, randomRef }) {
    const [value, setValue] = useState(textValue);
    const context = useContext(ThemeContext);

    useEffect(() => {
        subtasksRef[index][0] = value;
    }, [value, index, subtasksRef])

    return (
        <div className={styles.subTaskComponent} value={value}>
            <input type="text" name="" id="" defaultValue={textValue} 
            placeholder={index === 0 ? 'e.g ' + exampleSentences[randomRef.current].subtask : ''} 
            onChange={(e) => setValue(e.target.value)} maxLength={MAX_SUBTASK_CHARS}/>
            <button type="button" className={styles.removeSubtask} 
            id={styles[`remove${context.theme}`]} onClick={() => removeSubTask(id)}>
                X
            </button>
        </div>
    )
}

export default AllSubTasks;
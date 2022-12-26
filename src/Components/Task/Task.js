import styles from './Task.module.css';
import React, { useState, useContext } from 'react';
import ViewTask from '../ViewTask/ViewTask';
import { ThemeContext } from '../../Wrappers/Theme';

function Task({ taskData, boardData, setBoardData, boardName, columnId, setUpdateBoard, prefix }) {
    const [viewTask, setViewTask] = useState(false);
    const themeContext = useContext(ThemeContext);

    return (
        <>
            <div className={styles.task} id={styles[`task${themeContext.theme}`]} onClick={() => setViewTask(true)}>
                <div className={styles.taskWrapper}>
                    <h2>{highlightPrefix(taskData.title, prefix)}</h2>
                    <div className={styles.taskPriority} id={styles[taskData.priority]}>
                        <p>{taskData.priority}</p>
                    </div>
                </div>
                <SubTaskCount taskData={taskData} notInView={true} />
                <p id={styles.modified}>Modified on {new Date(taskData.id).toLocaleString()}</p>
            </div>
            {viewTask && <ViewTask
                taskData={taskData} setViewTask={setViewTask}
                boardData={boardData} setBoardData={setBoardData}
                boardName={boardName} columnId={columnId}
                setUpdateBoard={setUpdateBoard}
            />}
        </>
    );
}

export function highlightPrefix(word, prefix) {
    let cur = 0;
    return [...word].map((char, index) => {
        if (prefix && cur < prefix.length && char !== " ") {
            cur += 1;
            return <span id={styles.highlight} key={index}>{char}</span>;
        } else {
            return <span key={index}>{char}</span>;
        }
    });
}

export function SubTaskCount({ taskData, notInView }) {
    return (
        <>
            {taskData.subtasks ? <p className={styles.countSubtasks}>
                {taskData.subtasks.reduce((acc, cur) => {
                    if (cur.completed) return acc + 1;
                    else return acc;
                }, 0)} out of {taskData.subtasks.length} {notInView ? 'subtasks' : 'completed'}
            </p> : <p className={styles.countSubtasks}>No subtasks</p>}
        </>
    );
}

export default Task;
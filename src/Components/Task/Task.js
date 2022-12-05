import styles from './Task.module.css';
import React, { useState, useContext } from 'react';
import ViewTask from '../ViewTask/ViewTask';
import { ThemeContext } from '../../Wrappers/Theme';

function Task({ taskData, boardData, setBoardData, boardName, columnId }) {
    const [taskContainer, setTaskContainer] = useState(false);
    const themeContext = useContext(ThemeContext);

    return (
        <>
            <div className={styles.task} id={styles[`task${themeContext.theme}`]} onClick={() => setTaskContainer(true)}>
                <h3>{taskData.title}</h3>
                <SubTaskCount taskData={taskData} notInView={true} />
                <p id={styles.modified}>Modified on {new Date(parseInt(taskData.id)).toLocaleString()}</p>
            </div>
            {taskContainer && <ViewTask
                taskData={taskData}
                setTaskContainer={setTaskContainer}
                boardData={boardData}
                setBoardData={setBoardData}
                boardName={boardName}
                columnId={columnId}
            />}
        </>
    );
}

export function SubTaskCount({ taskData, notInView }) {
    return (
        <>
            {taskData.subtasks ? <p className={styles.countSubtasks}>
                {taskData.subtasks.reduce((acc, cur) => {
                    if (cur.completed) return acc + 1;
                    else return acc;
                }, 0)} out of {taskData.subtasks.length} {notInView && 'subtasks'}
            </p> : <p className={styles.countSubtasks}>No subtasks</p>}
        </>
    );
}

export default Task;
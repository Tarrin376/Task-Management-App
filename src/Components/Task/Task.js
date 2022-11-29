import styles from './Task.module.css';
import React, { useState } from 'react';
import ViewTask from '../ViewTask/ViewTask';

function Task({ taskData, boardData, columnIndex, setBoardData }) {
    const [taskContainer, setTaskContainer] = useState(false);
    return (
        <>
            <div className={styles.task} onClick={() => setTaskContainer(true)}>
                <h3>{taskData.title}</h3>
                <SubTaskCount taskData={taskData} notInView={true} />
            </div>
            {taskContainer && <ViewTask
                taskData={taskData}
                setTaskContainer={setTaskContainer}
                boardData={boardData}
                columnIndex={columnIndex}
                setBoardData={setBoardData}
            />}
        </>
    );
}

export function SubTaskCount({ taskData, notInView }) {
    if (!taskData.subtasks) {
        return <p className={styles.countSubtasks}>No subtasks</p>
    }

    return (
        <>
            {taskData.subtasks &&
                <p className={styles.countSubtasks}>
                    {taskData.subtasks.reduce((acc, cur) => {
                        if (cur.completed) return acc + 1;
                        else return acc;
                    }, 0)} out of {taskData.subtasks.length} {notInView && 'subtasks'}
                </p>}
        </>
    );
}

export default Task;
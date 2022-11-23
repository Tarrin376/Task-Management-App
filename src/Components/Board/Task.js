import styles from './Task.module.css';
import React, { useState } from 'react';
import ViewTask from '../ViewTask/ViewTask';

function Task({ taskData, boardName, boardData }) {
    const [taskContainer, setTaskContainer] = useState(false);
    return (
        <React.Fragment>
            <div className={styles.task} onClick={() => setTaskContainer(true)}>
                <h3>{taskData.title}</h3>
                <p>{taskData.subtasks.reduce((acc, cur) => {
                    if (cur.completed) return acc + 1;
                    else return acc;
                }, 0)} out of {taskData.subtasks.length} subtasks</p>
            </div>
            {taskContainer && <ViewTask
                taskData={taskData}
                setTaskContainer={setTaskContainer}
                boardName={boardName}
                boardData={boardData}
            />}
        </React.Fragment>
    );
}

export default Task;
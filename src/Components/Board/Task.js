import styles from './Task.module.css';
import React, { useState } from 'react';
import ViewTask from '../ViewTask/ViewTask';

function Task({ taskData }) {
    const [taskContainer, setTaskContainer] = useState(false);
    return (
        <React.Fragment>
            <div className={styles.task} onClick={() => setTaskContainer(true)}>
                <h3>{taskData.task_desc}</h3>
                <p>{taskData.subtasks.reduce((acc, cur) => {
                    if (cur.completed) return acc + 1;
                    else return acc;
                }, 0)} out of {taskData.subtasks.length} subtasks</p>
            </div>
            {taskContainer && <ViewTask taskData={taskData} />}
        </React.Fragment>
    );
}

export default Task;
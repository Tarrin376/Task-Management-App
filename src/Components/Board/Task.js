import styles from './Task.module.css';

function Task({ taskData }) {
    return (
        <div className={styles.task}>
            <h3>{taskData.task_desc}</h3>
            <p>{taskData.subtasks.reduce((acc, cur) => {
                if (cur.completed) return acc + 1;
                else return acc;
            }, 0)} out of {taskData.subtasks.length} subtasks</p>
        </div>
    );
}

// "task_desc": "Build UI for onboarding flow",
// "id": 10,
// "subtasks": [
//     {
//         "task_desc": "Make coffee",
//         "completed": false
//     }
// ]

export default Task;
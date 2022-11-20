import styles from './Board.module.css';
import Column from './Column';

const columns = [
    {
        "title": "todo",
        "id": 1,
        "colorId": "pink",
        tasks: [
            {
                "task_desc": "Build UI for onboarding flow",
                "id": 5,
                "subtasks": [
                    {
                        "task_desc": "Make coffee",
                        "completed": false
                    }
                ]
            },
            {
                "task_desc": "Build UI for onboarding flow",
                "id": 6,
                "subtasks": [
                    {
                        "task_desc": "Make coffee",
                        "completed": false
                    }
                ]
            },
        ]
    },
    {
        "title": "doing",
        "id": 2,
        "colorId": "aqua",
        tasks: [
            {
                "task_desc": "Build UI for onboarding flow",
                "id": 7,
                "subtasks": [
                    {
                        "task_desc": "Make coffee",
                        "completed": false
                    }
                ]
            },
            {
                "task_desc": "Build UI for onboarding flow",
                "id": 8,
                "subtasks": [
                    {
                        "task_desc": "Make coffee",
                        "completed": true
                    },
                    {
                        "task_desc": "Make coffee",
                        "completed": true
                    }
                ]
            },
        ]
    },
    {
        "title": "done",
        "id": 3,
        "colorId": "yellow",
        tasks: [
            {
                "task_desc": "Build UI for onboarding flow",
                "id": 10,
                "subtasks": [
                    {
                        "task_desc": "Make coffee",
                        "completed": false
                    }
                ]
            },
            {
                "task_desc": "Build UI for onboarding flow",
                "id": 11,
                "subtasks": [
                    {
                        "task_desc": "Make coffee",
                        "completed": false
                    }
                ]
            },
        ]
    }
];

function Board({ board }) {
    return (
        <div className={styles.board}>
            {columns.map((column) => {
                return <Column columnData={column} key={column["id"]} />
            })}
            <div className={styles.newColumn}>
                <h1>+ New Column</h1>
            </div>
        </div>
    );
}

export default Board;
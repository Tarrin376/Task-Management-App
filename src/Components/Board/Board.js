import React from 'react';
import styles from './Board.module.css';
import Column from './Column';
import NewTask from '../NewTask/NewTask';

const columns = [
    {
        "title": "todo",
        "id": 1,
        "colorId": "pink",
        tasks: [
            {
                "title": "Build UI for onboarding flow",
                "task_desc": "Build UI for onboarding flow",
                "id": 5,
                "subtasks": [
                    {
                        "task_desc": "Make coffee",
                        "completed": false,
                        "id": 1,
                    }
                ]
            },
            {
                "title": "Build UI for onboarding flow",
                "task_desc": "Build UI for onboarding flow",
                "id": 6,
                "subtasks": [
                    {
                        "task_desc": "Make coffee",
                        "completed": false,
                        "id": 2,
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
                "title": "Build UI for onboarding flow",
                "task_desc": "Build UI for onboarding flow",
                "id": 7,
                "subtasks": [
                    {
                        "task_desc": "Make coffee",
                        "completed": false,
                        "id": 3,
                    }
                ]
            },
            {
                "title": "Build UI for onboarding flowsdfsdfsd fd ",
                "task_desc": "Build UI for onboarding flow",
                "id": 8,
                "subtasks": [
                    {
                        "task_desc": "Make coffee",
                        "completed": true,
                        "id": 4,
                    },
                    {
                        "task_desc": "Make coffee",
                        "completed": true,
                        "id": 5,
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
                "title": "Build UI for onboarding flowsdf oijusdf ijnsdf jiksdf ojisfd jnkmsd fjnksd fjnkd sfjnkd fskjnsfd nkjsfd ",
                "task_desc": "Build UI for onboarding flow",
                "id": 10,
                "subtasks": [
                    {
                        "task_desc": "Make coffee",
                        "completed": false,
                        "id": 6,
                    }
                ]
            },
            {
                "title": "Build UI for onboarding flow",
                "task_desc": `sdif nsdf ojf dsjfsd jknmsdf jkmndfs jkmndfs jmkdsf fjsdkznjkds 
                jndfgjn dfjnk dgfjkng fjnkgf djnkfgsd njksg dfjnkgfd jnkdgf njkfgd njkd d jfgndg fjng df`,
                "id": 11,
                "subtasks": [
                    {
                        "task_desc": "Make coffee",
                        "completed": false,
                        "id": 7,
                    }
                ]
            },
        ]
    }
];

function Board({ board, toggleNewTask, setToggleNewTask, toggleSidebar }) {
    return (
        <React.Fragment>
            <div className={styles.board} style={toggleSidebar ? { width: 'calc(100vw - 320px)', marginLeft: '320px' }
                : { width: '100%', marginLeft: '0px' }}>
                {columns.map((column) => {
                    return <Column columnData={column} key={column["id"]} board={board} />
                })}
                <div className={styles.newColumn}>
                    <h1>+ New Column</h1>
                </div>
            </div>
            {toggleNewTask && <NewTask setToggleNewTask={setToggleNewTask} />}
        </React.Fragment>
    );
}

export default Board;
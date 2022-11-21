import React from 'react';
import styles from './Board.module.css';
import Column from './Column';
import { useState } from 'react';
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
                        "completed": false
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
                "title": "Build UI for onboarding flow",
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
                "title": "Build UI for onboarding flow",
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
                "title": "Build UI for onboarding flow",
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
                "title": "Build UI for onboarding flow",
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

function Board({ board, toggleNewTask, setToggleNewTask }) {
    return (
        <React.Fragment>
            <div className={styles.board}>
                {columns.map((column) => {
                    return <Column columnData={column} key={column["id"]} />
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
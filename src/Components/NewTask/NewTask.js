import styles from './NewTask.module.css';
import React, { useState, useRef } from 'react';
import AllSubTasks from '../SubTask/SubTasks';
import { exampleSentences } from '../../utils/ExampleSentences';
import popUpStyles from '../../Layouts/PopUp/PopUp.module.css';
import ColumnDropdown from '../ColumnDropdown/ColumnDropdown';
import { database } from '../Dashboard/Dashboard';
import { ref, get, set } from 'firebase/database';

const MAX_SUBTASKS_ALLOWED = 10;

function NewTask({ setToggleNewTask, boardData }) {
    const subTasksRefs = new Array(MAX_SUBTASKS_ALLOWED);
    const random = Math.ceil(Math.random() * exampleSentences.length) - 1;

    const [maxSubtasksExceeded, setMaxSubtasksExceeded] = useState(false);
    const [titleErrorMsg, setTitleErrorMsg] = useState(false);
    const [descErrorMsg, setDescErrorMsg] = useState(false);
    const [addSubTask, setAddSubTask] = useState([]);
    const taskTitleRef = useRef();
    const taskDescRef = useRef();
    const statusRef = useRef();

    const addNewSubTask = (remove) => {
        if (remove) return;
        if (addSubTask.length === MAX_SUBTASKS_ALLOWED) {
            setMaxSubtasksExceeded(true);
            return;
        }

        setAddSubTask((state) => [...state, ""]);
        setMaxSubtasksExceeded(false);
    };

    const addNewTask = (e) => {
        e.preventDefault();
        if (checkInput()) {
            const subtasks = Object.keys(subTasksRefs).map((key) => subTasksRefs[key].current.value);
            postTaskData(subtasks);
        }
    };

    const postTaskData = async (subtasks) => {
        const selectedStatus = statusRef.current.children[statusRef.current.selectedIndex].value;
        const colIndex = boardData.columns.indexOf(boardData.columns.find((key) => key.name === selectedStatus));
        const path = `boards/${boardData.id}/columns/${colIndex}/tasks`;

        const task = {
            id: new Date().getTime(),
            task_desc: taskDescRef.current.value,
            title: taskTitleRef.current.value,
            subtasks: subtasks.filter((subtask) => subtask !== "").map((subtask) => {
                return {
                    completed: false,
                    id: new Date().getTime(),
                    task_desc: subtask
                };
            })
        };

        await set(ref(database, path), [...boardData.columns[colIndex].tasks, task]);
        setToggleNewTask(false);
    }

    const checkInput = () => {
        const title = taskTitleRef.current.value;
        const desc = taskDescRef.current.value;
        let valid = true;

        if (title === "") {
            setTitleErrorMsg(true);
            valid = false;
        }

        if (desc === "") {
            setDescErrorMsg(true);
            valid = false;
        }

        if (valid) {
            setTitleErrorMsg(false);
            setDescErrorMsg(false);
        }

        return valid;
    }

    return (
        <>
            <div className={popUpStyles.bg}>
                <section className={popUpStyles.popUp}>
                    <button id={popUpStyles.exit} onClick={() => setToggleNewTask(false)}>X</button>
                    <h1>Add New Task</h1>
                    <form action="">
                        <label htmlFor="title">Title</label>
                        {titleErrorMsg && <p style={{ color: 'rgb(255, 87, 87)', marginBottom: '11px' }}>Title must not be empty</p>}
                        <input type="text" name="title" ref={taskTitleRef} id="title" placeholder={'e.g. ' + exampleSentences[random].title} />
                        <label htmlFor="desc">Description</label>
                        {descErrorMsg && <p style={{ color: 'rgb(255, 87, 87)', marginBottom: '11px' }}>Description must not be empty</p>}
                        <textarea rows="4" ref={taskDescRef} id="desc" name="desc" placeholder={'e.g. ' + exampleSentences[random].desc} />
                        <ColumnDropdown boardData={boardData} statusRef={statusRef} />
                        <label htmlFor="">Subtasks</label>
                        <AllSubTasks addSubTask={addSubTask} subTasksRefs={subTasksRefs} addNewSubTask={addNewSubTask} />
                        {maxSubtasksExceeded && <p id={styles.limit}>Cannot add more than {MAX_SUBTASKS_ALLOWED} subtasks</p>}
                        <button type="button" id={styles.addSubtask} onClick={() => addNewSubTask(false)}>+ Add New Subtask</button>
                        <label htmlFor="">Status</label>
                        <button id={styles.createTask} onClick={addNewTask}>Create Task</button>
                    </form>
                </section>
            </div>
        </>
    )
}

export default NewTask;
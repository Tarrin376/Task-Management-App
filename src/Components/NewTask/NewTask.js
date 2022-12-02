import styles from './NewTask.module.css';
import React, { useState, useRef } from 'react';
import AllSubTasks from '../SubTask/SubTasks';
import { exampleSentences } from '../../utils/ExampleSentences';
import popUpStyles from '../../Layouts/PopUp/PopUp.module.css';
import ColumnDropdown from '../ColumnDropdown/ColumnDropdown';
import { database } from '../Dashboard/Dashboard';
import { ref, set } from 'firebase/database';
import { closeContainer } from '../../utils/TraverseChildren';

const MAX_SUBTASKS_ALLOWED = 10;

function NewTask({ setToggleNewTask, boardData, boardName }) {
    const subTasksRefs = new Array(MAX_SUBTASKS_ALLOWED);
    const random = Math.ceil(Math.random() * exampleSentences.length) - 1;

    const [maxSubtasksExceeded, setMaxSubtasksExceeded] = useState(false);
    const [titleErrorMsg, setTitleErrorMsg] = useState(false);
    const [descErrorMsg, setDescErrorMsg] = useState(false);
    const [statusErrorMsg, setStatusErrorMsg] = useState(false);
    const [addSubTask, setAddSubTask] = useState([]);

    const taskTitleRef = useRef();
    const taskDescRef = useRef();
    const statusRef = useRef();
    const popUpRef = useRef();
    const exitButtonRef = useRef();

    const addNewSubTask = () => {
        if (addSubTask.length === MAX_SUBTASKS_ALLOWED) {
            setMaxSubtasksExceeded(true);
            return;
        }

        setAddSubTask((state) => [...state, ""]);
        setMaxSubtasksExceeded(false);
    };

    const addNewTask = (e) => {
        const selectedStatus = statusRef.current.children[statusRef.current.selectedIndex].value;
        e.preventDefault();

        if (checkInput(selectedStatus)) {
            const subtasks = Object.keys(subTasksRefs).map((key) => subTasksRefs[key].current.value);
            postTaskData(subtasks, selectedStatus);
        }
    };

    const getTaskBoilerplate = (subtasks) => {
        return {
            task_desc: taskDescRef.current.value,
            title: taskTitleRef.current.value,
            id: new Date().getTime(),
            subtasks: subtasks.filter((x) => x !== "").map((task, index) => {
                return {
                    completed: false,
                    id: new Date().getTime() + index,
                    task_desc: task
                };
            })
        };
    }

    const postTaskData = async (subtasks, selectedStatus) => {
        const column = Object.keys(boardData).find((board) => boardData[board].name === selectedStatus);
        const path = `boards/${boardName}/${column}/tasks`;

        if (!boardData[column].tasks) {
            boardData[column].tasks = {}
        }

        const boilerplate = getTaskBoilerplate(subtasks);
        boardData[column].tasks[`${boilerplate.id}`] = boilerplate;

        await set(ref(database, path), boardData[column].tasks);
        setToggleNewTask(false);
    }

    const checkInput = (selectedStatus) => {
        const title = taskTitleRef.current.value;
        const desc = taskDescRef.current.value;

        setStatusErrorMsg(true ? selectedStatus === "" : false);
        setDescErrorMsg(true ? desc === "" : false);
        setTitleErrorMsg(true ? title === "" : false);
        return title !== "" && desc !== "" && selectedStatus !== "";
    }

    return (
        <>
            <div className={popUpStyles.bg} onClick={(e) => closeContainer(e, popUpRef.current, exitButtonRef.current, setToggleNewTask)}>
                <section className={popUpStyles.popUp} ref={popUpRef}>
                    <button id={popUpStyles.exit} onClick={(e) => closeContainer(e, popUpRef.current, exitButtonRef.current, setToggleNewTask)}
                        ref={exitButtonRef}>X
                    </button>
                    <h1>Add New Task</h1>
                    <form action="">
                        <label htmlFor="title">Title</label>
                        {titleErrorMsg && <p id={styles.limit}>Title must not be empty</p>}
                        <input type="text" name="title" ref={taskTitleRef} id="title" placeholder={'e.g. ' + exampleSentences[random].title} />
                        <label htmlFor="desc">Description</label>
                        {descErrorMsg && <p id={styles.limit}>Description must not be empty</p>}
                        <textarea rows="4" ref={taskDescRef} id="desc" name="desc" placeholder={'e.g. ' + exampleSentences[random].desc} />
                        <label htmlFor="">Subtasks</label>
                        <AllSubTasks addSubTask={addSubTask} subTasksRefs={subTasksRefs} />
                        {maxSubtasksExceeded && <p id={styles.limit}>Cannot add more than {MAX_SUBTASKS_ALLOWED} subtasks</p>}
                        <button type="button" id={styles.addSubtask} onClick={addNewSubTask}>+ Add New Task</button>
                        <ColumnDropdown boardData={boardData} statusRef={statusRef} statusErrorMsg={statusErrorMsg} />
                        <button id={styles.createTask} onClick={addNewTask}>Create Task</button>
                    </form>
                </section>
            </div>
        </>
    )
}

export default NewTask;
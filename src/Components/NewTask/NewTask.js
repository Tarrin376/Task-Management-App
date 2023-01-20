import styles from './NewTask.module.css';
import React, { useState, useRef } from 'react';
import AllSubTasks from '../SubTask/SubTasks';
import { exampleSentences } from '../../utils/ExampleSentences';
import popUpStyles from '../../Layouts/PopUp/PopUp.module.css';
import ColumnDropdown, { BoardColumns, GeneralDropdown } from '../ColumnDropdown/ColumnDropdown';
import { database, TASK_PRIORITIES } from '../Dashboard/Dashboard';
import { ref, set } from 'firebase/database';
import PopUp from '../../Layouts/PopUp/PopUp';

// Maximm subtasks allowed when creating a new task
const MAX_SUBTASKS_ALLOWED = 5;

function NewTask({ setNewTaskWindow, boardData, boardName, setUpdateBoard }) {
    const [validInputs, setValidInputs] = useState(false);
    const setUpdateSubtasks = useState(false)[1];
    const subtasksRef = useRef([]);

    const randomRef = useRef(Math.floor(Math.random() * exampleSentences.length));
    const taskTitleRef = useRef();
    const taskDescRef = useRef();
    const statusRef = useRef();
    const priorityRef = useRef();

    const addNewSubTask = () => {
        if (subtasksRef.current.length < MAX_SUBTASKS_ALLOWED) {
            subtasksRef.current.push(["", new Date().getTime()]);
            setUpdateSubtasks((state) => !state);
        }
    };

    const removeSubTask = (id) => {
        subtasksRef.current = subtasksRef.current.filter((subtask) => subtask[1] !== id);
        setUpdateSubtasks((state) => !state);
    };

    const addNewTask = (e) => {
        const status = statusRef.current.children[statusRef.current.selectedIndex].value;
        e.preventDefault();

        const subtaskValues = subtasksRef.current.map((subtask) => subtask[0]);
        postTaskData(subtaskValues, status);
    };

    const createTask = (subtasks) => {
        const task = {
            description: taskDescRef.current.value,
            title: taskTitleRef.current.value,
            id: new Date().getTime(),
            priority: priorityRef.current.value,
            subtasks: subtasks.filter((x) => x !== "").map((task, index) => {
                return {
                    completed: false,
                    id: new Date().getTime() + index,
                    task_desc: task
                };
            })
        };

        if (task.subtasks.length === 0) delete task.subtasks;
        return task;
    };

    const postTaskData = async (subtasks, status) => {
        const column = Object.keys(boardData).find((board) => boardData[board].name === status);
        const path = `boards/${boardName}/${column}/tasks`;

        if (!boardData[column].tasks) {
            boardData[column].tasks = {}
        }

        const task = createTask(subtasks);
        boardData[column].tasks[task.id.toString()] = task;

        await set(ref(database, path), boardData[column].tasks);
        setUpdateBoard((state) => !state);
        setNewTaskWindow(false);
    };

    const checkInput = () => {
        const status = statusRef.current.children[statusRef.current.selectedIndex].value;
        const priority = priorityRef.current.children[priorityRef.current.selectedIndex].value;
        const title = taskTitleRef.current.value;
        const desc = taskDescRef.current.value;
        setValidInputs(status !== "" && desc !== "" && title !== "" && priority !== "");
    };

    return (
        <PopUp setWindow={setNewTaskWindow}>
            <button id={popUpStyles.exit} onClick={() => setNewTaskWindow(false)}>X</button>
            <h1>Add New Task</h1>
            <form>
                <label htmlFor="title" id={styles.subtitle}>Title</label>
                <input type="text" name="title" ref={taskTitleRef} id="title"
                    placeholder={'e.g. ' + exampleSentences[randomRef.current].title} onChange={checkInput} />
                <label htmlFor="desc" id={styles.subtitle}>Description</label>
                <textarea rows="4" ref={taskDescRef} id="desc" name="desc"
                    placeholder={'e.g. ' + exampleSentences[randomRef.current].desc} onChange={checkInput} />
                <label id={styles.subtitle}>Subtasks (Maximum of {MAX_SUBTASKS_ALLOWED})</label>
                <AllSubTasks subtasksRef={subtasksRef} removeSubTask={removeSubTask} />
                <button type="button" id={styles.addSubtask} onClick={addNewSubTask}>+ Add New Subtask</button>
                <ColumnDropdown
                    refVal={statusRef} title={"Status"} promptMsg={"Choose Status"}
                    checkInput={checkInput}
                    options={<BoardColumns boardData={boardData} />}
                />
                <ColumnDropdown
                    refVal={priorityRef} title={"Priority"} promptMsg={"Choose Priority"}
                    checkInput={checkInput}
                    options={<GeneralDropdown data={TASK_PRIORITIES} />}
                />
                <button className={styles.createTask} id={!validInputs ? styles.invalid : ''}
                    onClick={addNewTask} disabled={!validInputs}>Create Task</button>
            </form>
        </PopUp>
    );
}

export default NewTask;
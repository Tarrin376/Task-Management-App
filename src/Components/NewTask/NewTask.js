import styles from './NewTask.module.css';
import React, { useState } from 'react';
import SubTask from '../SubTask/SubTask';
import { exampleSentences } from '../../utils/ExampleSentences';
import popUpStyles from '../../Layouts/PopUp/PopUp.module.css';

function NewTask({ setToggleNewTask }) {
    const MAX_SUBTASKS_ALLOWED = 10;
    const [maxSubtasksExceeded, setMaxSubtasksExceeded] = useState(false);

    const addNewSubTask = (e, remove) => {
        if (remove) {
            return;
        }

        if (addSubTask.length < MAX_SUBTASKS_ALLOWED) {
            setAddSubTask((state) => [...state, <SubTask addNewTask={addNewSubTask} />]);
            setMaxSubtasksExceeded(false);
        } else {
            setMaxSubtasksExceeded(true);
        }
    };

    const addNewTask = () => {

    };

    const random = Math.ceil(Math.random() * exampleSentences.length) - 1;
    const [addSubTask, setAddSubTask] = useState([
        <SubTask addNewTask={addNewSubTask} placeholder={`e.g. ${exampleSentences[random].subtasks[0]}`} />,
        <SubTask addNewTask={addNewSubTask} placeholder={`e.g. ${exampleSentences[random].subtasks[1]}`} />
    ]);

    return (
        <React.Fragment>
            <div className={popUpStyles.bg}>
                <section className={popUpStyles.popUp}>
                    <button id={popUpStyles.exit} onClick={() => setToggleNewTask(false)}>X</button>
                    <h1>Add New Task</h1>
                    <form action="">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id="title" placeholder={exampleSentences[random].title} />
                        <label htmlFor="desc">Description</label>
                        <textarea rows="4" id="desc" name="desc" placeholder={exampleSentences[random].desc} />
                        <label htmlFor="">Subtasks</label>
                        {addSubTask}
                        {maxSubtasksExceeded && <p id={styles.limit}>Cannot add more than {MAX_SUBTASKS_ALLOWED} subtasks</p>}
                        <button type="button" id={styles.addSubtask} onClick={(e) => addNewSubTask(e, false)}>+ Add New Subtask</button>
                        <label htmlFor="">Status</label>
                        <button id={styles.createTask} onClick={addNewTask}>Create Task</button>
                    </form>
                </section>
            </div>
        </React.Fragment>
    )
}

export default NewTask;
import styles from './ViewTask.module.css';
import popUpStyles from '../../Layouts/PopUp/PopUp.module.css';
import CheckBox from './CheckBox';
import { useRef, useState } from 'react';
import { database } from '../Dashboard/Dashboard';
import { ref, set } from 'firebase/database';
import ColumnDropdown from '../ColumnDropdown/ColumnDropdown';
import { SubTaskCount } from '../Task/Task';
import OptionsMenu from '../OptionsMenu/OptionsMenu';
import { closeContainer } from '../../utils/TraverseChildren';

function ViewTask({ taskData, setTaskContainer, boardData, setBoardData, boardName, columnId }) {
    const statusRef = useRef();
    const subTasksRef = useRef();
    const popUpRef = useRef();
    const exitButtonRef = useRef();
    const optionsRef = useRef();
    const changeNameRef = useRef();

    const [toggleOptions, setToggleOptions] = useState(false);
    const [title, setTitle] = useState(taskData.title);

    const saveChanges = () => {
        const selectedStatus = statusRef.current.children[statusRef.current.selectedIndex];
        const subtasks = [...subTasksRef.current.children];

        for (let i = 0; i < subtasks.length; i++) {
            const isChecked = subtasks[i].children[0].checked;
            taskData.subtasks[i].completed = isChecked;
        }

        const status = (selectedStatus.value === "") ? boardData[columnId].name : selectedStatus.value;
        updateTask(status);
    };

    const updateTask = async (status) => {
        const column = Object.keys(boardData).find((board) => boardData[board].name === status);
        const taskStr = `boards/${boardName}/${column}/tasks/`;
        taskData.title = title;

        setTaskContainer(false);
        moveTaskLocation(taskStr, column);
    };

    const moveTaskLocation = async (taskStr, column) => {
        if (!boardData[column].tasks) {
            boardData[column].tasks = {};
        }

        const newBoard = { ...boardData };
        delete newBoard[columnId].tasks[taskData.id]
        newBoard[column].tasks[taskData.id] = taskData;

        await set(ref(database, `boards/${boardName}/${columnId}/tasks/${taskData.id}`), null);
        await set(ref(database, `${taskStr}${taskData.id}`), taskData);
        setBoardData(newBoard);
    };

    const deleteTask = () => {
        console.log("yto");
    };

    const updateTaskName = () => {
        const newTitle = changeNameRef.current.value;
        if (newTitle !== "") {
            setTitle(newTitle);
        }
    };

    return (
        <div className={popUpStyles.bg} onClick={(e) => closeContainer(e, popUpRef.current, exitButtonRef.current, setTaskContainer)}>
            <div className={popUpStyles.popUp} ref={popUpRef}>
                <button id={popUpStyles.exit} style={{ marginBottom: '30px' }}
                    onClick={(e) => closeContainer(e, popUpRef.current, exitButtonRef.current, setTaskContainer)}
                    ref={exitButtonRef}>X
                </button>
                <div className={styles.header}>
                    <h1>{title}</h1>
                    <OptionsMenu
                        toggleOptions={toggleOptions} setToggleOptions={setToggleOptions}
                        optionsRef={optionsRef} deleteItem={deleteTask} updateName={updateTaskName}
                        changeNameRef={changeNameRef}
                    />
                </div>
                <p id={styles.desc}>{taskData.task_desc}</p>
                {taskData.subtasks && <div className={styles.sectionTitle} style={{ marginBottom: '20px' }}>
                    <span>Subtasks </span>
                    <SubTaskCount taskData={taskData} />
                </div>}
                <div ref={subTasksRef}>
                    {taskData.subtasks && taskData.subtasks.map((subtask) => <CheckBox subtask={subtask} key={subtask.id} />)}
                </div>
                <ColumnDropdown boardData={boardData} statusRef={statusRef} />
                <button className={styles.saveChanges} onClick={saveChanges}>Save Changes</button>
            </div>
        </div>
    )
}

export default ViewTask;
import styles from './ViewTask.module.css';
import popUpStyles from '../../Layouts/PopUp/PopUp.module.css';
import CheckBox from './CheckBox';
import { useRef, useState, useContext } from 'react';
import { database, TASK_PRIORITIES } from '../Dashboard/Dashboard';
import { ref, set } from 'firebase/database';
import ColumnDropdown, { BoardColumns, GeneralDropdown } from '../ColumnDropdown/ColumnDropdown';
import { SubTaskCount } from '../Task/Task';
import OptionsMenu from '../OptionsMenu/OptionsMenu';
import { closeContainer } from '../../utils/TraverseChildren';
import { ThemeContext } from '../../Wrappers/Theme';

function ViewTask({ taskData, setViewTask, boardData, setBoardData, boardName, columnId, setUpdateBoard }) {
    const themeContext = useContext(ThemeContext);
    const statusRef = useRef();
    const subTasksRef = useRef();
    const popUpRef = useRef();
    const exitButtonRef = useRef();
    const optionsRef = useRef();
    const changeNameRef = useRef();
    const priorityRef = useRef();

    const [toggleOptions, setToggleOptions] = useState(false);
    const [title, setTitle] = useState(taskData.title);

    const saveChanges = () => {
        const selected = statusRef.current.children[statusRef.current.selectedIndex];
        const subtasks = [...subTasksRef.current.children];

        for (let i = 0; i < subtasks.length; i++) {
            const isChecked = subtasks[i].children[0].checked;
            taskData.subtasks[i].completed = isChecked;
        }

        const status = (selected.value === "") ? boardData[columnId].name : selected.value;
        updateTask(status);
    };

    const updateTask = async (status) => {
        const column = Object.keys(boardData).find((board) => boardData[board].name === status);
        const taskStr = `boards/${boardName}/${column}/tasks/`;
        const priority = priorityRef.current.value;

        taskData.title = title;
        taskData.priority = priority !== "" ? priority : taskData.priority;

        setViewTask(false);
        moveTaskLocation(taskStr, column);
    };

    const moveTaskLocation = async (taskStr, column) => {
        if (!boardData[column].tasks) {
            boardData[column].tasks = {};
        }

        const oldId = taskData.id;
        const newBoard = { ...boardData };
        delete newBoard[columnId].tasks[oldId]

        taskData.id = new Date().getTime();
        newBoard[column].tasks[taskData.id] = taskData;

        await set(ref(database, `boards/${boardName}/${columnId}/tasks/${oldId}`), null);
        await set(ref(database, `${taskStr}${taskData.id}`), taskData);
        setBoardData(newBoard);
        setUpdateBoard((state) => !state);
    };

    const deleteTask = async () => {
        const taskStr = `boards/${boardName}/${columnId}/tasks/${taskData.id}`;
        const newBoard = { ...boardData };
        delete newBoard[columnId].tasks[taskData.id]
        taskData = newBoard;

        await set(ref(database, taskStr), null);
        setViewTask(false);
        setBoardData(newBoard);
        setUpdateBoard((state) => !state);
    };

    const updateTaskName = () => {
        const newTitle = changeNameRef.current.value;
        if (newTitle !== "") {
            setTitle(newTitle);
        }
    };

    return (
        <div className={popUpStyles.bg} onClick={(e) => closeContainer(e, popUpRef.current, exitButtonRef.current, setViewTask)}
            id={popUpStyles[`popUp${themeContext.theme}`]} style={{ zIndex: '2' }}>
            <div className={popUpStyles.popUp} ref={popUpRef}>
                <button id={popUpStyles.exit} style={{ marginBottom: '30px' }}
                    onClick={() => setViewTask(false)}
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
                <p id={styles.desc}>{taskData.description}</p>
                <ViewTaskInputs
                    taskData={taskData} subTasksRef={subTasksRef}
                    statusRef={statusRef} boardData={boardData} priorityRef={priorityRef}
                />
                <button className={styles.saveChanges} onClick={saveChanges}>Save Changes</button>
            </div>
        </div>
    )
}

function ViewTaskInputs({ taskData, subTasksRef, statusRef, boardData, priorityRef }) {
    return (
        <>
            {taskData.subtasks && <div className={styles.sectionTitle}>
                <label>Subtasks </label>
                (<SubTaskCount taskData={taskData} />)
            </div>}
            <div ref={subTasksRef}>
                {taskData.subtasks && taskData.subtasks.map((subtask) => <CheckBox subtask={subtask} key={subtask.id} />)}
            </div>
            <ColumnDropdown
                refVal={statusRef} title={"Status"} promptMsg={"Update Status"}
                options={<BoardColumns boardData={boardData} />}
            />
            <ColumnDropdown
                refVal={priorityRef} title={"Priority"} promptMsg={"Update Priority"}
                options={<GeneralDropdown data={TASK_PRIORITIES} />}
            />
        </>
    )
}

export default ViewTask;
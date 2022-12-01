import styles from './ViewTask.module.css';
import popUpStyles from '../../Layouts/PopUp/PopUp.module.css';
import CheckBox from './CheckBox';
import { useRef, useState } from 'react';
import { database } from '../Dashboard/Dashboard';
import { get, ref, set } from 'firebase/database';
import ColumnDropdown from '../ColumnDropdown/ColumnDropdown';
import { SubTaskCount } from '../Task/Task';
import OptionsMenu from '../OptionsMenu/OptionsMenu';
import { closeContainer } from '../../utils/TraverseChildren';

function ViewTask({ taskData, setTaskContainer, boardData, columnIndex, setBoardData }) {
    const statusRef = useRef();
    const subTasksRef = useRef();
    const popUpRef = useRef();
    const exitButtonRef = useRef();
    const optionsRef = useRef();
    const [toggleOptions, setToggleOptions] = useState(false);

    const saveChanges = () => {
        const selectedStatus = statusRef.current.children[statusRef.current.selectedIndex];
        const subtasks = [...subTasksRef.current.children];

        for (let i = 0; i < subtasks.length; i++) {
            const isChecked = subtasks[i].children[0].checked;
            taskData.subtasks[i].completed = isChecked;
        }

        updateTask(selectedStatus);
    }

    const updateTask = async (selectedStatus) => {
        const cols = boardData.columns.filter(x => x);
        const col = cols.indexOf(cols.find((key) => key.name === selectedStatus.value));
        const taskStr = `boards/${boardData.id}/columns/${columnIndex}/tasks/`;

        get(ref(database, taskStr)).then((snapshot) => {
            const data = snapshot.val();
            const index = Object.keys(data).find((key) => data[key].id === taskData.id);

            if (col !== columnIndex && col !== -1) {
                moveTaskLocation(cols, col, index, taskStr);
                return;
            }

            setTaskContainer(false);
            set(ref(database, taskStr + `${index}`), taskData);
        });
    }

    const moveTaskLocation = async (cols, col, index, taskStr) => {
        if (!cols[col].tasks) {
            cols[col].tasks = []
        }

        const newTasks = [...cols[col].tasks.filter(x => x), taskData];
        const board = { ...boardData };
        board.columns[col].tasks = newTasks;
        delete board.columns[columnIndex].tasks[index];

        await set(ref(database, taskStr + `${index}`), null);
        await set(ref(database, `boards/${boardData.id}/columns/${col}/tasks`), newTasks);
        setBoardData(board);
    };

    return (
        <div className={popUpStyles.bg} onClick={(e) => closeContainer(e, popUpRef.current, exitButtonRef.current, setTaskContainer)}>
            <div className={popUpStyles.popUp} ref={popUpRef}>
                <button id={popUpStyles.exit} style={{ marginBottom: '30px' }}
                    onClick={(e) => closeContainer(e, popUpRef.current, exitButtonRef.current, setTaskContainer)}
                    ref={exitButtonRef}>X
                </button>
                <div className={styles.header}>
                    <h1>{taskData.title}</h1>
                    <OptionsMenu toggleOptions={toggleOptions} setToggleOptions={setToggleOptions} optionsRef={optionsRef} />
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
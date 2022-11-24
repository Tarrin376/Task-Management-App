import styles from './ViewTask.module.css';
import popUpStyles from '../../Layouts/PopUp/PopUp.module.css';
import options from '../../Images/7504228_ellipsis_more_options_icon.svg';
import CheckBox from './CheckBox';
import { useRef } from 'react';
import { database } from '../Dashboard/Dashboard';
import { get, ref, set } from 'firebase/database';
import ColumnDropdown from '../ColumnDropdown/ColumnDropdown';

function ViewTask({ taskData, setTaskContainer, boardData, columnIndex }) {
    const statusRef = useRef();
    const subTasksRef = useRef();

    const saveChanges = () => {
        const selectedStatus = statusRef.current.children[statusRef.current.selectedIndex];
        const subtasks = [...subTasksRef.current.children];
        let count = 0;

        for (let i = 0; i < subtasks.length; i++) {
            const isChecked = subtasks[i].children[0].checked;
            taskData.subtasks[i].completed = isChecked;
            if (taskData.subtasks[i].completed) count++;
        }

        updateTask(selectedStatus);
        return count;
    }

    const updateTask = async (selectedStatus) => {
        const taskStr = `boards/${boardData.id}/columns/${columnIndex}/tasks/`;
        const snapshot = await get(ref(database, taskStr));

        const res = snapshot.val();
        const index = Object.keys(res).find((key) => res[key].id === taskData.id);

        await set(ref(database, taskStr + `${index}`), taskData);
        setTaskContainer(false);
    }

    return (
        <div className={popUpStyles.bg}>
            <div className={popUpStyles.popUp}>
                <button id={popUpStyles.exit} style={{ marginBottom: '30px' }}
                    onClick={() => setTaskContainer(false)}>X</button>
                <div className={styles.header}>
                    <h1>{taskData.title}</h1>
                    <img src={options} alt="Options" />
                </div>
                <p id={styles.desc}>{taskData.task_desc}</p>
                <p className={styles.sectionTitle}>4</p>
                <div ref={subTasksRef}>
                    {taskData.subtasks.map((subtask) => {
                        return <CheckBox subtask={subtask} key={subtask.id} />
                    })}
                </div>
                <ColumnDropdown boardData={boardData} statusRef={statusRef} />
                <button className={styles.saveChanges} onClick={saveChanges}>Save Changes</button>
            </div>
        </div>
    )
}

export default ViewTask;
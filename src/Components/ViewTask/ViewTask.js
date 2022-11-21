import styles from './ViewTask.module.css';
import popUpStyles from '../../Layouts/PopUp/PopUp.module.css';
import options from '../../Images/7504228_ellipsis_more_options_icon.svg';
import CheckBox from './CheckBox';

function ViewTask({ taskData, setTaskContainer, board }) {
    const saveChanges = () => {
        console.log(board);
    };

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
                <p className={styles.sectionTitle}>Subtasks (2 of 3)</p>
                {taskData.subtasks.map((subtask) => <CheckBox subtask={subtask} key={subtask.id} />)}
                <p className={styles.sectionTitle} style={{ marginTop: '30px' }}>Status</p>
                <select id={styles.columnDropdown}>
                    <option value="">To do</option>
                    <option value="">Doing</option>
                    <option value="">Done</option>
                </select>
                <button className={styles.saveChanges} onClick={saveChanges}>Save Changes</button>
            </div>
        </div>
    )
}

export default ViewTask;
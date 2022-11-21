import styles from './ViewTask.module.css';
import popUpStyles from '../../Layouts/PopUp/PopUp.module.css';
import options from '../../Images/7504228_ellipsis_more_options_icon.svg';

function ViewTask({ taskData }) {
    console.log(taskData);
    return (
        <div className={popUpStyles.bg}>
            <div className={popUpStyles.popUp}>
                <div className={styles.header}>
                    <h1>{taskData.title}</h1>
                    <img src={options} alt="Options" />
                </div>
                <p id={styles.desc}>{taskData.task_desc}</p>
            </div>
        </div>
    )
}

export default ViewTask;
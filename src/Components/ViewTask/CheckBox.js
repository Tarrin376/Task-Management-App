import styles from './CheckBox.module.css';
import { useState } from 'react';

function CheckBox({ subtask }) {
    const [select, setSelect] = useState(subtask.completed);
    return (
        <div className={styles.checkBoxContainer}>
            <input
                type="checkbox" id={styles.checkBox}
                onChange={() => setSelect((state) => !state)}
                checked={select ? true : false}
            />
            <p className={select ? styles.completed : styles.incomplete}>
                {subtask.task_desc}
            </p>
        </div>
    );
}

export default CheckBox;
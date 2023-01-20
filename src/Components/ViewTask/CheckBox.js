import styles from './CheckBox.module.css';
import { useState, useContext } from 'react';
import { ThemeContext } from '../../Wrappers/Theme';

function CheckBox({ subtask }) {
    const [select, setSelect] = useState(subtask.completed);
    const themeContext = useContext(ThemeContext);

    return (
        <div className={styles.checkBoxContainer} id={styles[`checkbox${themeContext.theme}`]}>
            <label htmlFor={styles.checkBox} className={styles.checkLabel}>Is completed</label>
            <input
                type="checkbox" id={styles.checkBox}
                onChange={() => setSelect((state) => !state)}
                checked={select ? true : false}
            />
            <p className={select ? styles.completed : styles.incomplete}>{subtask.task_desc}</p>
        </div>
    );
}

export default CheckBox;
import styles from './Column.module.css';
import Task from '../Task/Task';
import OptionsMenu from '../../Layouts/OptionsMenu/OptionsMenu';
import { useState, useRef } from 'react';
import { hideOptions } from '../../utils/HideOptions';

function Column({ columnData, boardData, columnIndex, setBoardData }) {
    const [toggleOptions, setToggleOptions] = useState(false);
    const optionsRef = useRef();

    return (
        <div className={styles.column} onClick={(e) => hideOptions(e, optionsRef, toggleOptions, setToggleOptions)}>
            <div className={styles.columnTitle}>
                <div id={styles.colorId} style={{ background: columnData.colorId }}></div>
                <p>{columnData.name.toUpperCase() + " "}</p>
                <span className={styles.countIcon}>
                    {columnData.tasks ? columnData.tasks.filter(x => x).length : 0}
                </span>
                <OptionsMenu toggleOptions={toggleOptions} setToggleOptions={setToggleOptions} optionsRef={optionsRef} />
            </div>
            {columnData.tasks && columnData.tasks.map((task) => {
                return (
                    <Task
                        taskData={task} key={task["id"]}
                        boardData={boardData} columnIndex={columnIndex}
                        setBoardData={setBoardData}
                    />
                );
            })}
        </div>
    );
}

export default Column;
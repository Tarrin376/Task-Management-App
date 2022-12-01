import styles from './Column.module.css';
import Task from '../Task/Task';
import OptionsMenu from '../OptionsMenu/OptionsMenu';
import { useState, useRef } from 'react';

function Column({ columnData, boardData, columnIndex, setBoardData }) {
    const [toggleOptions, setToggleOptions] = useState(false);
    const optionsRef = useRef();

    const deleteColumn = () => {

    }

    const updateColumnName = () => {

    }

    return (
        <div className={styles.column}>
            <OptionsMenu
                toggleOptions={toggleOptions} setToggleOptions={setToggleOptions}
                optionsRef={optionsRef} deleteItem={deleteColumn} updateName={updateColumnName}
            />
            <div className={styles.columnTitle}>
                <div id={styles.colorId} style={{ background: columnData.colorId }}></div>
                <p>{columnData.name.toUpperCase() + " "}</p>
                <span className={styles.countIcon}>
                    {columnData.tasks ? columnData.tasks.filter(x => x).length : 0}
                </span>
            </div>
            {columnData.tasks && columnData.tasks.map((task) => {
                return (
                    <Task
                        taskData={task} key={task.id}
                        boardData={boardData} columnIndex={columnIndex}
                        setBoardData={setBoardData}
                    />
                );
            })}
        </div>
    );
}

export default Column;
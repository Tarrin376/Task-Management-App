import styles from './Column.module.css';
import Task from '../Task/Task';
import OptionsMenu from '../OptionsMenu/OptionsMenu';
import { useState, useRef } from 'react';
import { set, ref } from 'firebase/database';
import { database } from '../Dashboard/Dashboard';

function Column({ columnData, boardData, setBoardData, boardName }) {
    const [toggleOptions, setToggleOptions] = useState(false);
    const [updateName, setUpdateName] = useState(columnData.name);
    const optionsRef = useRef();
    const changeNameRef = useRef();

    const deleteColumn = async () => {
        const newBoard = { ...boardData };
        delete newBoard[columnData.id];

        await set(ref(database, `boards/${boardName}/`), (Object.keys(newBoard).length === 0) ? "" : newBoard);
        setBoardData(newBoard);
        setToggleOptions(false);
    }

    const updateColumnName = async () => {
        const newName = changeNameRef.current.value;
        if (newName !== "") {
            await set(ref(database, `boards/${boardName}/${columnData.id}/name`), newName);
            setUpdateName(newName);
        }

        setToggleOptions(false);
    }

    return (
        <div className={styles.column}>
            <OptionsMenu
                toggleOptions={toggleOptions} setToggleOptions={setToggleOptions}
                optionsRef={optionsRef} deleteItem={deleteColumn} updateName={updateColumnName}
                changeNameRef={changeNameRef}
            />
            <div className={styles.columnTitle}>
                <div id={styles.colorId} style={{ background: columnData.colorId }}></div>
                <p>{updateName.toUpperCase() + " "}</p>
                <span className={styles.countIcon}>
                    {columnData.tasks ? Object.keys(columnData.tasks).length : 0}
                </span>
            </div>
            {columnData.tasks && Object.values(columnData.tasks).map((task) => {
                return (
                    <Task
                        taskData={task} key={task.id}
                        boardData={boardData}
                        setBoardData={setBoardData}
                        boardName={boardName}
                        columnId={columnData.id}
                    />
                );
            })}
        </div>
    );
}

export default Column;
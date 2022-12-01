import popUpStyles from '../../Layouts/PopUp/PopUp.module.css';
import windowStyles from '../CreateBoard/CreateBoard.module.css';
import styles from './Column.module.css';
import { useRef, useState } from 'react';
import { get, ref, set } from 'firebase/database';
import { database } from '../Dashboard/Dashboard';
import { generateBoardTemplate } from '../../utils/BoardTemplateJson';
import Circle from '@uiw/react-color-circle';

function CreateColumn(props) {
    return (
        <div className={styles.newColumn} onClick={props.toggleWindow} id={props.columnWindow ? styles.noHover : ''}>
            {props.columnWindow && <NewColumn
                toggleWindow={props.toggleWindow}
                boardData={props.boardData} setBoardData={props.setBoardData}
            />}
            <h1 style={{ color: 'rgb(45, 202, 142)' }}>+ New Column</h1>
        </div>
    );
}

function NewColumn({ toggleWindow, boardData, setBoardData }) {
    const columnInputRef = useRef();
    const [columnErrorMsg, setColumnErrorMsg] = useState(false);
    const [hex, setHex] = useState('#F44E3B');

    const createNewColumn = (e) => {
        const columnName = columnInputRef.current.value;
        const taskStr = `boards/${boardData.id}/columns`;

        get(ref(database, taskStr)).then((snapshot) => {
            const data = snapshot.val().filter((x => x));

            for (let column of data) {
                if (column.name === columnName.toLowerCase() || columnName === "") {
                    setColumnErrorMsg(true);
                    return;
                }
            }

            addColumn(columnName.toLowerCase(), taskStr, data);
            toggleWindow(e);
        });
    };

    const addColumn = async (name, taskStr, data) => {
        setColumnErrorMsg(false);
        const newColumn = { ...generateBoardTemplate().columns[0], name, colorId: hex };
        const updatedBoard = [...data, newColumn];

        await set(ref(database, taskStr), updatedBoard);
        setBoardData({ ...boardData, columns: updatedBoard });
    }

    return (
        <div className={popUpStyles.bg} style={{ position: 'relative', borderRadius: '10px' }}>
            <section className={popUpStyles.popUp}>
                <button id={popUpStyles.exit} type="button" style={{ marginBottom: '20px' }} onClick={toggleWindow}>X</button>
                {columnErrorMsg && <p style={{ color: 'rgb(255, 87, 87)', marginBottom: '11px' }}>Column already exits</p>}
                <p>Create column name</p>
                <input type="text" name="" id="" placeholder='e.g. Project tasks' ref={columnInputRef} />
                <p>Choose icon colour</p>
                <Circle
                    colors={['#1bb2e4', '#0cf3c7', '#822ad5', '#bee11e', '#073cf8', '#ce13ec', '#e61989', '#fef5fa',
                        '#54b34c', '#e2a01d', '#ff000f', '#7d6f90', '#50af9e', '#e15e1e']}
                    color={hex}
                    onChange={(color) => setHex(color.hex)}
                />
                <button className={windowStyles.addButton} type="button" onClick={(e) => createNewColumn(e)}>Add Column</button>
            </section>
        </div>
    );
}

export default CreateColumn;
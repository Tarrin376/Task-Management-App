import popUpStyles from '../../Layouts/PopUp/PopUp.module.css';
import windowStyles from '../CreateBoard/CreateBoard.module.css';
import styles from './Column.module.css';
import { useRef, useState, useContext } from 'react';
import { get, ref, set } from 'firebase/database';
import { database } from '../Dashboard/Dashboard';
import Circle from '@uiw/react-color-circle';
import { ThemeContext } from '../../Wrappers/Theme';

function CreateColumn(props) {
    const newColumnRef = useRef();
    const themeContext = useContext(ThemeContext);

    const openWindow = (e) => {
        if (e.target === newColumnRef.current || e.target.id === styles.newColumnTitle) {
            props.toggleWindow(e);
        }
    };

    return (
        <div className={styles[`newColumn${themeContext.theme}`]} ref={newColumnRef}
            onClick={openWindow} id={props.columnWindow ? styles.noHover : ''}>
            {!props.columnWindow && <h1 id={styles.newColumnTitle}>+ New Column</h1>}
            {props.columnWindow && <NewColumn
                toggleWindow={props.toggleWindow}
                setBoardData={props.setBoardData}
                boardName={props.boardName}
            />}
        </div>
    );
}

function NewColumn({ toggleWindow, setBoardData, boardName }) {
    const columnInputRef = useRef();
    const [columnErrorMsg, setColumnErrorMsg] = useState(false);
    const [hex, setHex] = useState('#FFFFFF');

    const createNewColumn = (e) => {
        const columnName = columnInputRef.current.value;
        const taskStr = `boards/${boardName}`;

        if (columnName === "") {
            setColumnErrorMsg(true);
            return;
        }

        get(ref(database, taskStr)).then((snapshot) => {
            const data = snapshot.val();

            if (data !== "") {
                for (let column of Object.values(data)) {
                    if (column.name === columnName.toLowerCase()) {
                        setColumnErrorMsg(true);
                        return;
                    }
                }
            }

            addColumn(columnName.toLowerCase(), taskStr, data);
            toggleWindow(e);
        });
    };

    const addColumn = async (name, taskStr, data) => {
        setColumnErrorMsg(false);
        const columnId = new Date().getTime();
        const newBoard = (data === "") ? {} : data;

        const addedColumn = [...Object.keys(newBoard), `${columnId}`];
        newBoard[`${columnId}`] = { name, id: columnId, colorId: hex };

        const updatedBoard = addedColumn.reduce((acc, cur) => ({ ...acc, [cur]: newBoard[cur] }), {});
        await set(ref(database, taskStr), updatedBoard);
        setBoardData(updatedBoard);
    }

    return (
        <div className={popUpStyles.bg} style={{ position: 'relative', borderRadius: '7px' }}>
            <section className={popUpStyles.popUp}>
                <button id={popUpStyles.exit} type="button" style={{ marginBottom: '20px' }} onClick={toggleWindow}>X</button>
                <p>Create column name</p>
                {columnErrorMsg && <p style={{ color: 'rgb(255, 87, 87)', marginTop: '0px', marginBottom: '10px' }}>Column already exits</p>}
                <input type="text" name="" id="" placeholder='e.g. Project tasks' ref={columnInputRef} />
                <p>Choose icon colour</p>
                <Circle
                    colors={[
                        '#1bb2e4', '#0cf3c7', '#822ad5', '#bee11e', '#073cf8', '#ce13ec',
                        '#e61989', '#fef5fa', '#54b34c', '#e2a01d', '#ff000f', '#7d6f90',
                        '#50af9e', '#e15e1e'
                    ]}
                    color={hex}
                    onChange={(color) => setHex(color.hex)}
                />
                <button className={windowStyles.addButton} type="button" onClick={(e) => createNewColumn(e)}>Add Column</button>
            </section>
        </div>
    );
}

export default CreateColumn;
import popUpStyles from '../../Layouts/PopUp/PopUp.module.css';
import windowStyles from '../CreateBoard/CreateBoard.module.css';
import styles from './Column.module.css';
import { useRef, useState, useContext } from 'react';
import { ref, set } from 'firebase/database';
import { database } from '../Dashboard/Dashboard';
import Circle from '@uiw/react-color-circle';
import { ThemeContext } from '../../Wrappers/Theme';

const COLOURS = [
    '#1bb2e4', '#0cf3c7', '#822ad5', '#bee11e', '#073cf8', '#ce13ec',
    '#e61989', '#54b34c', '#e2a01d', '#ff000f', '#7d6f90',
    '#50af9e', '#e15e1e'
];

function CreateColumn(props) {
    const newColumnRef = useRef();
    const themeContext = useContext(ThemeContext);
    const [columnWindow, setColumnWindow] = useState(false);

    const toggleWindow = (e) => {
        if (e.target.type === 'button') setColumnWindow(false);
        else setColumnWindow(true);
    };

    return (
        <div className={styles[`newColumn${themeContext.theme}`]} ref={newColumnRef}
            onClick={toggleWindow} id={columnWindow ? styles.noHover : ''}>
            {!columnWindow && <h1 id={styles.newColumnTitle}>+ New Column</h1>}
            {columnWindow && <NewColumn
                toggleWindow={toggleWindow} setBoardData={props.setBoardData}
                boardName={props.boardName} themeContext={themeContext} boardData={props.boardData}
            />}
        </div>
    );
}

function NewColumn({ toggleWindow, setBoardData, boardName, themeContext, boardData }) {
    const columnInputRef = useRef();
    const [hex, setHex] = useState('#22224E');
    const [validName, setValidName] = useState(false);

    const checkColumnName = () => {
        const columnName = columnInputRef.current.value.toLowerCase();
        setValidName((!boardData || !Object.values(boardData).find((col) => col.name === columnName)) && columnName !== "");
    };

    const createNewColumn = (e) => {
        const columnName = columnInputRef.current.value;
        const taskStr = `boards/${boardName}`;

        addColumn(columnName.toLowerCase(), taskStr);
        toggleWindow(e);
    };

    const addColumn = async (name, taskStr) => {
        const columnId = new Date().getTime();
        const newBoard = { ...boardData };

        const addedColumn = [...Object.keys(newBoard), `${columnId}`];
        newBoard[`${columnId}`] = { name, id: columnId, colorId: hex };

        const updatedBoard = addedColumn.reduce((acc, cur) => ({ ...acc, [cur]: newBoard[cur] }), {});
        await set(ref(database, taskStr), updatedBoard);
        setBoardData(updatedBoard);
    }

    return (
        <div className={popUpStyles.bg} style={{ position: 'relative', borderRadius: '7px' }}
            id={popUpStyles[`popUp${themeContext.theme}`]}>
            <section className={popUpStyles.popUp}>
                <button id={popUpStyles.exit} type="button" style={{ marginBottom: '20px' }} onClick={toggleWindow}>X</button>
                <p>Create column name</p>
                <input type="text" name="" id="" placeholder='e.g. Project tasks' ref={columnInputRef} onChange={checkColumnName} />
                <p>Choose icon colour</p>
                <ColourOptions hex={hex} setHex={setHex} />
                <button className={windowStyles.addButton} disabled={!validName}
                    id={!validName ? styles.invalid : ''} type="button" onClick={(e) => createNewColumn(e)}>Add Column</button>
            </section>
        </div>
    );
}

function ColourOptions({ hex, setHex }) {
    return (
        <Circle colors={COLOURS}
            color={hex}
            onChange={(color) => setHex(color.hex)}
        />
    );
}

export default CreateColumn;
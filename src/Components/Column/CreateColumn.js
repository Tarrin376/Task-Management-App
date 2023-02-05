import popUpStyles from '../../Layouts/PopUp/PopUp.module.css';
import styles from './Column.module.css';
import { useRef, useState, useContext } from 'react';
import { get, ref, set } from 'firebase/database';
import { database } from '../Dashboard/Dashboard';
import Circle from '@uiw/react-color-circle';
import { ThemeContext } from '../../Wrappers/Theme';
import PopUp from '../../Layouts/PopUp/PopUp';
import useWindowSize from '../../Hooks/useWindowSize';
import Loader from '../Loader/Loader';

const COLOURS = [
    '#1bb2e4', '#0cf3c7', '#822ad5', '#bee11e', '#073cf8', '#ce13ec',
    '#e61989', '#54b34c', '#e2a01d', '#ff000f', '#7d6f90',
    '#50af9e', '#e15e1e'
];

function CreateColumn(props) {
    const newColumnRef = useRef();
    const themeContext = useContext(ThemeContext);
    const [newColumn, setNewColumn] = useState(false);
    const windowSize = useWindowSize();

    return (
        <>
            <div className={styles[`newColumn${themeContext.theme}`]}
            ref={newColumnRef} onClick={() => setNewColumn(true)}>
                {windowSize <= 820 ? <p id={styles.newColumnTitle}>+</p> : <h1 id={styles.newColumnTitle}>New column +</h1>}
            </div>
            {newColumn && <NewColumn
                setBoardData={props.setBoardData}
                boardName={props.boardName} boardData={props.boardData} 
                setNewColumn={setNewColumn}
            />}
        </>
    );
}

function NewColumn({ setBoardData, boardName, boardData, setNewColumn }) {
    const columnInputRef = useRef();
    const [hex, setHex] = useState('#5e5e5eae');
    const [validName, setValidName] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const checkColumnName = () => {
        const columnName = columnInputRef.current.value.toLowerCase();
        setIsLoading(true);
        
        get(ref(database, `boards/${boardName}`)).then((snapshot) => {
            const res = snapshot.val();
            setValidName((!boardData || !Object.values(res).find((col) => col.name === columnName)) && columnName !== "");
            setIsLoading(false);
        });
    };

    const createNewColumn = () => {
        const columnName = columnInputRef.current.value;
        const taskStr = `boards/${boardName}`;

        addColumn(columnName.toLowerCase(), taskStr);
        setNewColumn(false);
    };

    const addColumn = async (name, taskStr) => {
        const columnId = new Date().getTime();

        get(ref(database, `boards/${boardName}`)).then((snapshot) => {
            const newBoard = { ...snapshot.val() };

            const addedColumn = [...Object.keys(newBoard), `${columnId}`];
            newBoard[`${columnId}`] = { name, id: columnId, colorId: hex };

            const updatedBoard = addedColumn.reduce((acc, cur) => ({ ...acc, [cur]: newBoard[cur] }), {});
            set(ref(database, taskStr), updatedBoard);
            setBoardData(updatedBoard);
        });
    };

    return (
        <PopUp setWindow={setNewColumn}>
            <button id={popUpStyles.exit} type="button" style={{ marginBottom: '20px' }} onClick={() => setNewColumn(false)}>X</button>
            <p>Column name</p>
            <input type="text" name="" id="" placeholder='e.g. Project tasks' ref={columnInputRef} onChange={checkColumnName} />
            <p>Choose icon colour</p>
            <ColourOptions hex={hex} setHex={setHex} />
            {!isLoading ? <button className={styles.addButton} disabled={!validName}
                id={!validName ? styles.invalid : ''} 
                type="button" onClick={(e) => createNewColumn(e)}>
                    Add Column
                </button> : <Loader />}
        </PopUp>
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
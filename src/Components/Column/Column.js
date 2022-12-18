import styles from './Column.module.css';
import Task from '../Task/Task';
import OptionsMenu from '../OptionsMenu/OptionsMenu';
import { useState, useRef, useContext } from 'react';
import { set, ref } from 'firebase/database';
import { database } from '../Dashboard/Dashboard';
import { ThemeContext } from '../../Wrappers/Theme';
import ColumnDropdown, { GeneralDropdown } from '../ColumnDropdown/ColumnDropdown';
import { sortByOptions } from '../../utils/SortByOptions';

function Column({ columnData, boardData, setBoardData, boardName, setUpdateBoard }) {
    const [toggleOptions, setToggleOptions] = useState(false);
    const [updateName, setUpdateName] = useState(columnData.name);
    const optionsRef = useRef();
    const changeNameRef = useRef();
    const themeContext = useContext(ThemeContext);

    const deleteColumn = async () => {
        const newBoard = { ...boardData };
        delete newBoard[columnData.id];

        await set(ref(database, `boards/${boardName}/`), (Object.keys(newBoard).length === 0) ? "" : newBoard);
        setBoardData(newBoard);
        setToggleOptions(false);
    };

    const updateColumnName = async () => {
        const newName = changeNameRef.current.value;
        setToggleOptions(false);

        if (newName !== "") {
            await set(ref(database, `boards/${boardName}/${columnData.id}/name`), newName);
            setUpdateName(newName);
        }
    };

    return (
        <div className={styles.column} id={styles[`column${themeContext.theme}`]}>
            <OptionsMenu
                toggleOptions={toggleOptions} setToggleOptions={setToggleOptions}
                optionsRef={optionsRef} deleteItem={deleteColumn} updateName={updateColumnName}
                changeNameRef={changeNameRef}
            />
            <div className={styles.columnTitle}>
                <div id={styles.colorId} style={{ backgroundColor: `${columnData.colorId}` }}></div>
                <p id={styles.title}>{updateName.toUpperCase() + " "}</p>
                <span className={styles.countIcon}>
                    {columnData.tasks ? Object.keys(columnData.tasks).length : 0}
                </span>
            </div>
            {columnData.tasks &&
                <ColumnTasks
                    columnData={columnData} boardData={boardData}
                    setBoardData={setBoardData} boardName={boardName}
                    setUpdateBoard={setUpdateBoard}
                />}
        </div>
    );
}

function ColumnTasks({ columnData, boardData, setBoardData, boardName, setUpdateBoard }) {
    const [, setDataChanged] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const sortByRef = useRef();

    const filterTasks = () => {
        if (!sortByRef.current) {
            return columnData.tasks;
        }

        const sortBy = sortByRef.current.children[sortByRef.current.selectedIndex].value;
        const filtered = Object.values(columnData.tasks).filter((task) => {
            const removeSpaces = task.title.split(' ').join('');
            return searchInput.toLowerCase() === removeSpaces.substring(0, searchInput.length).toLowerCase();
        });

        filtered.sort((task1, task2) => sortByOptions[sortBy === "" ? "Date & Time" : sortBy](task1, task2));
        return filtered;
    };

    return (
        <>
            <div className={styles.options}>
                <ColumnDropdown
                    refVal={sortByRef} title={""} promptMsg={"Date & Time"}
                    options={<GeneralDropdown data={Object.keys(sortByOptions)} />}
                    checkInput={() => setDataChanged((state) => !state)}
                />
                <input
                    className={styles.searchTask}
                    type="text" placeholder='Search task'
                    onChange={(e) => setSearchInput(e.target.value.split(' ').join(''))}
                />
            </div>
            {Object.values(filterTasks()).map((task) => {
                return (
                    <Task
                        taskData={task} key={task.id}
                        boardData={boardData}
                        setBoardData={setBoardData}
                        boardName={boardName}
                        columnId={columnData.id}
                        setUpdateBoard={setUpdateBoard}
                        prefix={searchInput}
                    />
                );
            })}
        </>
    )
};

export default Column;
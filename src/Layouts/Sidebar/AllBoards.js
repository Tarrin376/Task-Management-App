import React from 'react';
import styles from './Sidebar.module.css';
import { useState } from 'react';
import CreateBoard from '../../Components/CreateBoard/CreateBoard';
import columnStyles from '../../Components/Column/Column.module.css';
import { capitaliseWords } from '../../utils/CapitaliseWords';

export function AllBoards({ boardName, setBoardName, isLoading, setBoardData, toggleNewTask, allBoards }) {
    const [createWindow, setCreateWindow] = useState(false);

    return (
        <>
            {createWindow && <CreateBoard setBoardName={setBoardName} setCreateWindow={setCreateWindow} />}
            <div className={styles.allBoards}>
                <BoardCount
                    isLoading={isLoading} toggleNewTask={toggleNewTask}
                    boardName={boardName} allBoards={allBoards}
                />
                <BoardList
                    boardName={boardName} setBoardName={setBoardName}
                    setBoardData={setBoardData} setCreateWindow={setCreateWindow}
                    allBoards={allBoards}
                />
            </div>
        </>
    );
}

function BoardList({ boardName, setBoardName, setBoardData, setCreateWindow, allBoards }) {
    return (
        <ul>
            {allBoards.map((key) => {
                return (
                    <BoardListElement
                        title={key}
                        boardName={boardName}
                        key={key}
                        setBoardName={setBoardName}
                        setBoardData={setBoardData}
                    />
                );
            })}
            <div id={styles.createBoard} onClick={() => setCreateWindow(true)}>
                <p>+ Create New Board</p>
            </div>
        </ul>
    )
}

function BoardListElement({ title, boardName, setBoardName, setBoardData }) {
    const changeBoardHandler = () => {
        if (boardName !== title) {
            setBoardName(title);
            setBoardData(null);
        }
    };

    return (
        <div onClick={changeBoardHandler}
            className={title === boardName ? styles.curBoard : styles.boardStyle}>
            <p>{capitaliseWords(title)}</p>
        </div>
    );
}

function BoardCount({ isLoading, toggleNewTask, allBoards }) {
    return (
        <div className={styles.boardCount}>
            {isLoading && !toggleNewTask && <p id={styles.loadingBoards}>Loading Boards...</p>}
            {(!isLoading || toggleNewTask) && <>
                <p>All boards</p>
                <span className={columnStyles.countIcon}>
                    {allBoards.length}
                </span>
            </>}
        </div>
    );
}
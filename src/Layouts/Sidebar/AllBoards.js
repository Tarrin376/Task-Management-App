import React from 'react';
import styles from './Sidebar.module.css';
import { useState } from 'react';
import CreateBoard from '../../Components/CreateBoard/CreateBoard';
import { ALL_BOARDS } from '../../Components/Dashboard/Dashboard';
import columnStyles from '../../Components/Column/Column.module.css';
import { capitaliseWords } from '../../utils/CapitaliseWords';

export function AllBoards({ boardName, setBoardName, isLoading, setBoardData, toggleNewTask }) {
    const [createWindow, setCreateWindow] = useState(false);

    return (
        <>
            {createWindow && <CreateBoard setBoardName={setBoardName} setCreateWindow={setCreateWindow} />}
            <div className={styles.allBoards}>
                <BoardCount isLoading={isLoading} toggleNewTask={toggleNewTask} boardName={boardName} />
                <BoardList
                    boardName={boardName} setBoardName={setBoardName}
                    setBoardData={setBoardData} setCreateWindow={setCreateWindow}
                />
            </div>
        </>
    );
}

function BoardList({ boardName, setBoardName, setBoardData, setCreateWindow }) {
    return (
        <ul>
            {Object.keys(ALL_BOARDS).map((key) => {
                const curBoard = ALL_BOARDS[key];
                return (
                    <BoardListElement
                        title={curBoard.name}
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

function BoardCount({ isLoading, toggleNewTask }) {
    return (
        <div className={styles.boardCount}>
            {isLoading && !toggleNewTask && <p id={styles.loadingBoards}>Loading Boards...</p>}
            {(!isLoading || toggleNewTask) && <>
                <p>All boards</p>
                <span className={columnStyles.countIcon}>
                    {Object.keys(ALL_BOARDS).length}
                </span>
            </>}
        </div>
    );
}
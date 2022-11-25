import React from 'react';
import styles from './Sidebar.module.css';
import { useState } from 'react';
import CreateBoard from '../../Components/CreateBoard/CreateBoard';
import { ALL_BOARDS } from '../../Components/Dashboard/Dashboard';
import columnStyles from '../../Components/Column/Column.module.css';

export function AllBoards({ boardName, setBoardName, isLoading, setBoardData, toggleNewTask }) {
    const [createWindow, setCreateWindow] = useState(false);

    return (
        <>
            {createWindow && <CreateBoard setBoardName={setBoardName} setCreateWindow={setCreateWindow} />}
            <div className={styles.allBoards}>
                {isLoading && !toggleNewTask ? <p>Loading Boards...</p> :
                    <div className={styles.boardCount}>
                        <p>All boards</p>
                        <span className={columnStyles.countIcon}>
                            {Object.keys(ALL_BOARDS).length}
                        </span>
                    </div>
                }
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
            </div>
        </>
    );
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
            <p>{title}</p>
        </div>
    );
}
import React from 'react';
import styles from './Sidebar.module.css';
import { useState } from 'react';
import CreateBoard from '../../Components/CreateBoard/CreateBoard';
import { ALL_BOARDS } from '../../Components/Dashboard/Dashboard';

export function AllBoards({ boardName, setBoardName, isLoading, setBoardData, toggleNewTask }) {
    const [createWindow, setCreateWindow] = useState(false);

    return (
        <>
            {createWindow && <CreateBoard setBoardName={setBoardName} setCreateWindow={setCreateWindow} />}
            <div className={styles.allBoards}>
                {isLoading && !toggleNewTask ? <p>Loading Boards...</p> : <p>All boards ( <span style={{ color: '#00ffc0' }}>{Object.keys(ALL_BOARDS).length}</span> )</p>}
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
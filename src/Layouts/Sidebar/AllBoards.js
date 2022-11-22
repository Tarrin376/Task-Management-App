import React from 'react';
import styles from './Sidebar.module.css';
import { useState } from 'react';
import CreateBoard from '../../Components/CreateBoard/CreateBoard';

export function AllBoards({ allBoards, boardName, setBoardName, boardCount }) {
    const [createWindow, setCreateWindow] = useState(false);

    return (
        <React.Fragment>
            {createWindow && <CreateBoard setBoardName={setBoardName} setCreateWindow={setCreateWindow} />}
            <div className={styles.allBoards}>
                <p>All boards ({boardCount})</p>
                <ul>
                    {Object.keys(allBoards).map((key) => {
                        const curBoard = allBoards[key];
                        return (
                            <BoardListElement
                                title={curBoard.name}
                                boardName={boardName}
                                key={key}
                                setBoardName={setBoardName}
                            />
                        );
                    })}
                    <div id={styles.createBoard} onClick={() => setCreateWindow(true)}>
                        <p>+ Create New Board</p>
                    </div>
                </ul>
            </div>
        </React.Fragment>
    );
}

function BoardListElement({ title, boardName, setBoardName }) {
    const changeBoardHandler = () => {
        setBoardName(title);
    };

    return (
        <div onClick={changeBoardHandler}
            className={title === boardName ? styles.curBoard : styles.boardStyle}>
            <p>{title}</p>
        </div>
    );
}
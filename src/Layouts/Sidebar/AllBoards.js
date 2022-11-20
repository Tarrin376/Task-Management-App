import React from 'react';
import styles from './Sidebar.module.css';
import { useState } from 'react';

export function AllBoards({ board }) {
    return (
        <div className={styles.allBoards}>
            <p>All boards (8)</p>
            <ul>
                <BoardListElement title={"Platform Launch"} />
                <BoardListElement title={"Marketing Plan"} />
                <BoardListElement title={"Roadmap"} />
                <div id={styles.createBoard}><p>+ Create New Board</p></div>
            </ul>
        </div>
    );
}

function BoardListElement({ title }) {
    const changeBoardHandler = () => {

    };

    return (
        <div onClick={changeBoardHandler}><p>{title}</p></div>
    );
}
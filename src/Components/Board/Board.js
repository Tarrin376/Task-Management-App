import React, { useState } from 'react';
import styles from './Board.module.css';
import Column from '../Column/Column';
import NewTask from '../NewTask/NewTask';
import CreateColumn from '../Column/CreateColumn';

function Board(props) {
    return (
        <>
            <div className={styles.board} style={props.toggleSidebar ? { width: 'calc(100vw - 320px)', marginLeft: '320px' }
                : { width: '100%', marginLeft: '0px' }}>
                {<div id={styles.loading} className={props.isLoading && !props.toggleNewTask ? '' : styles.loadingHide}>Loading your tasks...</div>}
                {!props.isLoading && props.boardName === "" && <NoBoards />}
                {props.boardData != null && <AllTasks boardData={props.boardData} setBoardData={props.setBoardData} />}
            </div>
            {props.toggleNewTask &&
                <NewTask
                    setToggleNewTask={props.setToggleNewTask}
                    boardData={props.boardData}
                />}
        </>
    );
}

function NoBoards() {
    return (
        <div className={styles.noBoards}>
            <h1>You currently have no boards...</h1>
            <h2 id={styles.createToStart} style={{ margin: 'auto', width: '310px' }}>Create a new board to start!</h2>
        </div>
    );
}

function AllTasks({ boardData, setBoardData }) {
    const [columnWindow, setColumnWindow] = useState(false);

    const toggleWindow = (e) => {
        if (e.target.type === 'button') setColumnWindow(false);
        else setColumnWindow(true);
    };

    return (
        <>
            {boardData.columns.map((column, index) => {
                return (
                    <Column
                        columnData={column} key={column["id"]}
                        boardData={boardData} columnIndex={index}
                        setBoardData={setBoardData}
                    />
                );
            })}
            <CreateColumn
                toggleWindow={toggleWindow} columnWindow={columnWindow}
                boardData={boardData} setBoardData={setBoardData}
            />
        </>
    )
}

export default Board;
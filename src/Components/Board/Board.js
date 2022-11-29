import React, { useState } from 'react';
import styles from './Board.module.css';
import Column from '../Column/Column';
import NewTask from '../NewTask/NewTask';
import NewColumn from '../Column/NewColumn';

function Board(props) {
    return (
        <>
            {props.isLoading && !props.toggleNewTask && <div id={styles.loading} style={{ paddingLeft: '20px' }}>Loading your tasks...</div>}
            <div className={styles.board} style={props.toggleSidebar ? { width: 'calc(100vw - 320px)', marginLeft: '320px' }
                : { width: '100%', marginLeft: '0px' }}>
                {!props.isLoading && props.boardData == null && <NoBoards />}
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
            <h2 id={styles.loading} style={{ margin: 'auto', width: '310px' }}>Create a new board to start!</h2>
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
            <div className={styles.newColumn} onClick={toggleWindow} id={columnWindow ? styles.noHover : ''}>
                {columnWindow && <NewColumn toggleWindow={toggleWindow} boardData={boardData} setBoardData={setBoardData} />}
                <h1 style={{ color: 'rgb(45, 202, 142)' }}>+ New Column</h1>
            </div>
        </>
    )
}

export default Board;
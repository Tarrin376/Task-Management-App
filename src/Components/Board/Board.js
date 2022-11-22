import React from 'react';
import styles from './Board.module.css';
import Column from './Column';
import NewTask from '../NewTask/NewTask';

function Board({ boardName, toggleNewTask, setToggleNewTask, toggleSidebar, boardData }) {
    return (
        <React.Fragment>
            <div className={styles.board} style={toggleSidebar ? { width: 'calc(100vw - 320px)', marginLeft: '320px' }
                : { width: '100%', marginLeft: '0px' }}>
                {boardData == null && <h2 id={styles.loading}>Loading your tasks...</h2>}
                {boardData != null && <AllTasks boardData={boardData} boardName={boardName} />}
            </div>
            {toggleNewTask && <NewTask setToggleNewTask={setToggleNewTask} />}
        </React.Fragment>
    );
}

function AllTasks({ boardData, boardName }) {
    return (
        <React.Fragment>
            {boardData.columns.map((column) => {
                return <Column columnData={column} key={column["id"]} boardName={boardName} />
            })}
            <div className={styles.newColumn}>
                <h1>+ New Column</h1>
            </div>
        </React.Fragment>
    )
}

export default Board;
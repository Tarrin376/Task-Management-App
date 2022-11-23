import React from 'react';
import styles from './Board.module.css';
import Column from './Column';
import NewTask from '../NewTask/NewTask';

function Board(props) {
    return (
        <React.Fragment>
            <div className={styles.board} style={props.toggleSidebar ? { width: 'calc(100vw - 320px)', marginLeft: '320px' }
                : { width: '100%', marginLeft: '0px' }}>
                {props.boardLength === 0 && <NoBoards />}
                {props.boardData == null && props.boardLength > 0 && <h2 id={styles.loading}>Loading your tasks...</h2>}
                {props.boardData != null && <AllTasks boardData={props.boardData} boardName={props.boardName} />}
            </div>
            {props.toggleNewTask && <NewTask setToggleNewTask={props.setToggleNewTask} />}
        </React.Fragment>
    );
}

function NoBoards() {
    return (
        <div className={styles.noBoards}>
            <h1>You currently have no boards...</h1>
            <h2 id={styles.loading}>Create a new board to start!</h2>
        </div>
    );
}

function AllTasks({ boardData, boardName }) {
    return (
        <React.Fragment>
            {boardData.columns.map((column) => {
                return (
                    <Column 
                        columnData={column} key={column["id"]} 
                        boardData={boardData} 
                    />
                );
            })}
            <div className={styles.newColumn}>
                <h1>+ New Column</h1>
            </div>
        </React.Fragment>
    )
}

export default Board;
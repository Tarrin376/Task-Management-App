import { useContext } from 'react';
import styles from './Board.module.css';
import NewTask from '../NewTask/NewTask';
import AllColumns from '../Column/AllColumns';
import { ThemeContext } from '../../Wrappers/Theme';

function Board(props) {
    const themeContext = useContext(ThemeContext);

    return (
        <>
            <div className={styles.board} style={props.toggleSidebar ? { width: 'calc(100vw - 320px)', marginLeft: '320px' }
                : { width: '100%', marginLeft: '0px' }} id={styles[`board${themeContext.theme}`]}>
                {<div id={styles.loading} className={props.isLoading && !props.toggleNewTask ? '' : styles.loadingHide}>Loading your tasks...</div>}
                {!props.isLoading && props.boardName === "" && <NoBoards />}
                {props.boardName !== "" &&
                    <AllColumns
                        boardData={props.boardData} setBoardData={props.setBoardData}
                        boardName={props.boardName}
                    />}
            </div>
            {props.toggleNewTask &&
                <NewTask
                    setToggleNewTask={props.setToggleNewTask}
                    boardData={props.boardData} boardName={props.boardName}
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

export default Board;
import { useContext } from 'react';
import styles from './Board.module.css';
import NewTask from '../NewTask/NewTask';
import AllColumns from '../Column/AllColumns';
import { ThemeContext } from '../../Wrappers/Theme';
import useWindowSize from '../../Hooks/useWindowSize';

function Board(props) {
    const themeContext = useContext(ThemeContext);
    const windowSize = useWindowSize();

    return (
        <>
            {<div id={styles.loading} className={props.isLoading ? '' : styles.loadingHide}
                style={props.toggleSidebar ? { width: 'calc(100vw - 340px)', marginLeft: '340px' } : { width: '100%' }}>Loading your tasks...</div>}
            <div className={styles.board} style={props.toggleSidebar && windowSize > 760 ? { width: 'calc(100vw - 340px)', marginLeft: '340px' }
                : { width: '100%' }} id={styles[`board${themeContext.theme}`]}>
                {!props.isLoading && props.boardName === "" && <NoBoards />}
                {props.boardName !== "" && <AllColumns
                    boardData={props.boardData} setBoardData={props.setBoardData}
                    boardName={props.boardName} setUpdateBoard={props.setUpdateBoard}
                    isLoading={props.isLoading} />}
            </div>
            {props.newTaskWindow && <NewTask
                setNewTaskWindow={props.setNewTaskWindow}
                boardData={props.boardData} boardName={props.boardName}
                setUpdateBoard={props.setUpdateBoard} />}
        </>
    );
}

function NoBoards() {
    return (
        <div className={styles.noBoards}>
            <h1>There are currently no boards...</h1>
            <h2 id={styles.createToStart} style={{ margin: 'auto', width: '310px' }}>Create a new board today!</h2>
        </div>
    );
}

export default Board;
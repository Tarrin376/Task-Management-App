import React from 'react';
import styles from './Sidebar.module.css';
import { useState, useContext } from 'react';
import CreateBoard from '../../Components/CreateBoard/CreateBoard';
import columnStyles from '../../Components/Column/Column.module.css';
import { capitaliseWords } from '../../utils/CapitaliseWords';
import { highlightPrefix } from '../../Components/Task/Task';
import { ThemeContext } from '../../Wrappers/Theme';

export function AllBoards({ boardName, setBoardName, isLoading, setBoardData, allBoards, setAllBoards, setHasAccess }) {
    const [createBoard, setCreateBoard] = useState(false);
    const [prefixMatch, setPrefixMatch] = useState("");

    return (
        <>
            {createBoard && <CreateBoard
                setBoardName={setBoardName} setCreateBoard={setCreateBoard}
                setAllBoards={setAllBoards} setBoardData={setBoardData}
                allBoards={allBoards}
            />}
            <div className={styles.allBoards}>
                <BoardCount allBoards={allBoards} />
                <BoardList
                    boardName={boardName} setBoardName={setBoardName}
                    setBoardData={setBoardData} allBoards={allBoards}
                    setHasAccess={setHasAccess} prefixMatch={prefixMatch}
                    isLoading={isLoading}
                />
                <div className={styles.boardOptionsWrapper}>
                    <input
                        type="text" id={styles.searchBoard}
                        placeholder="Search board" onChange={(e) => setPrefixMatch(e.target.value.split(' ').join(''))}
                    />
                    <button id={styles.createBoard} onClick={() => setCreateBoard(true)}>+ Create New Board</button>
                </div>
            </div>
        </>
    );
}

function BoardList({ boardName, setBoardName, setBoardData, allBoards, setHasAccess, prefixMatch, isLoading }) {
    const filterBoards = () => {
        return allBoards.filter((board) => {
            const removeSpaces = board.split(' ').join('');
            return prefixMatch.toLowerCase() === removeSpaces.substring(0, prefixMatch.length).toLowerCase();
        });
    };

    if (isLoading && allBoards.length === 0) {
        return (
            <ul className={styles.boardLoading}>
                <div className={styles.boardStyle}></div>
                <div className={styles.boardStyle}></div>
                <div className={styles.boardStyle}></div>
                <div className={styles.boardStyle}></div>
                <div className={styles.boardStyle}></div>
            </ul>
        );
    }

    return (
        <ul>
            {filterBoards().map((key) => {
                return (
                    <li key={key}>
                        <BoardListElement
                            title={key}
                            boardName={boardName}
                            setBoardName={setBoardName}
                            setBoardData={setBoardData}
                            prefixMatch={prefixMatch}
                            setHasAccess={setHasAccess}
                        />
                    </li>
                );
            })}
        </ul>
    );
}

function BoardListElement({ title, boardName, setBoardName, setBoardData, prefixMatch, setHasAccess }) {
    const changeBoardHandler = () => {
        if (boardName !== title) {
            setBoardName(title);
            setBoardData(null);
            setHasAccess(false);
        }
    };

    return (
        <div onClick={changeBoardHandler}
            className={title === boardName ? styles.curBoard : styles.boardStyle}>
            <p>{highlightPrefix(capitaliseWords(title), prefixMatch)}</p>
        </div>
    );
}

function BoardCount({ allBoards }) {
    const context = useContext(ThemeContext);
    return (
        <div className={styles.boardCount}>
            <p>All boards</p>
            <span className={columnStyles.countIcon} id={columnStyles[`countIcon${context.theme}`]}>{allBoards.length}</span>
        </div >
    );
}
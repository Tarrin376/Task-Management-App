import React from 'react';
import styles from './Sidebar.module.css';
import { useState, useContext } from 'react';
import CreateBoard from '../../Components/CreateBoard/CreateBoard';
import columnStyles from '../../Components/Column/Column.module.css';
import { capitaliseWords } from '../../utils/CapitaliseWords';
import { highlightPrefix } from '../../Components/Task/Task';
import { ThemeContext } from '../../Wrappers/Theme';

export function AllBoards({ boardName, setBoardName, isLoading, setBoardData, allBoards, setAllBoards }) {
    const [createBoardWindow, setCreateBoardWindow] = useState(false);

    return (
        <>
            {createBoardWindow && <CreateBoard
                setBoardName={setBoardName} setCreateBoardWindow={setCreateBoardWindow}
                setAllBoards={setAllBoards} setBoardData={setBoardData}
                allBoards={allBoards}
            />}
            <div className={styles.allBoards}>
                <BoardCount isLoading={isLoading} boardName={boardName} allBoards={allBoards} />
                <BoardList
                    boardName={boardName} setBoardName={setBoardName}
                    setBoardData={setBoardData} setCreateBoardWindow={setCreateBoardWindow}
                    allBoards={allBoards}
                />
            </div>
        </>
    );
}

function BoardList({ boardName, setBoardName, setBoardData, setCreateBoardWindow, allBoards }) {
    const [prefixMatch, setPrefixMatch] = useState("");

    const filterBoards = () => {
        return allBoards.filter((board) => {
            const removeSpaces = board.split(' ').join('');
            return prefixMatch.toLowerCase() === removeSpaces.substring(0, prefixMatch.length).toLowerCase();
        });
    };

    return (
        <>
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
                            />
                        </li>
                    );
                })}
            </ul>
            <div className={styles.boardOptionsWrapper}>
                <input
                    type="text" id={styles.searchBoard}
                    placeholder="Search board" onChange={(e) => setPrefixMatch(e.target.value.split(' ').join(''))}
                />
                <button id={styles.createBoard} onClick={() => setCreateBoardWindow(true)}>+ Create New Board</button>
            </div>
        </>
    )
}

function BoardListElement({ title, boardName, setBoardName, setBoardData, prefixMatch }) {
    const changeBoardHandler = () => {
        if (boardName !== title) {
            setBoardName(title);
            setBoardData(null);
        }
    };

    return (
        <div onClick={changeBoardHandler}
            className={title === boardName ? styles.curBoard : styles.boardStyle}>
            <p>{highlightPrefix(capitaliseWords(title), prefixMatch)}</p>
        </div>
    );
}

function BoardCount({ isLoading, allBoards }) {
    const context = useContext(ThemeContext);
    return (
        <div className={styles.boardCount}>
            {isLoading && <p id={styles.loadingBoards}>Loading Boards...</p>}
            {!isLoading &&
                <>
                    <p>All boards</p>
                    <span className={columnStyles.countIcon} id={columnStyles[`countIcon${context.theme}`]}>{allBoards.length}</span>
                </>
            }
        </div >
    );
}
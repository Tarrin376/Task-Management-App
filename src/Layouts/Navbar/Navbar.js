import styles from './Navbar.module.css';
import { capitaliseWords } from '../../utils/CapitaliseWords';
import OptionsMenu from '../../Components/OptionsMenu/OptionsMenu';
import { useState, useRef, useEffect, useContext } from 'react';
import { database } from '../../Components/Dashboard/Dashboard';
import { get, ref, set } from 'firebase/database';
import { ThemeContext } from '../../Wrappers/Theme';
import Confirmation from '../../Components/Confirmation/Confirmation';
import PasskeyPrompt from '../../Components/PasskeyPrompt/PasskeyPrompt';
import useWindowSize from '../../Hooks/useWindowSize';

function Navbar({ toggleSidebar, setToggleSidebar, boardName, setNewTaskWindow, setBoardName, boardData, setAllBoards, setHasAccess, setBoardData }) {
    const context = useContext(ThemeContext);
    const windowSize = useWindowSize();

    const addNewTaskRef = useRef();
    const changeNameRef = useRef();
    const [errorMsg, setErrorMsg] = useState("");

    const deleteBoard = async (setShowOptions) => {
        await set(ref(database, `boards/${boardName}`), null);
        sessionStorage.removeItem(boardName);
        localStorage.removeItem('board');
        
        setShowOptions(false);
        setAllBoards((boards) => boards.filter((board) => board !== boardName));
        setBoardName("");
        setHasAccess(false);
        setBoardData(null);
    };

    const checkBoardName = async (newBoardName) => {
        return new Promise((resolve, reject) => {
            if (newBoardName === "") {
                reject("Must not be empty");
            }

            get(ref(database, 'boards')).then((snapshot) => {
                const names = snapshot.val();
                if (!names) reject("Board has been removed by member.")
                else if (newBoardName in names) reject("Board already exists");
                else resolve("Board name is unique");
            });
        });
    };

    const updateBoardName = async (setShowOptions) => {
        try {
            const newBoardName = changeNameRef.current.value;
            await checkBoardName(newBoardName.toLowerCase());
            await set(ref(database, `boards/${boardName}`), null);
            await set(ref(database, `boards/${newBoardName}`), Object.keys(boardData).length === 0 ? "" : boardData);
            localStorage.setItem('board', newBoardName);

            if (sessionStorage.getItem(boardName)) {
                sessionStorage.setItem(newBoardName, "unlocked");
                sessionStorage.removeItem(boardName);
            }

            setErrorMsg("");
            setBoardName(newBoardName);
            setShowOptions(false);
            setAllBoards((names) => names.map((name) => {
                if (name !== boardName) return name;
                else return newBoardName;
            }));
        } catch(error) {
            setErrorMsg(error);
        }
    };

    useEffect(() => {
        if (!addNewTaskRef.current) {
            return;
        } else if (document.body.clientWidth <= 820) {
            addNewTaskRef.current.textContent = "+";
            addNewTaskRef.current.className = styles.mobileTaskAdd;
        } else {
            addNewTaskRef.current.textContent = "+ Add New Task";
            addNewTaskRef.current.className = "";
        }
    }, [windowSize]);

    return (
        <nav className={toggleSidebar && windowSize > 820 ? styles.notFullWidth : styles.fullWidth} id={styles[`navbar${context.theme}`]}>
            {!toggleSidebar && <button id={styles.openSidebar} onClick={() => setToggleSidebar(true)}>{'>'}{'>'}</button>}
            {boardName !== "" && boardData &&
                <>
                    {windowSize >= 415 && <h1>{capitaliseWords(boardName)}</h1>}
                    <button className={styles.refresh} onClick={() => window.location.reload()}>refresh</button>
                    <div className={styles.optionsWrapper}>
                        <BoardAccessToggle boardName={boardName} boardData={boardData} />
                        <button onClick={() => setNewTaskWindow(true)}
                            id={styles.addTask} ref={addNewTaskRef}>+ Add New Task
                        </button>
                        <OptionsMenu
                            deleteItem={deleteBoard} updateName={updateBoardName} 
                            changeNameRef={changeNameRef} errorMsg={errorMsg} setErrorMsg={setErrorMsg} />
                    </div>
                </>}
        </nav>
    );
}

function BoardAccessToggle({ boardName, boardData }) {
    const [isPublic, setIsPublic] = useState(null);
    const [confirmation, setConfirmation] = useState(false);
    const [passkeyPrompt, setPasskeyPrompt] = useState(false);

    const openConfirmation = (value) => {
        if (value !== isPublic) {
            setConfirmation(true);
        }
    };

    useEffect(() => {
        if (boardData) {
            setIsPublic(boardData.public);
        }
    }, [boardData]);

    return (
        <>
            {confirmation &&
                <Confirmation
                    isPublic={isPublic} setIsPublic={setIsPublic}
                    boardName={boardName} setConfirmation={setConfirmation}
                    setPasskeyPrompt={setPasskeyPrompt}
                />}
            {passkeyPrompt && <PasskeyPrompt setIsPublic={setIsPublic} setPasskeyPrompt={setPasskeyPrompt} boardName={boardName} />}
            <div className={styles.statusToggle}>
                <button onClick={() => openConfirmation(true)} id={isPublic ? styles.selected : styles.default}>Public</button>
                <button onClick={() => openConfirmation(false)} id={!isPublic ? styles.selected : styles.default}>Private</button>
            </div>
        </>
    )
}

export default Navbar;
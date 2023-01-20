import styles from './Navbar.module.css';
import { capitaliseWords } from '../../utils/CapitaliseWords';
import OptionsMenu from '../../Components/OptionsMenu/OptionsMenu';
import { useState, useRef, useEffect, useContext } from 'react';
import { database } from '../../Components/Dashboard/Dashboard';
import { ref, set } from 'firebase/database';
import { ThemeContext } from '../../Wrappers/Theme';
import Confirmation from '../../Components/Confirmation/Confirmation';
import PasskeyPrompt from '../../Components/PasskeyPrompt/PasskeyPrompt';

function Navbar({ toggleSidebar, setToggleSidebar, boardName, setNewTaskWindow, setBoardName, boardData, setAllBoards, setHasAccess, setBoardData }) {
    const [toggleOptions, setToggleOptions] = useState(false);
    const [windowSize, setWindowSize] = useState(0);
    const context = useContext(ThemeContext);

    const optionsRef = useRef();
    const addNewTaskRef = useRef();
    const changeNameRef = useRef();

    const deleteBoard = async () => {
        await set(ref(database, `boards/${boardName}`), null);
        const name = boardName;
        sessionStorage.removeItem(name);

        setAllBoards((boards) => boards.filter((board) => board !== boardName));
        setToggleOptions(false);
        setBoardName("");
        setHasAccess(false);
        setBoardData(null);
    };

    const updateBoardName = async () => {
        const newBoardName = changeNameRef.current.value;
        await set(ref(database, `boards/${boardName}`), null);
        await set(ref(database, `boards/${newBoardName}`), Object.keys(boardData).length === 0 ? "" : boardData);

        setBoardName(newBoardName);
        setToggleOptions(false);
        setAllBoards((names) => names.map((name) => {
            if (name !== boardName) return name;
            else return newBoardName;
        }));
    };

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize(document.body.clientWidth);
        };

        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    useEffect(() => {
        if (!addNewTaskRef.current) {
            return;
        } else if (document.body.clientWidth <= 740) {
            addNewTaskRef.current.textContent = "+";
            addNewTaskRef.current.className = styles.mobileTaskAdd;
        } else {
            addNewTaskRef.current.textContent = "+ Add New Task";
            addNewTaskRef.current.className = "";
        }
    }, [windowSize]);

    return (
        <nav className={toggleSidebar ? styles.notFullWidth : styles.fullWidth} id={styles[`navbar${context.theme}`]}>
            {!toggleSidebar && <button id={styles.openSidebar} onClick={() => setToggleSidebar(true)}>{'>'}{'>'}</button>}
            {boardName !== "" && boardData &&
                <>
                    <h1>{capitaliseWords(boardName)}</h1>
                    <div className={styles.optionsWrapper}>
                        <BoardAccessToggle boardName={boardName} boardData={boardData} />
                        <button onClick={() => setNewTaskWindow(true)}
                            id={styles.addTask} ref={addNewTaskRef}>+ Add New Task
                        </button>
                        <OptionsMenu
                            toggleOptions={toggleOptions} setToggleOptions={setToggleOptions}
                            optionsRef={optionsRef} deleteItem={deleteBoard}
                            updateName={updateBoardName} changeNameRef={changeNameRef} />
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
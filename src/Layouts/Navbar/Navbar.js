import styles from './Navbar.module.css';
import { capitaliseWords } from '../../utils/CapitaliseWords';
import OptionsMenu from '../../Components/OptionsMenu/OptionsMenu';
import { useState, useRef, useEffect, useContext } from 'react';
import { database } from '../../Components/Dashboard/Dashboard';
import { ref, set } from 'firebase/database';
import { ThemeContext } from '../../Wrappers/Theme';

function Navbar({ toggleSidebar, setToggleSidebar, boardName, setToggleNewTask, setBoardName, boardData }) {
    const [toggleOptions, setToggleOptions] = useState(false);
    const [windowSize, setWindowSize] = useState(0);
    const context = useContext(ThemeContext);

    const optionsRef = useRef();
    const addNewTaskRef = useRef();
    const changeNameRef = useRef();

    const deleteBoard = async () => {
        console.log(boardName);
        await set(ref(database, `boards/${boardName}`), null);
        setBoardName("");
    };

    const updateBoardName = async () => {
        const newBoardName = changeNameRef.current.value;
        await set(ref(database, `boards/${boardName}`), null);
        await set(ref(database, `boards/${newBoardName}`), Object.keys(boardData).length === 0 ? "" : boardData);
        setBoardName(newBoardName);
    };

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowSize(document.body.clientWidth)
        });
    }, []);

    useEffect(() => {
        if (document.body.clientWidth <= 600) {
            addNewTaskRef.current.textContent = "+";
            addNewTaskRef.current.className = styles.mobileTaskAdd;
        }
        else {
            addNewTaskRef.current.textContent = "+ Add New Task";
            addNewTaskRef.current.className = "";
        }
    }, [windowSize]);

    return (
        <nav className={toggleSidebar ? styles.notFullWidth : styles.fullWidth} id={styles[`navbar${context.theme}`]}>
            {!toggleSidebar && <button id={styles.openSidebar} onClick={() => setToggleSidebar(true)}>{'>'}{'>'}</button>}
            <h1>{capitaliseWords(boardName)}</h1>
            <div className={styles.optionsWrapper}>
                <button onClick={() => boardName !== "" && setToggleNewTask((state) => !state)}
                    id={styles.addTask} ref={addNewTaskRef}>+ Add New Task
                </button>
                <OptionsMenu
                    toggleOptions={toggleOptions} setToggleOptions={setToggleOptions}
                    optionsRef={optionsRef} deleteItem={deleteBoard}
                    updateName={updateBoardName} changeNameRef={changeNameRef} />
            </div>
        </nav>
    );
}

export default Navbar;
import styles from './Navbar.module.css';
import { capitaliseWords } from '../../utils/CapitaliseWords';
import OptionsMenu from '../../Components/OptionsMenu/OptionsMenu';
import { useState, useRef, useEffect } from 'react';
import { database } from '../../Components/Dashboard/Dashboard';
import { ref, set } from 'firebase/database';

function Navbar({ toggleSidebar, setToggleSidebar, boardName, setToggleNewTask, setBoardName }) {
    const [toggleOptions, setToggleOptions] = useState(false);
    const [windowSize, setWindowSize] = useState(0);

    const optionsRef = useRef();
    const addNewTaskRef = useRef();
    const changeNameRef = useRef();

    const deleteBoard = async () => {
        await set(ref(database, `boards/${boardName}`), null);
        setBoardName("");
    };

    const updateBoardName = () => {
        console.log("hi");
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
        <nav className={toggleSidebar ? styles.notFullWidth : styles.fullWidth}>
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
import styles from './Navbar.module.css';
import { capitaliseWords } from '../../utils/CapitaliseWords';
import OptionsMenu from '../../Components/OptionsMenu/OptionsMenu';
import { useState, useRef, useEffect } from 'react';

function Navbar({ toggleSidebar, setToggleSidebar, boardName, setToggleNewTask }) {
    const [toggleOptions, setToggleOptions] = useState(false);
    const [windowSize, setWindowSize] = useState(0);
    const optionsRef = useRef();

    const addNewTaskRef = useRef();

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
                <OptionsMenu toggleOptions={toggleOptions} setToggleOptions={setToggleOptions} optionsRef={optionsRef} />
            </div>
        </nav>
    );
}

export default Navbar;
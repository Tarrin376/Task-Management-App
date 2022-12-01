import styles from './Navbar.module.css';
import { capitaliseWords } from '../../utils/CapitaliseWords';
import OptionsMenu from '../OptionsMenu/OptionsMenu';
import { useState, useRef } from 'react';
import { hideOptions } from '../../utils/HideOptions';

function Navbar({ toggleSidebar, setToggleSidebar, boardName, setToggleNewTask }) {
    const [toggleOptions, setToggleOptions] = useState(false);
    const optionsRef = useRef();

    return (
        <nav className={toggleSidebar ? styles.notFullWidth : styles.fullWidth}
            onClick={(e) => hideOptions(e, optionsRef, toggleOptions, setToggleOptions)}>
            {!toggleSidebar && <button id={styles.openSidebar} onClick={() => setToggleSidebar(true)}>{'>'}{'>'}</button>}
            <h1>{capitaliseWords(boardName)}</h1>
            <div className={styles.optionsWrapper}>
                <button onClick={() => boardName !== "" && setToggleNewTask((state) => !state)} id={styles.addTask}>+ Add New Task</button>
                <OptionsMenu toggleOptions={toggleOptions} setToggleOptions={setToggleOptions} optionsRef={optionsRef} />
            </div>
        </nav>
    );
}

export default Navbar;
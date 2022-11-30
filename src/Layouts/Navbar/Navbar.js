import styles from './Navbar.module.css';
import { capitaliseWords } from '../../utils/CapitaliseWords';
import OptionsMenu from '../OptionsMenu/OptionsMenu';
import { useState } from 'react';

function Navbar({ toggleSidebar, setToggleSidebar, boardName, setToggleNewTask }) {
    const [toggleOptions, setToggleOptions] = useState(false);
    return (
        <nav style={toggleSidebar ? { width: 'calc(100vw - 320px)', marginLeft: '320px' }
            : { width: '100%', marginLeft: '0px' }}>
            {!toggleSidebar && <button id={styles.openSidebar} onClick={() => setToggleSidebar(true)}>{'>'}{'>'}</button>}
            <h1>{capitaliseWords(boardName)}</h1>
            <div className={styles.optionsWrapper}>
                <button onClick={() => boardName !== "" && setToggleNewTask((state) => !state)} id={styles.addTask}>+ Add New Task</button>
                <OptionsMenu toggleOptions={toggleOptions} setToggleOptions={setToggleOptions} />
            </div>
        </nav>
    );
}

export default Navbar;
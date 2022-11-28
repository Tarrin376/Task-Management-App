import styles from './Navbar.module.css';
import options from '../../Images/7504228_ellipsis_more_options_icon.svg';
import { capitaliseWords } from '../../utils/CapitaliseWords';

function Navbar({ toggleSidebar, setToggleSidebar, boardName, setToggleNewTask }) {
    return (
        <nav style={toggleSidebar ? { width: 'calc(100vw - 320px)', marginLeft: '320px' }
            : { width: '100%', marginLeft: '0px' }}>
            {!toggleSidebar && <button id={styles.openSidebar} onClick={() => setToggleSidebar(true)}>{'>'}{'>'}</button>}
            <h1>{capitaliseWords(boardName)}</h1>
            <div>
                <button onClick={() => setToggleNewTask((state) => !state)}>+ Add New Task</button>
                <img src={options} alt="Options" />
            </div>
        </nav>
    );
}

export default Navbar;
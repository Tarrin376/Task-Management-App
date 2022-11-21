import styles from './Sidebar.module.css';
import { AllBoards } from './AllBoards';
import { useContext } from 'react';
import { ThemeContext } from '../../Wrappers/Theme';
import hideIcon from '../../Images/hide-svgrepo-com.svg';

function Sidebar({ toggleSidebar, setToggleSidebar, board, setBoard }) {
    const context = useContext(ThemeContext);
    return (
        <div className={styles.sidebar} style={{ color: 'blue' }}>
            <div>
                <h1 id={styles.title}>Organizer</h1>
                <AllBoards board={board} />
            </div>
            <div>
                <div className={styles.themeToggle}>
                    <p className={!context.theme ? styles.selected : ''}>Dark</p>
                    <label className={styles.switch}>
                        <input type="checkbox" onChange={() => context.setTheme((state) => !state)} />
                        <span className={styles.slider}></span>
                    </label>
                    <p className={context.theme ? styles.selected : ''}>Light</p>
                </div>
                <div className={styles.hideSidebar}>
                    <img src={hideIcon} alt="hide"></img>
                    <p>Hide Sidebar</p>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
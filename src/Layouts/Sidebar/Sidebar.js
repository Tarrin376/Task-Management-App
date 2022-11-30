import styles from './Sidebar.module.css';
import { AllBoards } from './AllBoards';
import { useContext } from 'react';
import { ThemeContext } from '../../Wrappers/Theme';
import hideIcon from '../../Assets/hide-svgrepo-com.svg';

function Sidebar({ toggleSidebar, setToggleSidebar, boardName, setBoardName, isLoading, setBoardData, toggleNewTask }) {
    const context = useContext(ThemeContext);
    return (
        <div className={styles.sidebar} style={!toggleSidebar ? { left: '-320px' } : { left: '0px' }}>
            <div>
                <h1 id={styles.title}>Kanban</h1>
                <AllBoards
                    boardName={boardName}
                    setBoardName={setBoardName}
                    isLoading={isLoading}
                    setBoardData={setBoardData}
                    toggleNewTask={toggleNewTask}
                />
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
                <div className={styles.hideSidebar} onClick={() => setToggleSidebar(false)}>
                    <img src={hideIcon} alt="hide"></img>
                    <p>Hide Sidebar</p>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
import styles from './Sidebar.module.css';
import { AllBoards } from './AllBoards';
import { useContext } from 'react';
import { ThemeContext } from '../../Wrappers/Theme';
import hideIcon from '../../Assets/hide-svgrepo-com.svg';

function Sidebar(props) {
    const context = useContext(ThemeContext);
    return (
        <div className={styles.sidebar} id={styles[`sidebar${context.theme}`]}
            style={!props.toggleSidebar ? { left: '-320px' } : { left: '0px' }}>
            <div>
                <h1 id={styles.title}>Task Saviour</h1>
                <AllBoards
                    boardName={props.boardName}
                    setBoardName={props.setBoardName}
                    isLoading={props.isLoading}
                    setBoardData={props.setBoardData}
                    toggleNewTask={props.toggleNewTask}
                />
            </div>
            <div>
                <ThemeToggle context={context} />
                <div className={styles.hideSidebar} onClick={() => props.setToggleSidebar(false)}>
                    <img src={hideIcon} alt="hide"></img>
                    <p>Hide Sidebar</p>
                </div>
            </div>
        </div>
    );
}

function ThemeToggle({ context }) {
    return (
        <div className={styles.themeToggle}>
            <p className={context.theme === "Light" ? styles.selected : ''}>Light</p>
            <label className={styles.switch}>
                <input type="checkbox" onChange={context.toggleTheme} />
                <span className={styles.slider}></span>
            </label>
            <p className={context.theme === "Dark" ? styles.selected : ''}>Dark</p>
        </div>
    );
}

export default Sidebar;
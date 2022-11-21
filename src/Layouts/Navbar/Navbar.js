import styles from './Navbar.module.css';
import options from '../../Images/7504228_ellipsis_more_options_icon.svg';

function Navbar({ toggleSidebar, board, setToggleNewTask }) {
    return (
        <nav style={toggleSidebar ? { width: 'calc(100vw - 320px)', marginLeft: '320px' }
            : { width: '100%', marginLeft: '0px' }}>
            <h1>{board}</h1>
            <div>
                <button onClick={() => setToggleNewTask((state) => !state)}>+ Add New Task</button>
                <img src={options} alt="Options" />
            </div>
        </nav>
    );
}

export default Navbar;
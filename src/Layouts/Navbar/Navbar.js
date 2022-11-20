import styles from './Navbar.module.css';
import options from '../../Images/7504228_ellipsis_more_options_icon.svg'

function Navbar({ toggleSidebar, board }) {
    return (
        <nav>
            <h1>Platform Launch</h1>
            <div>
                <button>+ Add New Task</button>
                <img src={options} alt="Options" />
            </div>
        </nav>
    );
}

export default Navbar;
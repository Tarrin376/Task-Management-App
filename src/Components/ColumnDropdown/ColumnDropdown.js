import styles from '../ColumnDropdown/ColumnDropdown.module.css';
import { useContext } from 'react';
import { ThemeContext } from '../../Wrappers/Theme';

function ColumnDropdown({ boardData, statusRef, statusErrorMsg }) {
    const themeContext = useContext(ThemeContext);
    return (
        <>
            <label style={{ marginTop: '20px' }}>Status</label>
            {statusErrorMsg && <p id={styles.limit}>Please select a status</p>}
            <select className={styles.columnDropdown} id={styles[`dropdown${themeContext.theme}`]} ref={statusRef} defaultValue={''}>
                <option disabled hidden value={''}>Choose Status</option>
                {Object.values(boardData).map((column) => {
                    return (
                        <option key={column.name} value={column.name}>
                            {column.name[0].toUpperCase() + column.name.substring(1)}
                        </option>
                    );
                })}
            </select>
        </>
    );
}

export default ColumnDropdown;
import styles from '../ViewTask/ViewTask.module.css';
import newTaskStyles from '../NewTask/NewTask.module.css';

function ColumnDropdown({ boardData, statusRef, statusErrorMsg }) {
    return (
        <>
            <p className={styles.sectionTitle} style={{ marginTop: '20px' }}>Status</p>
            {statusErrorMsg && <p id={newTaskStyles.limit}>Please select a status</p>}
            <select id={styles.columnDropdown} ref={statusRef}>
                <option selected disabled hidden value={''}>Choose Status</option>
                {boardData.columns.map((column) => {
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
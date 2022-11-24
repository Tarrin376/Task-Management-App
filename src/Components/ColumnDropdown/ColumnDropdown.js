import styles from '../ViewTask/ViewTask.module.css';

function ColumnDropdown({ boardData, statusRef }) {
    return (
        <>
            <p className={styles.sectionTitle} style={{ marginTop: '20px' }}>Status</p>
            <select id={styles.columnDropdown} ref={statusRef}>
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
import styles from '../ColumnDropdown/ColumnDropdown.module.css';

function ColumnDropdown({ boardData, statusRef, statusErrorMsg }) {
    return (
        <>
            <label style={{ marginTop: '20px' }}>Status</label>
            {statusErrorMsg && <p id={styles.limit}>Please select a status</p>}
            <select id={styles.columnDropdown} ref={statusRef} defaultValue={''}>
                <option disabled hidden value={''}>Choose Status</option>
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
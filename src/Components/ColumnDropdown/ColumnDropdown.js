import styles from '../ColumnDropdown/ColumnDropdown.module.css';
import { useContext } from 'react';
import { ThemeContext } from '../../Wrappers/Theme';

function ColumnDropdown({ refVal, title, promptMsg, options, checkInput }) {
    const themeContext = useContext(ThemeContext);
    return (
        <>
            {title !== "" && <label style={{ marginTop: '20px' }}>{title}</label>}
            <select className={styles.columnDropdown} id={styles[`dropdown${themeContext.theme}`]}
                ref={refVal} defaultValue={''} onChange={checkInput}>
                <option disabled hidden value={''}>{promptMsg}</option>
                {options}
            </select>
        </>
    );
}

export function BoardColumns({ boardData }) {
    return (
        <>
            {Object.values(boardData).map((column) => {
                return (
                    <option key={column.name} value={column.name}>
                        {column.name[0].toUpperCase() + column.name.substring(1)}
                    </option>
                );
            })}
        </>
    )
}

export function GeneralDropdown({ data }) {
    return (
        <>
            {data.map((cur) => {
                return (
                    <option key={cur} value={cur}>
                        {cur}
                    </option>
                );
            })}
        </>
    )
}

export default ColumnDropdown;
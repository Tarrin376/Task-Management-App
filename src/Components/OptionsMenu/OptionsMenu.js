import React, { useContext } from "react";
import styles from "./OptionsMenu.module.css";
import { ThemeContext } from '../../Wrappers/Theme';

function OptionsMenu({ toggleOptions, setToggleOptions, optionsRef, deleteItem, updateColumnName, changeNameRef }) {
    return (
        <div className={styles.wrapper} onMouseLeave={() => setToggleOptions(false)}>
            <div id={styles.optionsMenu} onClick={() => setToggleOptions(true)}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <Options
                toggleOptions={toggleOptions} optionsRef={optionsRef}
                deleteItem={deleteItem} updateColumnName={updateColumnName} changeNameRef={changeNameRef}
            />
        </div>
    );
}

function Options({ toggleOptions, optionsRef, deleteItem, updateColumnName, changeNameRef }) {
    const themeContext = useContext(ThemeContext);
    return (
        <div className={styles.options} id={styles[`options${themeContext.theme}`]}
            style={toggleOptions ? { visibility: 'visible', opacity: '1', zIndex: '2' } : {}}
            ref={optionsRef}>
            <input type="text" id={styles.rename} placeholder="Change name" ref={changeNameRef} />
            <button id={styles.delete} onClick={deleteItem}>Delete</button>
            <button id={styles.update} onClick={updateColumnName}>Update</button>
        </div>
    );
}

export default OptionsMenu;

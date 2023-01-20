import React, { useContext } from "react";
import styles from "./OptionsMenu.module.css";
import { ThemeContext } from '../../Wrappers/Theme';

function OptionsMenu({ toggleOptions, setToggleOptions, optionsRef, deleteItem, updateName, changeNameRef }) {
    return (
        <div className={styles.wrapper} onMouseLeave={() => setToggleOptions(false)}>
            <div className={styles.optionsMenu} onClick={() => setToggleOptions(true)}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <Options
                toggleOptions={toggleOptions} optionsRef={optionsRef}
                deleteItem={deleteItem} updateName={updateName} changeNameRef={changeNameRef}
            />
        </div>
    );
}

function Options({ toggleOptions, optionsRef, deleteItem, updateName, changeNameRef }) {
    const themeContext = useContext(ThemeContext);
    return (
        <div className={styles.options} id={styles[`options${themeContext.theme}`]}
            style={toggleOptions ? { visibility: 'visible', opacity: '1', zIndex: '2' } : {}}
            ref={optionsRef}>
            <input type="text" className={styles.rename} placeholder="Change name" ref={changeNameRef} />
            <button className={styles.delete} onClick={deleteItem}>Delete</button>
            <button className={styles.update} onClick={updateName}>Update</button>
        </div>
    );
}

export default OptionsMenu;

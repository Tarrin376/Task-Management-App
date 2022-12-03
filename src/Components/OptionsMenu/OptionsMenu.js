import React from "react";
import styles from "./OptionsMenu.module.css";

function OptionsMenu({ toggleOptions, setToggleOptions, optionsRef, deleteItem, updateName, changeNameRef }) {
    return (
        <div className={styles.wrapper} onMouseLeave={() => setToggleOptions(false)}>
            <div id={styles.optionsMenu} onClick={() => setToggleOptions(true)}>
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
    return (
        <div
            className={styles.options}
            style={toggleOptions ? { visibility: 'visible', opacity: '1', zIndex: '1' } : {}}
            ref={optionsRef}>
            <input type="text" name="rename" id={styles.rename} placeholder="Change name" ref={changeNameRef} />
            <button id={styles.delete} onClick={deleteItem}>Delete</button>
            <button id={styles.update} onClick={updateName}>Update</button>
        </div>
    );
}

export default OptionsMenu;

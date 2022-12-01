import React from "react";
import styles from "./OptionsMenu.module.css";
import { set, ref } from "firebase/database";
import { database } from "../Dashboard/Dashboard";

function OptionsMenu({ toggleOptions, setToggleOptions, optionsRef, deleteItem, updateName }) {
    return (
        <div className={styles.wrapper} onMouseLeave={() => setToggleOptions(false)}>
            <div id={styles.optionsMenu} onClick={() => setToggleOptions(true)}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <Options
                toggleOptions={toggleOptions} optionsRef={optionsRef}
                deleteItem={deleteItem} updateName={updateName}
            />
        </div>
    );
}

function Options({ toggleOptions, optionsRef, deleteItem, updateName }) {
    return (
        <div
            className={styles.options}
            style={toggleOptions ? { visibility: 'visible', opacity: '1', zIndex: '1' } : {}}
            ref={optionsRef}>
            <input type="text" name="rename" id={styles.rename} placeholder="Change name" />
            <button id={styles.delete} onClick={deleteItem}>Delete</button>
            <button id={styles.update} onClick={updateName}>Update</button>
        </div>
    );
}

export default OptionsMenu;

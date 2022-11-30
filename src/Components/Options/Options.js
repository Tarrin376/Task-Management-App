import React from "react";
import styles from './Options.module.css';

function Options({ toggleOptions, optionsRef }) {
    return (
        <div
            className={styles.options}
            style={toggleOptions ? { visibility: 'visible', opacity: '1', zIndex: '1' } : {}}
            ref={optionsRef}>
            <input type="text" name="rename" id={styles.rename} placeholder="Change name" />
            <button id={styles.delete}>Delete</button>
            <button id={styles.update}>Update</button>
        </div>
    );
}

export default Options;

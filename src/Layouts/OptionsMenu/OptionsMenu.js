import React from "react";
import styles from './OptionsMenu.module.css';
import Options from "../../Components/Options/Options";

function OptionsMenu({ toggleOptions, setToggleOptions, optionsRef }) {
    return (
        <div className={styles.wrapper}>
            <div id={styles.optionsMenu} onClick={() => setToggleOptions((state) => !state)}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <Options toggleOptions={toggleOptions} optionsRef={optionsRef} />
        </div>
    );
}

export default OptionsMenu;

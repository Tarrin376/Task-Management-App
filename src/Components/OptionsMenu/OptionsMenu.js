import React, { useContext, useState } from "react";
import styles from "./OptionsMenu.module.css";
import { ThemeContext } from '../../Wrappers/Theme';

function OptionsMenu({ deleteItem, updateName, changeNameRef, errorMsg, setErrorMsg }) {
    const [showOptions, setShowOptions] = useState(false);
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.optionsMenu} onClick={() => setShowOptions((state) => !state)}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            {showOptions && <Options
                deleteItem={deleteItem} updateName={updateName} changeNameRef={changeNameRef}
                errorMsg={errorMsg} setErrorMsg={setErrorMsg} setShowOptions={setShowOptions}
            />}
        </div>
    );
}

function Options({ deleteItem, updateName, changeNameRef, errorMsg, setErrorMsg, setShowOptions }) {
    const themeContext = useContext(ThemeContext);
    return (
        <div className={styles.options} id={styles[`options${themeContext.theme}`]}>
            {errorMsg && errorMsg !== "" && <div className={styles.errorMsg}>
                <p>{errorMsg}</p>
                <button onClick={() => setErrorMsg("")}>X</button>
            </div>}
            <input type="text" className={styles.rename} placeholder="Change name" ref={changeNameRef} />
            <button className={styles.delete} onClick={() => deleteItem(setShowOptions)}>Delete</button>
            <button className={styles.update} onClick={() => updateName(setShowOptions)}>Update</button>
        </div>
    );
}

export default OptionsMenu;

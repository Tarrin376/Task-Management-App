import React from 'react';
import { ThemeContext } from '../../Wrappers/Theme';
import { useContext } from 'react';
import styles from './Confirmation.module.css';
import { ref, set } from 'firebase/database';
import { database } from '../Dashboard/Dashboard';
import { capitaliseWords } from '../../utils/CapitaliseWords';
import PopUp from '../../Layouts/PopUp/PopUp';

function Confirmation({ isPublic, setIsPublic, boardName, setConfirmation, setPasskeyPrompt }) {
    const themeContext = useContext(ThemeContext);

    const toggleBoardAccess = async (change) => {
        setConfirmation(false);
        if (change) {
            if (!isPublic) {
                console.log("yo");
                setIsPublic((state) => !state);
                await set(ref(database, `boards/${boardName}/public`), true);
                await set(ref(database, `boards/${boardName}/passkey`), null);
                sessionStorage.remove(boardName);
            } else {
                setPasskeyPrompt(true);
            }
        }
    };

    return (
        <PopUp setWindow={setConfirmation}>
            <p id={styles.title}>Are you sure you want to make {capitaliseWords(boardName)} {isPublic ? 'private' : 'public'}?</p>
            <p className={styles[`visibilityDesc${themeContext.theme}`]}>
                <i>Private: </i>
                No-one apart from individuals that know the password for accessing
                the board will be able to modify or view its content. If your board
                contains confidential tasks or it is being used within a business,
                enable this option.
            </p>
            <p className={styles[`visibilityDesc${themeContext.theme}`]}>
                <i>Public: </i>
                Everyone will be able to view and modify the content of your board.
                Your current password for accessing this board will be wiped.
                If you want to make your board viewable to all users,
                enable this option.
            </p>
            <div className={styles.options}>
                <button onClick={() => toggleBoardAccess(true)} id={styles.yes}>Yes</button>
                <button onClick={() => toggleBoardAccess(false)} id={styles[`cancel${themeContext.theme}`]}>Cancel</button>
            </div>
        </PopUp>
    )
}

export default Confirmation;
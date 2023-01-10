import React from 'react';
import { ThemeContext } from '../../Wrappers/Theme';
import popUpStyles from '../../Layouts/PopUp/PopUp.module.css';
import { useContext } from 'react';
import { closeContainer } from '../../utils/TraverseChildren';
import styles from './Confirmation.module.css';
import { ref, set } from 'firebase/database';
import { database } from '../Dashboard/Dashboard';
import { capitaliseWords } from '../../utils/CapitaliseWords';

function Confirmation({ isPublic, setIsPublic, boardName, setConfirmation, setPasswordPrompt }) {
    const themeContext = useContext(ThemeContext);

    const toggleBoardAccess = async (change) => {
        setConfirmation(false);
        if (change) {
            if (!isPublic) {
                setIsPublic((state) => !state);
                await set(ref(database, `boards/${boardName}/public`), true);
                await set(ref(database, `boards/${boardName}/password`), null);
            } else {
                setPasswordPrompt(true);
            }
        }
    };

    return (
        <div className={popUpStyles.bg}
        id={popUpStyles[`popUp${themeContext.theme}`]}>
            <section className={popUpStyles.popUp}>
                <h1 id={styles.title}>Are you sure you want to make <b>{capitaliseWords(boardName)}</b> {isPublic ? 'private' : 'public'}?</h1>
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
                    <button onClick={() => toggleBoardAccess(true)} id={styles[`yes${themeContext.theme}`]}>Yes</button>
                    <button onClick={() => toggleBoardAccess(false)} id={styles.cancel}>Cancel</button>
                </div>
            </section>
        </div>
    )
}

export default Confirmation;
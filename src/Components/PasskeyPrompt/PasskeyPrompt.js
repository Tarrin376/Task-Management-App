import { ThemeContext } from '../../Wrappers/Theme';
import { useContext, useState } from 'react';
import { capitaliseWords } from '../../utils/CapitaliseWords';
import styles from './PasskeyPrompt.module.css';
import check from '../../Assets/check.png';
import notchecked from '../../Assets/notchecked.png';
import hideIcon from '../../Assets/hide.svg';
import showIcon from '../../Assets/show.png';
import { ref, set } from 'firebase/database';
import { database } from '../Dashboard/Dashboard';
import PopUp from '../../Layouts/PopUp/PopUp';

const passkeyChecks = {
    "8 character length": (pass) => pass.length >= 8,
    "Lowercase letters": (pass) => new RegExp('[a-z]').test(pass),
    "At least one uppercase letter": (pass) => new RegExp('[A-Z]').test(pass),
    "At least one symbol": (pass) => !new RegExp('^[0-9a-zA-Z\\s]*$').test(pass),
    "At least 2 numbers": (pass) => new RegExp('[0-9]+.*[0-9]+.*$').test(pass)
};

function PasskeyPrompt({ setIsPublic, setPasskeyPrompt, boardName }) {
    const themeContext = useContext(ThemeContext);
    const [passkey, setPasskey] = useState("");
    const [hidePass, setHidePass] = useState("password");
    let checks = 0;

    const setBoardPassword = async () => {
        setPasskeyPrompt(false);
        setIsPublic((state) => !state);
        setPasskey("");

        const path = `boards/${boardName}`;
        await set(ref(database, `${path}/passkey`), passkey);
        await set(ref(database, `${path}/public`), false);
    };

    const toggleHidePass = () => {
        setHidePass(hidePass === "password" ? "text" : "password");
    };

    return (
        <PopUp setWindow={setPasskeyPrompt}>
            <p id={styles.title}>Set passkey for {capitaliseWords(boardName)}</p>
            <div className={styles.passInput}>
                <input id={styles.pass} type={hidePass} placeholder='Enter passkey' onChange={(e) => setPasskey(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            setBoardPassword();
                        }
                    }} />
                <div id={styles[`togglePassIcon${themeContext.theme}`]}><img src={hidePass === "password" ? showIcon : hideIcon}
                    alt="toggle icon" id={styles.hidePass} onClick={toggleHidePass} />
                </div>
            </div>
            <div className={styles[`passwordCriteria${themeContext.theme}`]}>
                <p>Password composition</p>
                <p id={styles.note}>Make sure that your password is long enough and meets the following criteria shown below:</p>
                <ul className={styles.passwordChecks}>
                    {Object.keys(passkeyChecks).map((check) => {
                        const meetsCriteria = passkeyChecks[check](passkey);
                        if (meetsCriteria) checks += 1

                        return (
                            <PasskeyCriteria
                                passCheck={meetsCriteria}
                                text={check} key={check}
                            />
                        );
                    })}
                </ul>
                <div className={styles.line}></div>
                <p>Has this password been previously exposed in data breaches?</p>
                <a href="https://haveibeenpwned.com/Passwords" target="_blank" rel="noreferrer"><button id={styles.checkPassword}>Check Password</button></a>
            </div>
            <button id={styles[`setPassword${themeContext.theme}`]} onClick={setBoardPassword}
                disabled={checks < Object.keys(passkeyChecks).length}
                className={checks < Object.keys(passkeyChecks).length ? styles.disabledSetPassword : undefined}>
                Set Password
            </button>
        </PopUp>
    )
}

function PasskeyCriteria({ passCheck, text }) {
    return (
        <>
            {passCheck ?
                <li id={styles.checked}>
                    <img src={check} alt="" />
                    <span> {text}</span>
                </li> :
                <li>
                    <img src={notchecked} alt="" />
                    <span> {text}</span>
                </li>}
        </>
    );
}

export default PasskeyPrompt;
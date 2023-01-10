import { closeContainer } from '../../utils/TraverseChildren';
import { ThemeContext } from '../../Wrappers/Theme';
import popUpStyles from '../../Layouts/PopUp/PopUp.module.css';
import { useContext, useState } from 'react';
import { capitaliseWords } from '../../utils/CapitaliseWords';
import styles from './PasskeyPrompt.module.css';
import check from '../../Assets/check.png';
import notchecked from '../../Assets/notchecked.png';
import hideIcon from '../../Assets/hide.svg';
import showIcon from '../../Assets/show.png';
import { ref, set } from 'firebase/database';
import { database } from '../Dashboard/Dashboard';

const strengthColours = {
    "weak": "rgb(255, 62, 68)",
    "fair": "rgb(255, 117, 18)",
    "strong": "rgb(29, 165, 5)"
};

const passwordChecks = {
    "At least 12 characters": (pass) => pass.length >= 12,
    "Lowercase": (pass) => new RegExp('[a-z]').test(pass),
    "Uppercase": (pass) => new RegExp('[A-Z]').test(pass),
    "Symbols": (pass) => !new RegExp('^[0-9a-zA-Z]*$').test(pass),
    "Numbers": (pass) => new RegExp('[0-9]').test(pass)
};

function PasswordPrompt({ setIsPublic, setPasswordPrompt, boardName }) {
    const themeContext = useContext(ThemeContext);
    const [password, setPassword] = useState("");
    const [passStrength, setPassStrength] = useState("weak");
    const [hidePass, setHidePass] = useState("password");

    const setBoardPassword = async () => {
        setPasswordPrompt(false);
        setIsPublic((state) => !state);
        setPassword("");

        const path = `boards/${boardName}`;
        await set(ref(database, `${path}/password`), password);
        await set(ref(database, `${path}/public`), false);
    };

    const getPasswordStrength = (e) => {
        const pass = e.target.value;
        setPassword(pass);
    };

    const toggleHidePass = () => {
        setHidePass(hidePass === "password" ? "text" : "password");
    };

    return (
        <div className={popUpStyles.bg}
        id={popUpStyles[`popUp${themeContext.theme}`]}>
            <section className={popUpStyles.popUp}>
                <p style={{marginTop: '0px'}}>Set password for <b>{capitaliseWords(boardName)}</b></p>
                <div className={styles.passInput}>
                    <input id={styles.pass} type={hidePass} placeholder='e.g. x45ybg78' onChange={getPasswordStrength} />
                    <div id={styles.togglePassIcon}><img src={hidePass === "password" ? showIcon : hideIcon} alt="toggle icon" id={styles.hidePass} onClick={toggleHidePass} /></div>
                </div>
                <div className={styles.passwordCriteria}>
                    <p>Password strength: <span style={{textTransform: 'uppercase', color: strengthColours[passStrength]}}>{passStrength}</span></p>
                    <div className={styles.line}></div>
                    <p>Password composition</p>
                    <p id={styles.note}>Make sure that your password is long enough and contains various types of characters.</p>
                    <ul className={styles.passwordChecks}>
                        {Object.keys(passwordChecks).map((check) => {
                            return (
                                <PasswordCriteria 
                                    passCheck={passwordChecks[check](password)} 
                                    text={check} key={check}
                                />
                            );
                        })}
                    </ul>
                    <div className={styles.line}></div>
                    <p>Has this password been previously exposed in data breaches?</p>
                    <a href="https://haveibeenpwned.com/Passwords" target="_blank" rel="noreferrer"><button id={styles.checkPassword}>Check Password</button></a>
                </div>
                <button id={styles.setPassword} onClick={setBoardPassword}>Set Password</button>
            </section>
        </div>
    )
}

function PasswordCriteria({ passCheck, text }) {
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

export default PasswordPrompt;
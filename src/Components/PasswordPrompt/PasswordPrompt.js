import { closeContainer } from '../../utils/TraverseChildren';
import { ThemeContext } from '../../Wrappers/Theme';
import popUpStyles from '../../Layouts/PopUp/PopUp.module.css';
import { useContext, useState } from 'react';
import { capitaliseWords } from '../../utils/CapitaliseWords';
import styles from './PasswordPrompt.module.css';
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
                    <div id={styles.togglePassIcon}><img src={hidePass === "password" ? showIcon : hideIcon} id={styles.hidePass} onClick={toggleHidePass} /></div>
                </div>
                <div className={styles.passwordCriteria}>
                    <p>Password strength: <span style={{textTransform: 'uppercase', color: strengthColours[passStrength]}}>{passStrength}</span></p>
                    <div className={styles.line}></div>
                    <p>Password composition</p>
                    <p id={styles.note}>Make sure that your password is long enough and contains various types of characters.</p>
                    <ul className={styles.passwordChecks}>
                        {password.length >= 12 ? <li id={styles.checked}><img src={check} /> At least 12 characters</li> : <li><img src={notchecked} /> At least 12 characters</li>}
                        {new RegExp('[a-z]').test(password) ? <li id={styles.checked}><img src={check} /> Lowercase</li> : <li><img src={notchecked} /> Lowercase</li>}
                        {new RegExp('[A-Z]').test(password) ? <li id={styles.checked}><img src={check} /> Uppercase</li> : <li><img src={notchecked} /> Uppercase</li>}
                        {!new RegExp('^[0-9a-zA-Z]*$').test(password) ? <li id={styles.checked}><img src={check} /> Symbols (?#@...)</li> : <li><img src={notchecked} /> Symbols (?#@...)</li>}
                        {new RegExp('[0-9]').test(password) ? <li id={styles.checked}><img src={check} /> Numbers</li> : <li><img src={notchecked} /> Numbers</li>}
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

export default PasswordPrompt;
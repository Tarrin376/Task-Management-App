import React, { useState, useContext } from 'react';
import styles from './PrivateBoard.module.css';
import padlock from '../../Assets/padlock.png';
import { ref, get } from 'firebase/database';
import { database } from '../Dashboard/Dashboard';
import { ThemeContext } from '../../Wrappers/Theme';

function PrivateBoard({ toggleSidebar, boardName, setHasAccess, boardData }) {
  const [pass, setPass] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const themeContext = useContext(ThemeContext);

  const unlockBoard = async () => {
    const path = `boards/${boardName}/password`;
    await get(ref(database, path)).then((snapshot) => {
      const boardPass = snapshot.val();
      if (boardPass === pass) {
        sessionStorage.setItem(boardName, "unlocked");
        setHasAccess(true);
      } else {
        setErrorMsg(true);
      }
    });
  };

  return (
    <div className={styles.privateBg} style={toggleSidebar ? { width: 'calc(100vw - 340px)', marginLeft: '340px' }
      : { width: '100%', marginLeft: '0px' }}>
      <div className={styles.privatePass} id={styles[`private${themeContext.theme}`]}>
        <img src={padlock} id={styles.padlockIcon} alt="Padlock icon" />
        <p id={styles.title}>This board has been made private by the owner</p>
        <p>
          To gain access to the content of this board, enter the passkey below
          {boardData.owner && ` or email the owner at ${boardData.owner} to request access`}.
        </p>
        {errorMsg && <div className={styles.errorMsg}>
          <p>Incorrect passkey, try again.</p>
          <button onClick={() => setErrorMsg(false)}>X</button>
        </div>}
        <div className={styles.enterPass}>
          <input id={styles.pass} type="password" placeholder='Enter passkey' onChange={(e) => setPass(e.target.value)} />
          <button id={styles.enter} onClick={unlockBoard}>Enter</button>
        </div>
      </div>
    </div>
  )
}

export default PrivateBoard
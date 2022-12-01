import styles from './CreateBoard.module.css';
import popUpStyles from '../../Layouts/PopUp/PopUp.module.css';
import { useRef, useState } from 'react';
import { generateBoardTemplate } from '../../utils/BoardTemplateJson';
import { database } from '../../Components/Dashboard/Dashboard';
import { get, ref, set } from 'firebase/database';

function CreateBoard({ setBoardName, setCreateWindow }) {
    const boardInputRef = useRef();
    const [boardErrorMsg, setBoardErrorMsg] = useState();

    const createNewBoard = async () => {
        get(ref(database, "boards/")).then((snapshot) => {
            const name = boardInputRef.current.value.toLowerCase().trim();
            const data = snapshot.val();

            if (name !== "" && (!data || !Object.keys(data).find((board) => board === name))) {
                set(ref(database, `boards/${name}`), { ...generateBoardTemplate(), name }).then(() => {
                    setBoardErrorMsg(false);
                    setBoardName(name);
                    setCreateWindow(false);
                });
            } else {
                setBoardErrorMsg(true);
            }
        });
    }

    return (
        <div className={popUpStyles.bg}>
            <section className={popUpStyles.popUp}>
                <button id={popUpStyles.exit} style={{ marginBottom: '20px' }} onClick={() => setCreateWindow(false)}>X</button>
                <p>Create board name</p>
                {boardErrorMsg && <p style={{ color: 'rgb(255, 87, 87)', marginBottom: '11px', marginTop: '0px' }}>Board already exits</p>}
                <input type="text" name="" id="" placeholder='e.g. Platform Launch' ref={boardInputRef} />
                <button className={styles.addButton} onClick={createNewBoard}>Add Board</button>
            </section>
        </div>
    );
}

export default CreateBoard;
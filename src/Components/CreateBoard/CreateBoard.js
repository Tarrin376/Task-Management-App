import styles from './CreateBoard.module.css';
import popUpStyles from '../../Layouts/PopUp/PopUp.module.css';
import { useRef, useState } from 'react';
import { boardSkeleton } from '../../utils/BoardSkeletonJson';
import { database } from '../../Components/Dashboard/Dashboard';
import { get, ref, set } from 'firebase/database';

function CreateBoard({ setBoardName, setCreateWindow }) {
    const boardInputRef = useRef();
    const [boardErrorMsg, setBoardErrorMsg] = useState();

    const createNewBoard = async () => {
        const name = boardInputRef.current.value.toLowerCase();
        const taskStr = `boards/`;
        const res = await get(ref(database, taskStr));

        if (res.val() == null || !Object.keys(res.val()).find((board) => board === name)) {
            await set(ref(database, taskStr + `${name}`), { ...boardSkeleton, name });
            setBoardName(name);
            setCreateWindow(false);
            setBoardErrorMsg(false);
        }
        else {
            setBoardErrorMsg(true);
        }
    }

    return (
        <div className={popUpStyles.bg}>
            <section className={popUpStyles.popUp}>
                <button id={popUpStyles.exit} style={{ marginBottom: '20px' }} onClick={() => setCreateWindow(false)}>X</button>
                {boardErrorMsg && <p style={{ color: 'rgb(255, 87, 87)', marginBottom: '11px' }}>Board already exits</p>}
                <input type="text" name="" id="" placeholder='e.g. Platform Launch' ref={boardInputRef} />
                <button className={styles.addButton} onClick={createNewBoard}>Add Board</button>
            </section>
        </div>
    );
}

export default CreateBoard;
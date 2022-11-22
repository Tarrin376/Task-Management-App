import styles from './CreateBoard.module.css';
import popUpStyles from '../../Layouts/PopUp/PopUp.module.css';
import { FIREBASE_DB_URL } from '../../Components/Dashboard/Dashboard';
import { useRef } from 'react';
import { boardSkeleton } from '../../utils/BoardSkeletonJson';

function CreateBoard({ setBoardName, setCreateWindow }) {
    const boardInputRef = useRef();
    const createNewBoard = async () => {
        const name = boardInputRef.current.value;
        await fetch(FIREBASE_DB_URL, {
            method: 'POST',
            body: JSON.stringify({ ...boardSkeleton, name })
        });

        setBoardName(name);
        setCreateWindow(false);
    }

    return (
        <div className={popUpStyles.bg}>
            <section className={popUpStyles.popUp}>
                <button id={popUpStyles.exit} style={{ marginBottom: '20px' }} onClick={() => setCreateWindow(false)}>X</button>
                <input type="text" name="" id="" placeholder='e.g. Platform Launch' ref={boardInputRef} />
                <button className={styles.addButton} onClick={createNewBoard}>Add Board</button>
            </section>
        </div>
    );
}

export default CreateBoard;
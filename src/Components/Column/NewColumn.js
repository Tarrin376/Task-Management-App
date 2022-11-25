import popUpStyles from '../../Layouts/PopUp/PopUp.module.css';
import windowStyles from '../CreateBoard/CreateBoard.module.css';
import { useRef, useState } from 'react';
import { get, ref, set } from 'firebase/database';
import { database } from '../Dashboard/Dashboard';
import { boardSkeleton } from '../../utils/BoardSkeletonJson';

function NewColumn({ toggleWindow, boardData, setBoardData }) {
    const columnInputRef = useRef();
    const [columnErrorMsg, setColumnErrorMsg] = useState(false);

    const createNewColumn = (e) => {
        const columnName = columnInputRef.current.value;
        const taskStr = `boards/${boardData.id}/columns`;

        get(ref(database, taskStr)).then((snapshot) => {
            const res = snapshot.val();
            let valid = true;

            for (let column of res) {
                if (column.name === columnName.toLowerCase()) {
                    valid = false;
                    break;
                }
            }

            if (!valid) {
                setColumnErrorMsg(true);
                return
            }

            addColumn(columnName.toLowerCase(), taskStr, res);
            toggleWindow(e);
        });
    };

    const addColumn = async (name, taskStr, res) => {
        setColumnErrorMsg(false);
        const newColumn = { ...boardSkeleton.columns[0], name, colorId: '#aa43fd' };
        const updatedBoard = [...res, newColumn];

        await set(ref(database, taskStr), updatedBoard);
        setBoardData({ ...boardData, columns: updatedBoard })
    }

    return (
        <div className={popUpStyles.bg} style={{ position: 'relative', borderRadius: '10px' }}>
            <section className={popUpStyles.popUp}>
                <button id={popUpStyles.exit} type="button" style={{ marginBottom: '20px' }} onClick={toggleWindow}>X</button>
                {columnErrorMsg && <p style={{ color: 'rgb(255, 87, 87)', marginBottom: '11px' }}>Column already exits</p>}
                <input type="text" name="" id="" placeholder='e.g. Project tasks' ref={columnInputRef} />
                <button className={windowStyles.addButton} type="button" onClick={(e) => createNewColumn(e)}>Add Column</button>
            </section>
        </div>
    );
}

export default NewColumn;
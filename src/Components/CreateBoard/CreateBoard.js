import styles from './CreateBoard.module.css';
import popUpStyles from '../../Layouts/PopUp/PopUp.module.css';
import { useRef, useState, useContext } from 'react';
import { database } from '../../Components/Dashboard/Dashboard';
import { ref, set } from 'firebase/database';
import { ThemeContext } from '../../Wrappers/Theme';
import { closeContainer } from '../../utils/TraverseChildren';

function CreateBoard({ setBoardName, setCreateBoardWindow, setAllBoards, setBoardData, allBoards }) {
    const boardInputRef = useRef();
    const [validName, setValidName] = useState(false);
    const themeContext = useContext(ThemeContext);
    const popUpRef = useRef();
    const exitButtonRef = useRef();

    const checkBoardName = () => {
        const name = boardInputRef.current.value.toLowerCase().trim();
        if (allBoards.includes(name) || name === "") setValidName(false);
        else setValidName(true);
    };

    const createNewBoard = async () => {
        const name = boardInputRef.current.value.toLowerCase().trim();
        set(ref(database, `boards/${name}`), "").then(() => {
            setAllBoards((boards) => [...boards, name]);
            setBoardName(name);
            setCreateBoardWindow(false);
            setBoardData(null);
        });
    };

    return (
        <div className={popUpStyles.bg} id={popUpStyles[`popUp${themeContext.theme}`]}
            onClick={(e) => closeContainer(e, popUpRef.current, exitButtonRef.current, setCreateBoardWindow)}>
            <section className={popUpStyles.popUp} ref={popUpRef}>
                <button
                    id={popUpStyles.exit} style={{ marginBottom: '20px' }}
                    onClick={() => setCreateBoardWindow(false)}
                    ref={exitButtonRef}>X
                </button>
                <p>Create board name</p>
                <input
                    type="text" name="" id="" placeholder='e.g. Platform Launch'
                    ref={boardInputRef} onChange={checkBoardName}
                />
                <button
                    className={styles.addButton} id={!validName ? styles.invalid : ''}
                    onClick={createNewBoard} disabled={!validName}>Add Board
                </button>
            </section>
        </div>
    );
}

export default CreateBoard;
import styles from './CreateBoard.module.css';
import popUpStyles from '../../Layouts/PopUp/PopUp.module.css';
import { useRef, useState, useContext } from 'react';
import { database } from '../../Components/Dashboard/Dashboard';
import { ref, set } from 'firebase/database';
import { ThemeContext } from '../../Wrappers/Theme';
import { closeContainer } from '../../utils/TraverseChildren';

// Regular expression used to validate the user's email address.
const emailRegex = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");

function CreateBoard({ setBoardName, setCreateBoardWindow, setAllBoards, setBoardData, allBoards }) {
    const themeContext = useContext(ThemeContext);
    const popUpRef = useRef();
    const exitButtonRef = useRef();
    const [boardInput, setBoardInput] = useState("");
    const [emailInput, setEmailInput] = useState("");

    const createNewBoard = async () => {
        set(ref(database, `boards/${boardInput}`), {
            owner: emailInput === "" ? null : emailInput,
            public: true
        }).then(() => {
            setAllBoards((boards) => [...boards, boardInput]);
            setBoardName(boardInput);
            setCreateBoardWindow(false);
            setBoardData(null);
        });
    };

    const boardIsValid = () => {
        return !allBoards.includes(boardInput) && boardInput !== "";
    };

    const emailIsValid = () => {
        return emailRegex.test(emailInput) || emailInput === "";
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
                <p>Board name</p>
                <input
                    type="text" name="" id="" placeholder='e.g. Platform Launch'
                    onChange={(e) => setBoardInput(e.target.value.toLowerCase().trim())}
                />
                <p>Email - Optional<br></br><span id={styles[`optional${themeContext.theme}`]}>(Will be used for view requests)</span></p>
                <input
                    type="text" name="" id="" placeholder='e.g. example@gmail.com'
                    onChange={(e) => setEmailInput(e.target.value)}
                />
                <button
                    className={styles[`addButton${themeContext.theme}`]} 
                    id={!boardIsValid() || !emailIsValid() ? styles.invalid : ''}
                    onClick={createNewBoard} disabled={!boardIsValid() || !emailIsValid()}>Add Board
                </button>
            </section>
        </div>
    );
}

export default CreateBoard;
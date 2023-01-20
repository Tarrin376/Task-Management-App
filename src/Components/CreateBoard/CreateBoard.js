import styles from './CreateBoard.module.css';
import popUpStyles from '../../Layouts/PopUp/PopUp.module.css';
import { useState, useContext } from 'react';
import { database } from '../../Components/Dashboard/Dashboard';
import { ref, set } from 'firebase/database';
import { ThemeContext } from '../../Wrappers/Theme';
import PopUp from '../../Layouts/PopUp/PopUp';

// Regular expression used to validate the user's email address.
const emailRegex = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");

function CreateBoard({ setBoardName, setCreateBoard, setAllBoards, setBoardData, allBoards }) {
    const themeContext = useContext(ThemeContext);
    const [boardInput, setBoardInput] = useState("");
    const [emailInput, setEmailInput] = useState("");

    const createNewBoard = async () => {
        set(ref(database, `boards/${boardInput}`), {
            owner: emailInput === "" ? null : emailInput,
            public: true
        }).then(() => {
            setAllBoards((boards) => [...boards, boardInput]);
            setBoardName(boardInput);
            setCreateBoard(false);
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
        <PopUp setWindow={setCreateBoard}>
            <button
                id={popUpStyles.exit} style={{ marginBottom: '20px' }}
                onClick={() => setCreateBoard(false)}>X
            </button>
            <p>Board name</p>
            <input
                type="text" name="" id="" placeholder='e.g. Platform Launch' maxLength={25}
                onChange={(e) => setBoardInput(e.target.value.toLowerCase().trim())}
            />
            <p>
                Company email - Optional<br></br>
                <span id={styles[`optional${themeContext.theme}`]}>
                    (Will be used for view requests)
                </span>
            </p>
            <input
                type="text" name="" id="" placeholder='e.g. johnsCafe67@gmail.com'
                onChange={(e) => setEmailInput(e.target.value)}
            />
            <button
                className={styles.addButton}
                id={!boardIsValid() || !emailIsValid() ? styles.invalid : ''}
                onClick={createNewBoard} disabled={!boardIsValid() || !emailIsValid()}>Add Board
            </button>
        </PopUp>
    );
}

export default CreateBoard;
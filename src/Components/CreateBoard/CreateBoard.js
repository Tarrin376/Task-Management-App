import styles from './CreateBoard.module.css';
import popUpStyles from '../../Layouts/PopUp/PopUp.module.css';
import { useState, useContext } from 'react';
import { database } from '../../Components/Dashboard/Dashboard';
import { get, ref, set } from 'firebase/database';
import { ThemeContext } from '../../Wrappers/Theme';
import PopUp from '../../Layouts/PopUp/PopUp';

// Regular expression used to validate the user's email address.
const emailRegex = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");

function CreateBoard({ setBoardName, setCreateBoard, setAllBoards, setBoardData, allBoards }) {
    const themeContext = useContext(ThemeContext);
    const [boardInput, setBoardInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [valid, setValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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

    const checkBoardName = async (e) => {
        const boardName = e.target.value.toLowerCase().trim();
        console.log(boardName);
        setBoardInput(boardName);

        if (boardName === "") {
            setValid(false);
            return;
        }

        setIsLoading(true);
        const res = await get(ref(database, `boards`)).then((snapshot) => {
            const boards = snapshot.val();
            return !boards || !Object.keys(boards).includes(boardName);
        });

        setValid(res);
        setIsLoading(false);
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
                onChange={checkBoardName}
            />
            <p>
                Company email - optional<br></br>
                <span id={styles[`optional${themeContext.theme}`]}>
                    (Will be used for view requests)
                </span>
            </p>
            <input
                type="text" name="" id="" placeholder='e.g. johnsCafe67@gmail.com'
                onChange={(e) => setEmailInput(e.target.value)} maxLength={254}
            />
            {!isLoading ? <button
                className={styles.addButton}
                id={!valid || !emailIsValid() ? styles.invalid : ''}
                onClick={createNewBoard} disabled={!valid || !emailIsValid()}>Add Board
            </button> :  <div className={styles.loader}><div></div><div></div><div></div></div> }
        </PopUp>
    );
}

export default CreateBoard;
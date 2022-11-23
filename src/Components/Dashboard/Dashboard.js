import Sidebar from '../../Layouts/Sidebar/Sidebar';
import Navbar from '../../Layouts/Navbar/Navbar';
import Board from '../Board/Board';
import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

export const FIREBASE_DB_URL = 'https://task-management-app-4b089-default-rtdb.firebaseio.com/boards.json';
const firebaseConfig = {
    databaseURL: "https://task-management-app-4b089-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
// All boards
export let ALL_BOARDS = {};

function Dashboard() {
    const [toggleSidebar, setToggleSidebar] = useState(true);
    const [boardName, setBoardName] = useState("");
    const [toggleNewTask, setToggleNewTask] = useState(false);
    const [boardData, setBoardData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getBoardData = async () => {
        return await get(ref(database, 'boards/'));
    };

    useEffect(() => {
        setIsLoading(true);
        getBoardData().then((data) => {
            const res = data.val();
            if (res == null) {
                setIsLoading(false);
                return;
            }

            const firstBoard = Object.keys(res).find((key) => res[key].name === boardName || boardName === "");
            setBoardName(res[firstBoard].name);
            setBoardData({ ...res[firstBoard], id: firstBoard });
            setIsLoading(false);
            ALL_BOARDS = res;
        });
    }, [boardName]);

    return (
        <React.Fragment>
            <Sidebar
                toggleSidebar={toggleSidebar}
                setToggleSidebar={setToggleSidebar}
                boardName={boardName}
                setBoardName={setBoardName}
                isLoading={isLoading}
            />
            <Navbar
                toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar}
                boardName={boardName} setToggleNewTask={setToggleNewTask}
            />
            <Board
                boardName={boardName}
                toggleNewTask={toggleNewTask}
                setToggleNewTask={setToggleNewTask}
                toggleSidebar={toggleSidebar}
                boardData={boardData}
                isLoading={isLoading}
                setBoardData={setBoardData}
            />
        </React.Fragment>
    );
}

export default Dashboard;
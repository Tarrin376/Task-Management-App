import Sidebar from '../../Layouts/Sidebar/Sidebar';
import Navbar from '../../Layouts/Navbar/Navbar';
import Board from '../Board/Board';
import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

// Firebase config containing the db URL
const firebaseConfig = { databaseURL: "https://task-management-app-4b089-default-rtdb.firebaseio.com/" };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
// Firebase database URL for post and get requests
export const FIREBASE_DB_URL = "https://task-management-app-4b089-default-rtdb.firebaseio.com/";
// All boards
export let ALL_BOARDS = [];

function Dashboard() {
    const [toggleSidebar, setToggleSidebar] = useState(true);
    const [boardName, setBoardName] = useState("");
    const [toggleNewTask, setToggleNewTask] = useState(false);
    const [boardData, setBoardData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getBoardData = async (boardName = "") => {
        return await get(ref(database, `boards/${boardName}`.trim()));
    };

    useEffect(() => {
        setIsLoading(true);
        getBoardData().then((data) => {
            const res = data.val();
            if (!res) {
                ALL_BOARDS = [];
                setIsLoading(false);
                return;
            }

            const board = Object.keys(res).find((key) => key === boardName || boardName === "");
            ALL_BOARDS = Object.keys(res);

            setBoardName(board);
            setBoardData({ ...res[board] });
            setIsLoading(false);
        });
    }, [boardName, toggleNewTask]);

    return (
        <>
            <Sidebar
                toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar}
                boardName={boardName} setBoardName={setBoardName}
                isLoading={isLoading} setBoardData={setBoardData}
                toggleNewTask={toggleNewTask}
            />
            <Navbar
                toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar}
                boardName={boardName} setToggleNewTask={setToggleNewTask}
                setBoardName={setBoardName} boardData={boardData}
            />
            <Board
                boardName={boardName} toggleNewTask={toggleNewTask}
                setToggleNewTask={setToggleNewTask} toggleSidebar={toggleSidebar}
                boardData={boardData} isLoading={isLoading}
                setBoardData={setBoardData}
            />
        </>
    );
}

export default Dashboard;
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
// Maximm subtasks allowed when creating a new task
export const MAX_SUBTASKS_ALLOWED = 5;
// Different levels of priority for a given task
export const TASK_PRIORITIES = ["Low", "Medium", "High", "Critical"];

function Dashboard() {
    const [toggleSidebar, setToggleSidebar] = useState(true);
    const [newTaskWindow, setNewTaskWindow] = useState(false);
    const [boardName, setBoardName] = useState("");
    const [boardData, setBoardData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [allBoards, setAllBoards] = useState([]);
    const [updateBoard, setUpdateBoard] = useState(false);

    const getBoardData = async (boardName = "") => {
        return await get(ref(database, `boards/${boardName}`.trim()));
    };

    useEffect(() => {
        getBoardData().then((data) => {
            const res = data.val();
            if (!res) return;
            setAllBoards(Object.keys(res));
        });
    }, []);

    useEffect(() => {
        setIsLoading(true);
        getBoardData(boardName).then((data) => {
            const res = data.val();
            setIsLoading(false);
            if (!res) return;

            if (boardName === "") {
                const board = Object.keys(res)[0];
                setBoardName(board);
                setBoardData({ ...res[board] });
            } else {
                setBoardData({ ...res });
            }
        });
    }, [boardName, updateBoard]);

    return (
        <>
            <Sidebar
                toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar}
                boardName={boardName} setBoardName={setBoardName}
                isLoading={isLoading} setBoardData={setBoardData}
                allBoards={allBoards} setAllBoards={setAllBoards}
            />
            <Navbar
                toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar}
                boardName={boardName} setNewTaskWindow={setNewTaskWindow}
                setBoardName={setBoardName} boardData={boardData}
                setAllBoards={setAllBoards}
            />
            <Board
                boardName={boardName} newTaskWindow={newTaskWindow}
                setNewTaskWindow={setNewTaskWindow} toggleSidebar={toggleSidebar}
                boardData={boardData} isLoading={isLoading}
                setBoardData={setBoardData} setUpdateBoard={setUpdateBoard}
            />
        </>
    );
}

export default Dashboard;
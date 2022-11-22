import Sidebar from '../../Layouts/Sidebar/Sidebar';
import Navbar from '../../Layouts/Navbar/Navbar';
import Board from '../Board/Board';
import React, { useState, useEffect } from 'react';

export const FIREBASE_DB_URL = 'https://task-management-app-4b089-default-rtdb.firebaseio.com/boards.json';

function Dashboard() {
    const [toggleSidebar, setToggleSidebar] = useState(true);
    const [boardName, setBoardName] = useState("");
    const [toggleNewTask, setToggleNewTask] = useState(false);
    const [boardData, setBoardData] = useState(null);
    const [allBoards, setAllBoards] = useState({});

    const getBoardData = async () => {
        const res = await fetch(FIREBASE_DB_URL);
        const jsonData = await res.json();
        return jsonData;
    };

    useEffect(() => {
        setBoardData(null);
        getBoardData().then((jsonData) => {
            if (jsonData == null) return;
            const firstBoard = Object.keys(jsonData).find((key) => jsonData[key].name === boardName || boardName === "");
            setBoardName(jsonData[firstBoard].name);
            setBoardData(jsonData[firstBoard]);
            setAllBoards(jsonData);
        });
    }, [boardName]);

    return (
        <React.Fragment>
            <Sidebar
                toggleSidebar={toggleSidebar}
                setToggleSidebar={setToggleSidebar}
                boardName={boardName}
                setBoardName={setBoardName}
                allBoards={allBoards}
                boardCount={Object.keys(allBoards).length}
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
            />
        </React.Fragment>
    );
}

export default Dashboard;
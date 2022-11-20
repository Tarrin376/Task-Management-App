import Sidebar from '../../Layouts/Sidebar/Sidebar';
import Navbar from '../../Layouts/Navbar/Navbar';
import Board from '../Board/Board';
import React, { useState } from 'react';

function Dashboard() {
    const [toggleSidebar, setToggleSidebar] = useState(true);
    const [board, setBoard] = useState('Platform Launch');

    return (
        <React.Fragment>
            <Sidebar
                toggleSidebar={toggleSidebar}
                setToggleSidebar={setToggleSidebar}
                board={board}
                setBoard={setBoard}
            />
            <Navbar toggleSidebar={toggleSidebar} board={board} />
            <Board board={board} />
        </React.Fragment>
    );
}

export default Dashboard;
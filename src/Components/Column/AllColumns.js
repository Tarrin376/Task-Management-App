import { useState } from 'react';
import CreateColumn from '../Column/CreateColumn';
import Column from '../Column/Column';

function AllColumns({ boardData, setBoardData, boardName }) {
    const [columnWindow, setColumnWindow] = useState(false);

    const toggleWindow = (e) => {
        if (e.target.type === 'button') setColumnWindow(false);
        else setColumnWindow(true);
    };

    return (
        <>
            {boardData && Object.values(boardData).map((column) => {
                return (
                    <Column
                        columnData={column} key={column.id}
                        boardData={boardData}
                        setBoardData={setBoardData}
                        boardName={boardName}
                    />
                );
            })}
            <CreateColumn
                toggleWindow={toggleWindow} columnWindow={columnWindow}
                setBoardData={setBoardData} boardName={boardName}
            />
        </>
    )
}

export default AllColumns;
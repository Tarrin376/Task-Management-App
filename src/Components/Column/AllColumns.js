import CreateColumn from '../Column/CreateColumn';
import Column from '../Column/Column';

function AllColumns({ boardData, setBoardData, boardName, setUpdateBoard, isLoading }) {
    return (
        <>
            {boardData && Object.values(boardData).map((column) => {
                if (typeof column === 'object') {
                    return (
                        <Column
                            columnData={column} key={column.id}
                            boardData={boardData}
                            setBoardData={setBoardData}
                            boardName={boardName}
                            setUpdateBoard={setUpdateBoard}
                        />
                    );
                }
            })}
            {!isLoading && <CreateColumn
                setBoardData={setBoardData} boardName={boardName}
                boardData={boardData}
            />}
        </>
    );
}

export default AllColumns;
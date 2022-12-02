export function generateBoardTemplate() {
    const board = {};
    const toDoDate = new Date().getTime();

    board[`${toDoDate}`] = {
        "name": "todo",
        "id": toDoDate,
        "colorId": "white",
    };

    return board;
}
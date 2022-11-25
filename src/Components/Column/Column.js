import styles from './Column.module.css';
import Task from '../Task/Task';

function Column({ columnData, boardName, boardData, columnIndex, setBoardData }) {
    return (
        <div className={styles.column}>
            <div className={styles.columnTitle}>
                <div id={styles.colorId} style={{ background: columnData.colorId }}></div>
                <p>{columnData.name.toUpperCase() + " "}</p>
                <span className={styles.countIcon}>
                    {columnData.tasks ? columnData.tasks.filter(x => x).length : 0}
                </span>
            </div>
            {columnData.tasks && columnData.tasks.map((task) => {
                return (
                    <Task
                        taskData={task} key={task["id"]}
                        boardData={boardData} columnIndex={columnIndex}
                        setBoardData={setBoardData}
                    />
                );
            })}
        </div>
    );
}

export default Column;
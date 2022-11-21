import styles from './Column.module.css';
import Task from './Task';

function Column({ columnData, board }) {
    return (
        <div className={styles.column}>
            <div className={styles.columnTitle}>
                <div id={styles.colorId} style={{ background: columnData.colorId }}></div>
                <p>{columnData["title"].toUpperCase()} [ {columnData.tasks.length} ]</p>
            </div>
            {columnData.tasks.map((task) => {
                return <Task taskData={task} key={task["id"]} board={board} />
            })}
        </div>
    );
}

export default Column;
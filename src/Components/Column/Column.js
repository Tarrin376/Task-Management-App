import styles from './Column.module.css';
import Task from '../Task/Task';

function Column({ columnData, boardName, boardData, columnIndex }) {
    return (
        <div className={styles.column}>
            <div className={styles.columnTitle}>
                <div id={styles.colorId} style={{ background: columnData.colorId }}></div>
                <p>{columnData.name.toUpperCase()} ( <span style={{ color: '#00ffc0' }}>{columnData.tasks.length}</span> )</p>
            </div>
            {columnData.tasks.map((task) => {
                return (
                    <Task
                        taskData={task} key={task["id"]}
                        boardData={boardData} columnIndex={columnIndex}
                    />
                );
            })}
        </div>
    );
}

export default Column;
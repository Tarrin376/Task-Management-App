import { TASK_PRIORITIES } from '../Components/Dashboard/Dashboard';

export const sortByOptions = {
    "Date & Time": (task1, task2) => task2.id - task1.id,
    "Highest Priority": (task1, task2) => {
        const firstIndex = TASK_PRIORITIES.indexOf(task1.priority);
        const secondIndex = TASK_PRIORITIES.indexOf(task2.priority);
        return secondIndex - firstIndex;
    },
    "Lowest Priority": (task1, task2) => {
        const firstIndex = TASK_PRIORITIES.indexOf(task1.priority);
        const secondIndex = TASK_PRIORITIES.indexOf(task2.priority);
        return firstIndex - secondIndex;
    },
    "Most subtasks completed": (task1, task2) => {
        const sub1 = task1.subtasks ? task1.subtasks.filter((x) => x.completed).length : 0;
        const sub2 = task2.subtasks ? task2.subtasks.filter((x) => x.completed).length : 0;
        const sub1Length = task1.subtasks ? task1.subtasks.length : 0;
        const sub2Length = task2.subtasks ? task2.subtasks.length : 0;
        return sub2 - sub1 || sub1Length - sub2Length;
    },
    "Least subtasks completed": (task1, task2) => {
        const sub1 = task1.subtasks ? task1.subtasks.filter((x) => x.completed).length : 0;
        const sub2 = task2.subtasks ? task2.subtasks.filter((x) => x.completed).length : 0;
        const sub1Length = task1.subtasks ? task1.subtasks.length : 0;
        const sub2Length = task2.subtasks ? task2.subtasks.length : 0;
        return sub1 - sub2 || sub2Length - sub1Length;
    }
};
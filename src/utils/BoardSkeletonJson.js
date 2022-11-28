export function generateSkeleton() {
    return ({
        'columns': [
            {
                "name": "todo",
                "id": new Date().getTime(),
                "colorId": "#ff3b65",
                "tasks": [
                    {
                        "title": "Task Template",
                        "task_desc": "You can easily modify your tasks with just a couple clicks!",
                        "id": new Date().getTime(),
                    },
                ]
            },
            {
                "name": "doing",
                "id": new Date().getTime() + 1,
                "colorId": "#05cffa",
                "tasks": [
                    {
                        "title": "Task Template",
                        "task_desc": "You can easily modify your tasks with just a couple clicks!",
                        "id": new Date().getTime() + 2,
                    },
                ]
            },
            {
                "name": "done",
                "id": new Date().getTime() + 2,
                "colorId": "#00ffc0",
                "tasks": [
                    {
                        "title": "Task Template",
                        "task_desc": "You can easily modify your tasks with just a couple clicks!",
                        "id": new Date().getTime() + 5,
                    },
                ]
            },
        ]
    });
}
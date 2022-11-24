export const boardSkeleton = {
    'columns': [
        {
            "name": "todo",
            "id": new Date().getTime(),
            "colorId": "#ff3b65",
            "tasks": [
                {
                    "title": "Build UI for onboarding flow",
                    "task_desc": "Build UI for onboarding flow",
                    "id": new Date().getTime(),
                    "subtasks": [
                        {
                            "task_desc": "Make coffee",
                            "completed": false,
                            "id": new Date().getTime(),
                        }
                    ]
                },
            ]
        },
        {
            "name": "doing",
            "id": new Date().getTime() + 1,
            "colorId": "#05cffa",
            "tasks": [
                {
                    "title": "Build UI for onboarding flow",
                    "task_desc": "Build UI for onboarding flow",
                    "id": new Date().getTime(),
                    "subtasks": [
                        {
                            "task_desc": "Make coffee",
                            "completed": false,
                            "id": new Date().getTime(),
                        }
                    ]
                },
            ]
        },
        {
            "name": "done",
            "id": new Date().getTime() + 2,
            "colorId": "#00ffc0",
            "tasks": [
                {
                    "title": "Build UI for onboarding flow",
                    "task_desc": "Build UI for onboarding flow",
                    "id": new Date().getTime(),
                    "subtasks": [
                        {
                            "task_desc": "Make coffee",
                            "completed": false,
                            "id": new Date().getTime(),
                        }
                    ]
                },
            ]
        },
    ]
};
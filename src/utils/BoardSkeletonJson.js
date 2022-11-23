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
                    "id": new Date().getTime() + 1,
                    "subtasks": [
                        {
                            "task_desc": "Make coffee",
                            "completed": false,
                            "id": new Date().getTime() + 2,
                        }
                    ]
                },
            ]
        },
        {
            "name": "doing",
            "id": new Date().getTime() + 3,
            "colorId": "#05cffa",
            "tasks": [
                {
                    "title": "Build UI for onboarding flow",
                    "task_desc": "Build UI for onboarding flow",
                    "id": new Date().getTime() + 4,
                    "subtasks": [
                        {
                            "task_desc": "Make coffee",
                            "completed": false,
                            "id": new Date().getTime() + 5,
                        }
                    ]
                },
            ]
        },
        {
            "name": "done",
            "id": new Date().getTime() + 6,
            "colorId": "#00ffc0",
            "tasks": [
                {
                    "title": "Build UI for onboarding flow",
                    "task_desc": "Build UI for onboarding flow",
                    "id": new Date().getTime() + 7,
                    "subtasks": [
                        {
                            "task_desc": "Make coffee",
                            "completed": false,
                            "id": new Date().getTime() + 8,
                        }
                    ]
                },
            ]
        },
    ]
};
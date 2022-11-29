export function generateSkeleton() {
    return ({
        'columns': [
            {
                "name": "todo",
                "id": new Date().getTime(),
                "colorId": "#ff3b65",
            },
            {
                "name": "doing",
                "id": new Date().getTime() + 1,
                "colorId": "#05cffa",
            },
            {
                "name": "done",
                "id": new Date().getTime() + 2,
                "colorId": "#00ffc0",
            },
        ]
    });
}
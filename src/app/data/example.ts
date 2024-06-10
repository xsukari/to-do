export interface Task {
    name: string,
    due: string,
    completed: boolean
}

export interface ToDo {
    date: string,
    tasks: Task[]
}

export const toDos = [
    {
        date: "2024-05-11",
        tasks: [
            {
                name: "clean up counter",
                due: "14:30:00",
                completed: true
            },
            {
                name: "wash clothes",
                due: "15:15:00",
                completed: true
            },
            {
                name: "meet mia",
                due: "17:10:00",
                completed: false
            },
            {
                name: "cook",
                due: "18:45:00",
                completed: false
            },
        ]
    },
    {
        date: "2024-05-15",
        tasks: [
            {
                name: "go grocery shopping",
                due: "19:00:00",
                completed: false
            },
            {
                name: "download more ram",
                due: "20:45:00",
                completed: false
            },
        ]
    },
    {
        date: "2024-05-19",
        tasks: [
            {
                name: "ask how much dedotated wam for minecraft server",
                due: "14:00:00",
                completed: false
            },
            {
                name: "new wallpaper",
                due: "20:45:00",
                completed: false
            },
        ]
    },
]

export const users = [
    {
        name: "user1@example.com",
    },
    {
        name: "user2@example.com",
    },
    {
        name: "user3@example.com",
    },
    {
        name: "user4@example.com",
    },
]
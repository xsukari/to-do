export interface Todo {
    name: string,
    due: string,
    completed: boolean
}

export interface ToDo {
    date: string,
    todos: Todo[]
}

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
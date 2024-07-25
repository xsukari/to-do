export interface RegistrationCredentials {
    email: string
    username: string
    password: string
    passwordConfirmation: string
}

export interface LoginCredentials {
    username: string
    password: string
}

export interface Todo {
    name: string
    due: Date
    reminder: boolean
    done?: boolean
}

export interface TodoGroup {
    date: Date
    todos: Todo[]
}

export interface Settings {
    timeRangePast: string
    timeRangeFuture: string
    alwaysShowIncomplete: boolean
    additionalReminderAfter: number
}

export interface SetSettings {
    timeRangePast?: string
    timeRangeFuture?: string
    alwaysShowIncomplete?: string
    additionalReminderAfter?: string
}
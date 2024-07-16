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
    date: Date
    reminder: boolean
}
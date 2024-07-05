import {
    ColumnType,
    Generated,
    Insertable,
    Selectable,
    Updateable,
} from "kysely"

export interface UserTable {
    id: Generated<number>
    username: string
    email: string
    password: string
    admin: boolean
    updatedAt: ColumnType<Date, string>
    createdAt: ColumnType<Date, string | undefined, never>
}
export type User = Selectable<UserTable>
export type NewUser = Insertable<UserTable>
export type UserUpdate = Updateable<UserTable>
  
export interface TaskTable {
    id: Generated<number>
    userId: number
    name: string
    dueAt: ColumnType<Date, string>
    additionalReminder: boolean
    updatedAt: ColumnType<Date, string>
    createdAt: ColumnType<Date, string | undefined, never>
}
export type Task = Selectable<TaskTable>
export type NewTask = Insertable<TaskTable>
export type TaskUpdate = Updateable<TaskTable>

export interface InviteTable {
    id: Generated<number>
    email: string
    valid: boolean
    registered: boolean
    updatedAt: ColumnType<Date, string>
    createdAt: ColumnType<Date, string | undefined, never>
}
export type Invite = Selectable<InviteTable>
export type NewInvite = Insertable<InviteTable>
export type InviteUpdate = Updateable<InviteTable>

export interface SessionTable {
    id: Generated<number>
    userId: number
    key: string
    expiresAt: ColumnType<Date, string>
    createdAt: ColumnType<Date, string | undefined, never>
}
export type Session = Selectable<SessionTable>
export type NewSession = Insertable<SessionTable>
export type SessionUpdate = Updateable<SessionTable>

export interface Database {
    User: UserTable
    Task: TaskTable
    Invite: InviteTable
    Session: SessionTable
}
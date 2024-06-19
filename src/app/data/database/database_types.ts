import {
    ColumnType,
    Generated,
    Insertable,
    Selectable,
    Updateable,
} from "kysely"

export interface UserTable {
    id: Generated<number>
    name: string
    email: string
    password: string
    admin: boolean
    modified_at: ColumnType<Date, string | undefined>
    created_at: ColumnType<Date, string | undefined, never>
}
export type User = Selectable<UserTable>
export type NewUser = Insertable<UserTable>
export type UserUpdate = Updateable<UserTable>
  
export interface TaskTable {
    id: Generated<number>
    user_id: number
    name: string
    due_at: ColumnType<Date, string | undefined>
    additional_reminder: boolean
    modified_at: ColumnType<Date, string | undefined>
    created_at: ColumnType<Date, string | undefined, never>
}
export type Task = Selectable<TaskTable>
export type NewTask = Insertable<TaskTable>
export type TaskUpdate = Updateable<TaskTable>

export interface InviteTable {
    id: Generated<number>
    email: string
    valid: boolean
    modified_at: ColumnType<Date, string | undefined>
    created_at: ColumnType<Date, string | undefined, never>
}
export type Invite = Selectable<InviteTable>
export type NewInvite = Insertable<InviteTable>
export type InviteUpdate = Updateable<InviteTable>

export interface Database {
    user: UserTable
    task: TaskTable
    invite: InviteTable
}
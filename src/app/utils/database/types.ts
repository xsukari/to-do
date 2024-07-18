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
    updated_at: ColumnType<Date>
    created_at: ColumnType<Date, never, never>
}
export type User = Selectable<UserTable>
export type NewUser = Insertable<UserTable>
export type UserUpdate = Updateable<UserTable>
  
export interface TodoTable {
    id: Generated<number>
    user_id: number
    name: string
    done: ColumnType<boolean, never>
    due_at: ColumnType<Date>
    additional_reminder: boolean
    updated_at: ColumnType<Date>
    created_at: ColumnType<Date, never, never>
}
export type Todo = Selectable<TodoTable>
export type NewTodo = Insertable<TodoTable>
export type TodoUpdate = Updateable<TodoTable>

export interface InviteTable {
    id: Generated<number>
    email: string
    valid: boolean
    registered: boolean
    updated_at: ColumnType<Date>
    created_at: ColumnType<Date, never, never>
}
export type Invite = Selectable<InviteTable>
export type NewInvite = Insertable<InviteTable>
export type InviteUpdate = Updateable<InviteTable>

export interface SessionTable {
    id: Generated<number>
    user_id: number
    key: string
    user_agent: string
    expires_at: ColumnType<Date>
    created_at: ColumnType<Date, never, never>
}
export type Session = Selectable<SessionTable>
export type NewSession = Insertable<SessionTable>
export type SessionUpdate = Updateable<SessionTable>

export interface SettingUserTable {
    id: Generated<number>
    user_id: number
    setting_id: number
    value: string
    updated_at: ColumnType<Date>
    created_at: ColumnType<Date, never, never>
}
export type SettingUser = Selectable<SettingUserTable>
export type NewSettingUser = Insertable<SettingUserTable>
export type SettingUserUpdate = Updateable<SettingUserTable>

export interface SettingTable {
    id: Generated<number>
    name: string
    updated_at: ColumnType<Date>
    created_at: ColumnType<Date, never, never>
}
export type Setting = Selectable<SettingTable>
export type NewSetting = Insertable<SettingTable>
export type SettingUpdate = Updateable<SettingTable>

export interface Database {
    user: UserTable
    todo: TodoTable
    invite: InviteTable
    session: SessionTable
    setting_user: SettingUserTable
    setting: SettingTable
}
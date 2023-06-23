import { User } from "../user.model"

export interface IUserPreferencesRelations {
  user: IUserRelations
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUserRelations {}

export type TUserWithRelations = User & IUserRelations

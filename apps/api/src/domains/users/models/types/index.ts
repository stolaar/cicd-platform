import { User } from "../user.model"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUserRelations {
  // describe navigational properties here
}

export type TUserWithRelations = User & IUserRelations

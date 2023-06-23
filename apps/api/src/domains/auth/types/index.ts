export interface IUserPayload {
  email: string
  password: string
}
export interface IResetPassword {
  email: string
}

export interface ICheckCode {
  email: string
  pin: number
}
export interface IPassword {
  email: string
  pin: number
  password: string
}

import { Status } from './status.type'
export interface User {
  fullname: string
  address: string
  phone: string
  email: string
  password: string
}

export interface UserLogin {
  email: string
  password: string
}
export interface LoginResponse extends Status {
  user: object
  accessToken: string
}

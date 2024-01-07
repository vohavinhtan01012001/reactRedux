import { Status } from './status.type'
export interface User {
  id: number
  name: string
  address: string
  phone: string
  email: string
  password: string
}

export interface UserLogin {
  username: string
  password: string
}
export interface LoginResponse extends Status {
  user: object
  accessToken: string
}

export interface UserRegister {
  name: string
  address: string
  username: string
  phone: string
  email: string
  password: string
}

export interface UserPayment {
  name: string
  address: string
  phone: string
  email: string
  note: string
  pay: number
}

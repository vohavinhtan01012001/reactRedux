import { Status } from './status.type'
export interface User {
  id: number
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

export interface UserRegister {
  fullname: string
  address: string
  phone: string
  email: string
  password: string
}

export interface UserPayment {
  fullname: string
  address: string
  phone: string
  email: string
  note: string
  pay: number
}

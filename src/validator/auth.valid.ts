import * as Yup from 'yup'

export const signUpValidationSchema = Yup.object({
  name: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  username: Yup.string().required('Username is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  phone: Yup.string().min(10).required('Phone number is required'),
  address: Yup.string().required('Address is required')
})

export const signInValidationSchema = Yup.object({
  username: Yup.string().required('username is required'),
  password: Yup.string().required('Password is required')
})

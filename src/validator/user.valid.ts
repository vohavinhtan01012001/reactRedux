import * as Yup from 'yup'
export const userValidationSchema = Yup.object({
  fullname: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().min(10).required('Phone number is required'),
  address: Yup.string().required('Address is required')
})

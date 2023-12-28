import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { RootState, useAppDispatch } from 'store'
import { toast } from 'react-toastify'
import { register } from '../../../api/admin/auth.api'
import { signUpValidationSchema } from 'validator/auth.valid'
function Register() {
  const dispatch = useAppDispatch()
  const initialValuesSignUp = {
    fullname: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  }

  const [confirmPassword, setConfirmPassword] = useState('')

  const formik = useFormik({
    initialValues: initialValuesSignUp,
    validationSchema: signUpValidationSchema,
    onSubmit: (values) => {
      if (values.password !== confirmPassword) {
        toast.error('The entered password does not match', {
          position: toast.POSITION.TOP_RIGHT
        })
        return
      }
      dispatch(register(values))
      /*  if (statusUser.statusCode === 1) {
        toast.success(statusUser.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      } else {
        toast.error(statusUser.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      } */
    }
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit} className='auth-form'>
        <label>Full Name</label>
        <input
          type='text'
          name='fullname'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fullname}
        />
        {formik.touched.fullname && formik.errors.fullname ? (
          <div className='text-sm text-red-600'>{formik.errors.fullname}</div>
        ) : null}
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className='text-sm text-red-600'>{formik.errors.password}</div>
        ) : null}
        <label>Email </label>

        <input
          type='email'
          name='email'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className='text-sm text-red-600'>{formik.errors.email}</div>
        ) : null}
        <label>Confirm Password</label>
        <input type='password' name='confirmPassword' onChange={(e) => setConfirmPassword(e.target.value)} />
        <label>Phone Number</label>
        <input
          type='text'
          name='phone'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div className='text-sm text-red-600'>{formik.errors.phone}</div>
        ) : null}
        <label>Address</label>
        <input
          type='text'
          name='address'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address}
        />
        {formik.touched.address && formik.errors.address ? (
          <div className='text-sm text-red-600'>{formik.errors.address}</div>
        ) : null}
        <button>Sign Up</button>
      </form>
    </>
  )
}

export default Register

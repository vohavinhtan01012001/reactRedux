import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { RootState, useAppDispatch } from 'store'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styles from '../auth.module.scss'
import { register } from '../auth.api'
import { useNavigate } from 'react-router-dom'

const signUpValidationSchema = Yup.object({
  fullname: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  phone: Yup.string().min(10).required('Phone number is required'),
  address: Yup.string().required('Address is required')
})

function Register() {
  const statusUser = useSelector((state: RootState) => state.user.statusUser)
  const dispatch = useAppDispatch()
  const initialValuesSignUp = {
    fullname: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  }

  const [confirmPassword, setConfirmPassword] = useState('')
 /*  useEffect(() => {
    if (statusUser.message !== '') {
      if (statusUser.statusCode === 1) {
        toast.success(statusUser.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      } else {
        toast.error(statusUser.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      }
    }
  }, [dispatch, statusUser.message, statusUser.statusCode]) */

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
      <form onSubmit={formik.handleSubmit} className={styles['auth-form']}>
        <h2>Time to feel like home</h2>
        <div className={`flex justify-between ${styles['auth-form-fields']}`}>
          <div>
            <label>
              <span>Full Name</span>
              <input
                type='text'
                name='fullname'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fullname}
              />
              {formik.touched.fullname && formik.errors.fullname ? (
                <div className={styles.error}>{formik.errors.fullname}</div>
              ) : null}
            </label>
            <label>
              <span>Password</span>
              <input
                type='password'
                name='password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className={styles.error}>{formik.errors.password}</div>
              ) : null}
            </label>
          </div>

          <div>
            <label>
              <span>Email</span>
              <input
                type='email'
                name='email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className={styles.error}>{formik.errors.email}</div>
              ) : null}
            </label>
            <label>
              <span>Confirm Password</span>
              <input type='password' name='confirmPassword' onChange={(e) => setConfirmPassword(e.target.value)} />
            </label>
          </div>
        </div>
        <div className={`flex justify-between ${styles['auth-form-fields']}`}>
          <div>
            <label>
              <span>Phone Number</span>
              <input
                type='text'
                name='phone'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
            </label>
            <label>
              {formik.touched.phone && formik.errors.phone ? (
                <div className={styles.error}>{formik.errors.phone}</div>
              ) : null}
            </label>
          </div>
          <div>
            <label>
              <span>Address</span>
              <input
                type='text'
                name='address'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
              />
            </label>
            <label>
              {formik.touched.address && formik.errors.address ? (
                <div className={styles.error}>{formik.errors.address}</div>
              ) : null}
            </label>
          </div>
        </div>
        <button type='submit' className={styles.submit}>
          Sign Up
        </button>
        <button type='button' className={styles['fb-btn']}>
          Join with <span>Facebook</span>
        </button>
      </form>
    </>
  )
}

export default Register

import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { RootState, useAppDispatch } from 'store'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import styles from '../auth.module.scss' // Import CSS
import { login } from '../auth.api'

const signInValidationSchema = Yup.object({
  email: Yup.string().required('email is required'),
  password: Yup.string().required('Password is required')
})

function Login() {
  const loginResponse = useSelector((state: RootState) => state.user.loginResponse)
  const dispatch = useAppDispatch()
  const initialValuesSignIn = {
    email: '',
    password: ''
  }

  const formik = useFormik({
    initialValues: initialValuesSignIn,
    validationSchema: signInValidationSchema,
    onSubmit: async (values) => {
      await dispatch(login(values))
      Cookies.get('accessToken', loginResponse.accessToken)
      /*   if (loginResponse.statusCode === 1) {
        toast.success(loginResponse.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      } else {
        toast.error(loginResponse.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      } */
    }
  })

  return (
    <div className={`${styles['form']} ${styles['sign-in']}`}>
      <form onSubmit={formik.handleSubmit}>
        <h2>Welcome back,</h2>
        <label>
          <span>email</span>
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
        <p className={styles['forgot-pass']}>Forgot password?</p>
        <button type='submit' className={styles.submit}>
          Sign In
        </button>
        <button type='button' className={styles['fb-btn']}>
          Connect with <span>Facebook</span>
        </button>
      </form>
    </div>
  )
}

export default Login

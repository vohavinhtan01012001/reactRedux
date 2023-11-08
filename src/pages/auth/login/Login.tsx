import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch } from 'store'
import styles from '../auth.module.scss' // Import CSS
import { login } from '../../../api/auth.api'
import { useNavigate } from 'react-router-dom'
import { signInValidationSchema } from 'validaton/auth.valid'

function Login() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const initialValuesSignIn = {
    email: '',
    password: ''
  }

  const formik = useFormik({
    initialValues: initialValuesSignIn,
    validationSchema: signInValidationSchema,
    onSubmit: async (values) => {
      await dispatch(login(values)).then((action) => {
        if (action.payload.statusCode === 1) {
          navigate('/admin/categories')
        }
      })
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

import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useAppDispatch } from 'store'
import { login } from '../../../api/admin/auth.api'
import { useNavigate } from 'react-router-dom'
import { signInValidationSchema } from 'validator/auth.valid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

function Login() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const initialValuesSignIn = {
    username: '',
    password: ''
  }

  const formik = useFormik({
    initialValues: initialValuesSignIn,
    validationSchema: signInValidationSchema,
    onSubmit: (values) => {
      dispatch(login(values)).then((action: any) => {
        if (action.payload?.statusCode === 1) {
          navigate('/admin')
        }
      })
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <h1 className='text-lg'>Sign in</h1>
      <div className='social-container'>
        <a href='#' className='social'>
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
        <a href='#' className='social'>
          <FontAwesomeIcon icon={faGoogle} />
        </a>
        <a href='#' className='social'>
          <FontAwesomeIcon icon={faLinkedinIn} />
        </a>
      </div>
      <label className='text-base'>username</label>
      <input
        className='outline-none'
        type='username'
        name='username'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.username}
      />
      {formik.touched.username && formik.errors.username ? (
        <div className='text-sm text-red-600'>{formik.errors.username}</div>
      ) : null}
      <label className='text-base'>Password</label>
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
      <a href='#'>Forgot your password?</a>
      <button>Sign In</button>
    </form>
  )
}

export default Login

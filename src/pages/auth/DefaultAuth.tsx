import React, { useState } from 'react'
import styles from './auth.module.scss'
import Login from './login'
import Register from './register'
import { ToastContainer } from 'react-toastify'

function DefaultAuth() {
  const [isSignUp, setIsSignUp] = useState(false)

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp)
  }

  const containerClass = isSignUp
    ? `${styles.cont} ${styles['s--signup']} ${styles['rounded-lg']}`
    : `${styles.cont} ${styles['rounded-lg']}`
  const imgTextClass = isSignUp
    ? `${styles['img__text']} ${styles['m--up']} ${styles['s--signup']}`
    : `${styles['img__text']} ${styles['m--in']}`
  const btnUpClass = isSignUp ? `${styles['m--up']}` : `${styles['hidden']}`
  const btnInClass = isSignUp ? `${styles['hidden']}` : `${styles['m--in']}`

  return (
    <div>
      <p className={`${styles.tip} ${styles['h-7']}`}></p>
      <div className={containerClass}>
        {isSignUp ? '' : <Login />}
        <div className={styles['sub-cont']}>
          <div className={styles['img']}>
            <div className={imgTextClass}>
              <h2>New here?</h2>
              <p>Sign up and discover a great amount of new opportunities!</p>
            </div>
            <div className={`${styles['img__text']} ${styles['m--in']}`}>
              <h2>One of us?</h2>
              <p>If you already have an account, just sign in. We've missed you!</p>
            </div>
            <div className={styles['img__btn']} onClick={toggleSignUp}>
              <span className={btnUpClass}>Sign Up</span>
              <span className={btnInClass}>Sign In</span>
            </div>
          </div>
          <div
            className={`${styles['form']} ${isSignUp ? styles['sign-up'] : styles['sign-in']} ${
              isSignUp ? '' : styles['inactive']
            }`}
          >
            {isSignUp ? <Register /* setClick={setClick} click={click} */ /> : ''}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DefaultAuth

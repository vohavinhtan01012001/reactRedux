import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { paymentVnpayCheck } from 'api/client/orderClient.api'
import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from 'store'

export default function Thanks() {
  const dispatch = useAppDispatch()
  const vnp_Params = window.location.search
  const paramsString = vnp_Params.slice(vnp_Params.indexOf('?') + 1)
  const paramsArray = paramsString.split('&').map((param) => {
    const [key, value] = param.split('=')
    return { [key]: decodeURIComponent(value) }
  })
  const mergedParams = paramsArray.reduce((merged, param) => {
    return { ...merged, ...param }
  }, {})
  useEffect(() => {
    const user = Cookies.get('user')
    const users = user ? JSON.parse(user) : []
    const cart = Cookies.get('cart')
    const carts = cart ? JSON.parse(cart) : []
    if (users != null && carts != null) {
      dispatch(paymentVnpayCheck({ user: users, cart: carts, vnp_Params: mergedParams }))
    }
  }, [dispatch, mergedParams])
  return (
    <React.Fragment>
      <div className='app__container'>
        <div className='wide grid'>
          <div className='row'>
            <div className='app__container--category'>
              <Link to='/' className='app__container--link'>
                Trang chủ
              </Link>
              <FontAwesomeIcon icon={faChevronRight} />
              <p className='app__container--text'>Thanks</p>
            </div>
          </div>
          <div className=''>
            <div className='app__container--formLogin' style={{ color: '#146791', width: '100%', textAlign: 'center' }}>
              {localStorage.getItem('accessToken') ? (
                <div>
                  <h1>Chúng tôi sẽ gửi thông tin đơn hàng qua email cho bạn</h1>
                </div>
              ) : (
                ''
              )}
              <h1>Cảm ơn bạn đã tin tưởng đặt hàng của chúng tôi!</h1>
              <div>
                <h1>
                  Nếu muốn hủy đơn bạn có thể liên lạc với chúng tôi bằng số điện thoại:
                  <h1 style={{ color: 'red' }}> 0378189209</h1>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

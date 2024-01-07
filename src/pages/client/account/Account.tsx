import { faArrowRightFromBracket, faChevronRight, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { getUserClient } from 'api/admin/user.api'
import { RootState, useAppDispatch } from 'store'
import { useSelector } from 'react-redux'
import { showOrderOfUser } from 'api/client/orderClient.api'
import ButtonCusTom from 'component/button'

function Account() {
  const user = useSelector((state: RootState) => state.orderClient.user)
  const orderItem = useSelector((state: RootState) => state.orderClient.order)

  const history = useNavigate()
  const [order, setOrder] = useState([])
  const dispatch = useAppDispatch()
  useEffect(() => {
    const promise = dispatch(showOrderOfUser())

    return () => {
      promise.abort()
    }
  }, [dispatch])

  const logoutSubmit = (e: any) => {}

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
              <p className='app__container--text'>Tài khoản</p>
            </div>
          </div>
          <div className='row'>
            <div className='app__container--heading'>
              <h2 className='heading__text'>Tài khoản của bạn</h2>
              <button type='button' onClick={logoutSubmit} className='heading__exit'>
                <div className='heading__exit--icon'>
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </div>
                <p className='heading__exit--text' style={{ marginBottom: '0' }}>
                  Đăng xuất
                </p>
              </button>
            </div>
          </div>
          <div className='grid grid-cols-5 gap-2'>
            <div className='col-span-3'>
              <h2 style={{ fontWeight: 'bold', paddingTop: '20px', paddingBottom: '20px' }}>Danh sách đơn hàng</h2>
              {orderItem.map((item, index) => {
                return (
                  <div key={index} className='app__container-product' style={{ marginBottom: '20px' }}>
                    <div
                      style={{
                        fontWeight: 'bold',
                        paddingLeft: '20px',
                        paddingBottom: '20px',
                        color: '#333',
                        display: 'block'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ fontWeight: 'bold', marginRight: '10px' }}>Đơn hàng {index + 1} </h2>

                        {item.cancelOrder == 1 ? (
                          <p className='text-sm' style={{ color: 'red', fontWeight: 'bold' }}>
                            Đã hủy đơn
                          </p>
                        ) : item.status === 0 ? (
                          <p className='text-sm' style={{ color: 'red', fontWeight: 'bold' }}>
                            Chờ xác nhận
                          </p>
                        ) : (item.status === 1 || item.status === 2) && item.delivery === 0 ? (
                          <p className='text-sm' style={{ color: '#ff0e0e', fontWeight: 'bold' }}>
                            Chưa vận chuyển
                          </p>
                        ) : (item.status === 1 || item.status === 2) && item.delivery === 1 ? (
                          <p className='text-sm' style={{ color: '#2723ff', fontWeight: 'bold' }}>
                            Đang vận chuyển...
                          </p>
                        ) : (item.status === 1 || item.status === 2) && item.delivery === 2 ? (
                          <p className='text-sm' style={{ color: '#0ccf0f', fontWeight: 'bold' }}>
                            Đã vận chuyển
                          </p>
                        ) : (
                          ''
                        )}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ fontWeight: 'bold', marginRight: '10px' }}></h2>
                        {item.cancelOrder == 1 ? (
                          ''
                        ) : item.pay === 2 ? (
                          <p className='text-sm' style={{ color: '#0ccf0f', fontWeight: 'bold' }}>
                            Đã thanh toán
                          </p>
                        ) : (
                          <p className='text-sm' style={{ color: 'red', fontWeight: 'bold' }}>
                            Chưa thanh toán
                          </p>
                        )}
                      </div>
                      <div className='container__account-name' style={{ fontWeight: 'bold', color: '#333' }}>
                        <span>Mã đơn hàng </span>
                        <span>:</span>
                        <span>{item.id}</span>
                      </div>
                      <div className='container__account-name' style={{ fontWeight: 'bold', color: '#333' }}>
                        <span>Phương thức thanh toán </span>
                        <span>:</span>
                        <span>{item.pay == 2 ? 'VNPAY' : 'COD'}</span>
                      </div>
                      <div className='container__account-name' style={{ fontWeight: 'bold', color: '#333' }}>
                        <span>Tên người nhận </span>
                        <span>:</span>
                        <span>{item.fullname}</span>
                      </div>
                      <div className='container__account-name' style={{ fontWeight: 'bold', color: '#333' }}>
                        <span>Địa chỉ người nhận </span>
                        <span>:</span>
                        <span>{item.address}</span>
                      </div>
                      <div className='container__account-name' style={{ fontWeight: 'bold', color: '#333' }}>
                        <span>Số điện thoại </span>
                        <span>:</span>
                        <span>{item.phone}</span>
                      </div>
                    </div>
                    <Link
                      to={`/order/${item.id}`}
                      className='container__account-name'
                      style={{ fontWeight: 'bold', color: '#333', textAlign: 'end', textDecoration: 'none' }}
                    >
                      <span className='app_container-edit--text'>Xem chi tiết</span>
                    </Link>
                  </div>
                )
              })}
            </div>
            <div className='col-span-2'>
              <h2 style={{ fontWeight: 'bold', paddingTop: '20px', paddingBottom: '20px' }}>Thông tin của bạn</h2>
              <div className='app_container-account'>
                <div
                  className='container__account-name'
                  style={{ fontWeight: 'bold', paddingTop: '20px', color: '#333' }}
                >
                  <span>Họ tên </span>
                  <span>:</span>
                  <span>{user.name}</span>
                </div>
                <div
                  className='container__account-name'
                  style={{ fontWeight: 'bold', paddingTop: '20px', color: '#333' }}
                >
                  <span>Email </span>
                  <span>:</span>
                  <span>{user.email}</span>
                </div>
                <div
                  className='container__account-name'
                  style={{ fontWeight: 'bold', paddingTop: '20px', color: '#333' }}
                >
                  <span>Địa chỉ </span>
                  <span>:</span>
                  <span>{user.address}</span>
                </div>
                <div
                  className='container__account-name'
                  style={{ fontWeight: 'bold', paddingTop: '20px', color: '#333' }}
                >
                  <span>Điện thoại </span>
                  <span>:</span>
                  <span>{user.phone}</span>
                </div>
                <Link to={`/address/`} className='app_container-edit'>
                  <div className='app_container-edit--text'>Chỉnh sửa</div>
                  <div className='app_container-edit--icon'>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </div>
                </Link>
              </div>
              <div className='float-right my-4'>
                <ButtonCusTom
                  label='Danh sách yêu thích'
                  length='longs'
                  onClick={() => history('/favourite')}
                  type='button'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Account

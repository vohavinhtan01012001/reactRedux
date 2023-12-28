import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { showOrderItemOfOrder } from 'api/client/orderClient.api'
import CurrencyFormatter from 'component/currencyFormatter'
import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { RootState, useAppDispatch } from 'store'
import Swal from 'sweetalert2'
function OrderItems() {
  const history = useNavigate()
  const orderItem = useSelector((state: RootState) => state.orderClient.orderItem)
  const dispatch = useAppDispatch()
  const { id } = useParams()
  useEffect(() => {
    if (id) {
      const ids = parseInt(id)
      const promise = dispatch(showOrderItemOfOrder(ids))

      return () => {
        promise.abort()
      }
    }
  }, [dispatch, id])

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
              <Link to='/account' className='app__container--link'>
                Tài khoản
              </Link>
              <FontAwesomeIcon icon={faChevronRight} />
              <p className='app__container--text'>Đơn hàng</p>
            </div>
          </div>
          <h1 className='my-2 text-lg font-bold'>Danh sách chi tiết đơn hàng: {id}</h1>
          <div className='grid grid-cols-3 gap-2'>
            <div className='col-span-2'>
              {orderItem?.map((item, index) => {
                return (
                  <div key={index} className='app__container-product' style={{ marginBottom: '20px' }}>
                    <nav className='cart__product--item' style={{ padding: '0 20px', borderBottom: 'none' }}>
                      <div>
                        <div className='cart__product--link2'>
                          <img
                            src={item.Product.image}
                            alt=''
                            className='cart__product--img'
                            style={{ width: '80px', borderRadius: '10px' }}
                          />
                          <p className='cart_product--link--text'>{item.quantity}</p>
                        </div>
                      </div>
                      <div className='cart__product--content'>
                        <div className='cart__product--contentRight'>
                          <Link
                            to={`/${item.Product.Category.name}/${item.productId}`}
                            className='cart__product--name'
                            style={{ color: '#333' }}
                          >
                            {item.Product.name}
                          </Link>
                          <p className='cart__product--size' style={{ color: '#333' }}>
                            Kích thước: {item.Product.Size.name}
                          </p>
                        </div>
                        <div className='cart__product--contentLeft'>
                          <p className='cart__product--money' style={{ color: '#333' }}>
                            {CurrencyFormatter(item.sumPrice)}
                          </p>
                        </div>
                      </div>
                    </nav>
                  </div>
                )
              })}
            </div>
            {/* <div className='col-lg-4 col-md-12 col-xs-12 pd5'>{display_ship}</div> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default OrderItems

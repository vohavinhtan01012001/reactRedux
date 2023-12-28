import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { showCart } from 'slice/client/productClient.slice'
import { RootState, useAppDispatch } from 'store'
import ItemCart from './ItemCart'
import CurrencyFormatter from 'component/currencyFormatter'
import Cookies from 'js-cookie'
import { showCartClient } from 'api/client/productClient.api'

export default function Cart() {
  const dispatch = useAppDispatch()
  const cart = useSelector((state: RootState) => state.productClient.cart)
  const sumPriceCart = useSelector((state: RootState) => state.productClient.sumPriceCart)
  useEffect(() => {
    const dataFromCookie = Cookies.get('cart')
    const listCart = dataFromCookie ? JSON.parse(dataFromCookie) : []
    const promise = dispatch(showCartClient(listCart))

    return () => {
      promise.abort()
    }
  }, [dispatch])
  console.log(cart)
  const history = useNavigate()
  return (
    <>
      <div className='app__container'>
        <div className='wide grid'>
          <div className='row'>
            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 pd5'>
              <div className='app__container--category'>
                <Link to='/' className='app__container--link'>
                  Trang chủ
                </Link>
                <FontAwesomeIcon icon={faChevronRight} />
                <p className='app__container--text'>Giỏ hàng</p>
              </div>
            </div>
          </div>
        </div>
        <div className='app__container--cart'>
          <div className='wide grid'>
            <div className='row'>
              <div className='grid grid-cols-3 gap-4'>
                <div className='cart__product col-span-2'>
                  {cart.length > 0 &&
                    cart?.map((item, index) => {
                      return <ItemCart item={item} index={index} />
                    })}
                  {cart.length <= 0 && <h1 className='pr-4 text-xl text-red-600 '>Shopping cart is empty</h1>}
                </div>
                {cart.length > 0 && (
                  <div>
                    <div className='cart__order'>
                      <div className='cart__order--item'>
                        <div className='cart__order--content'>
                          <span className='cart__order--textMoney'>Tổng tiền:</span>
                          <span className='cart__order--price pl-3 text-lg'>{CurrencyFormatter(sumPriceCart)}</span>
                        </div>
                        <div className='cart__order--paying' style={{ background: 'red', border: 'none' }}>
                          <button
                            className='cart__order--link'
                            style={{ color: 'white', width: '100%', background: 'red', border: 'none' }}
                            onClick={() => history('/pay')}
                          >
                            THANH TOÁN
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className='cart__other'>
                <Link to='/' className='cart__other--text'>
                  TIẾP TỤC MUA SẢN PHẨM KHÁC
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

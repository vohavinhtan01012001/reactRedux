import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Input, Radio } from 'antd'
import { getUserClient } from 'api/admin/user.api'
import ButtonCusTom from 'component/button'
import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik'
import Cookies from 'js-cookie'
import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Link, useNavigate } from 'react-router-dom'
import { RootState, useAppDispatch } from 'store'
import { userValidationSchema } from 'validator/user.valid'
import ProductItem from './ProductItem'
import { showCart } from 'slice/client/productClient.slice'
import CurrencyFormatter from 'component/currencyFormatter'
import { showCartClient } from 'api/client/productClient.api'
import { paymentCod, paymentVnpay } from 'api/client/orderClient.api'

function Pay() {
  const history = useNavigate()
  const dispatch = useAppDispatch()
  const cart = useSelector((state: RootState) => state.productClient.cart)
  const sumPriceCart = useSelector((state: RootState) => state.productClient.sumPriceCart)

  useEffect(() => {
    const dataFromCookie = Cookies.get('cart')
    const listCart = dataFromCookie ? JSON.parse(dataFromCookie) : []
    dispatch(showCartClient(listCart))
  }, [dispatch])

  const initialValues = {
    name: '',
    address: '',
    phone: '',
    note: '',
    email: '',
    pay: 1
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: userValidationSchema,
    onSubmit: (values) => {
      const dataCart = []
      console.log(values)
      for (const cartItem of cart) {
        dataCart.push({ id: cartItem.id, quantityCart: cartItem.quantityCart, priceCart: cartItem.priceCart })
      }
      if (values.pay == 1) {
        dispatch(paymentCod({ user: values, cart: dataCart })).then((action: any) => {
          history('/')
        })
      }
      if (values.pay == 2) {
        dispatch(paymentVnpay({ user: values, cart: dataCart })).then((action: any) => {
          if (action.payload) {
            window.location.href = action.payload
          }
        })
      }
    }
  })

  const handleForm = () => {
    dispatch(getUserClient()).then((action: any) => {
      formik.setValues({
        ...formik.values,
        address: action.payload.user.address || '',
        name: action.payload.user.name || '',
        phone: action.payload.user.phone || '',
        email: action.payload.user.email || ''
      })
    })
  }
  return (
    <React.Fragment>
      <div className='container mx-auto px-4' style={{ paddingTop: '40px' }}>
        <div className='grid grid-cols-5 gap-8'>
          <div className='col-span-3'>
            <div className='main-header'>
              <Link to='/' className='logo' style={{ textDecoration: 'none', color: 'black' }}>
                <h1 className='logo-text text-2xl '>THANH TOÁN</h1>
              </Link>
              <ul className='breadcrumb flex items-center justify-start py-5'>
                <li className='breadcrumb-item pr-2 '>
                  <Link to='/cart' className='text-blue-600' style={{ textDecoration: 'none' }}>
                    Giỏ hàng
                  </Link>
                </li>
                <FontAwesomeIcon icon={faChevronRight} />
                <li className='breadcrumb-item breadcrumb-item-current pl-2'>Thông tin giao hàng</li>
              </ul>
              {Cookies.get('cart') && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <button
                    onClick={handleForm}
                    className='mr-4 rounded-md bg-sky-500 px-5 py-2.5 text-sm font-semibold leading-5 text-white hover:bg-sky-700'
                  >
                    Lấy thông tin của bạn
                  </button>
                </div>
              )}
              <form onSubmit={formik.handleSubmit} style={{ marginTop: '20px' }}>
                <div className='grid grid-cols-2 gap-2'>
                  <div>
                    <span>Họ và tên</span>
                    <Input
                      type='text'
                      name='name'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div className='text-sm text-red-500'>{formik.errors.name}</div>
                    ) : null}
                  </div>
                  <div className='fs-4 text form-group mb-3'>
                    <label>Địa chỉ người nhận</label>
                    <Input
                      type='address'
                      name='address'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.address}
                    />
                    {formik.touched.address && formik.errors.address ? (
                      <div className='text-sm text-red-500'>{formik.errors.address}</div>
                    ) : null}
                  </div>
                  <div className='fs-4 text form-group mb-3 '>
                    <label>Số điện thoại</label>
                    <Input
                      type='phone'
                      name='phone'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone}
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                      <div className='text-sm text-red-500'>{formik.errors.phone}</div>
                    ) : null}
                  </div>
                  <div className='fs-4 text form-group mb-3 '>
                    <label>Email</label>
                    <Input
                      type='email'
                      name='email'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className='text-sm text-red-500'>{formik.errors.email}</div>
                    ) : null}
                  </div>
                </div>
                <div className='cart__note'>
                  <h2 className='cart__note--text'>Ghi chú đơn hàng</h2>
                  <textarea
                    name='note'
                    id='txtComment'
                    className='h-24 px-3 py-1'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.note}
                  />
                </div>
                <div className='ship' style={{ paddingTop: '30px' }}>
                  <h2>Phương thức thanh toán</h2>
                  <div className='ship_content fs-4 text' style={{ display: 'flex' }}>
                    <Radio.Group
                      name='pay'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.pay}
                    >
                      <Radio value={1} className='px-4'>
                        COD
                      </Radio>
                      <Radio value={2} className='px-4'>
                        VNPAY
                      </Radio>
                    </Radio.Group>
                  </div>
                </div>
                <div className='ship' style={{ paddingTop: '30px' }}>
                  <h2>Phương thức vận chuyển</h2>
                  <div className='ship_content fs-4 text'>
                    <p className='ship_content--text'>
                      1. Khi click vào nút hoàn tất đơn hàng thì đơn hàng sẽ được nhân viên xác nhận qua gọi điện thoại,
                      nếu thông tin địa chỉ và số điện thoại chính xác thì đơn hàng sẽ được vận chuyển từ 3-4-5 ngày tùy
                      vùng miền.
                    </p>
                    <p>
                      {' '}
                      2. Trường hợp đặt hàng xong nhưng muốn HỦY ĐƠN, vui lòng soạn tin nhắn theo cú pháp: SĐT ĐÃ ĐẶT
                      ĐƠN (hoặc MÃ ĐƠN hoặc GMAIL ĐƠN HÀNG) + TÊN NGƯỜI NHẬN sau đó gửi qua các kênh online: Page
                      Facebook, Intagram. Nhân viên check tin nhắn sẽ xử lý hủy giúp Quý KH.
                    </p>
                  </div>
                </div>
                <div className='py-4'>
                  <ButtonCusTom label='Thanh toán' length='long' onClick={undefined} type='submit' />
                </div>
              </form>
            </div>
          </div>
          <div className='col-span-2 p-8' style={{ boxShadow: '1px 0 0 #e1e1e1 inset' }}>
            {cart?.length > 0 &&
              cart.map((item, index) => {
                return <ProductItem item={item} index={index} />
              })}
            <div className='pay__product' style={{ paddingTop: '10px' }}>
              <div className='pay__product--item fs-4 text'>
                <p>Tạm tính</p>
                <p>Phí vận chuyển</p>
              </div>
              <div className='pay__product--item fs-4 text'>
                <p>{CurrencyFormatter(sumPriceCart)}</p>
                <p>{CurrencyFormatter(30000)}</p>
              </div>
            </div>
            <div className='pay__product' style={{ borderBottom: 'none', paddingTop: '10px' }}>
              <div className='pay__product--item fs-4 text'>
                <h2 style={{ fontWeight: 'bold' }}>Tổng tiền</h2>
              </div>
              <div className='pay__product--item fs-4 text'>
                <h2 style={{ fontWeight: 'bold' }}>{CurrencyFormatter(sumPriceCart + 30000)}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Pay

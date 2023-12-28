import { CloseOutlined, CloseSquareFilled } from '@ant-design/icons'
import CurrencyFormatter from 'component/currencyFormatter'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { decrementQuantity, deleteCartItem } from 'slice/client/productClient.slice'
import { RootState, useAppDispatch } from 'store'
import Swal from 'sweetalert2'
import { Cart } from 'types/cart.type'

interface PropsCart {
  item: Cart
  index: number
}

export default function ItemCart({ item, index }: PropsCart) {
  const dispatch = useAppDispatch()

  return (
    <nav key={index} className='cart__product--item'>
      <div>
        <Link to={`/${item.Category.name}/${item.id}`} className='cart__product--link'>
          <img src={item.image} alt='' className='cart__product--img' />
        </Link>
      </div>
      <div className='cart__product--content'>
        <div className='cart__product--contentRight px-3'>
          <Link to={`/${item.Category.name}/${item.id}`} className='cart__product--name'>
            {item.name}
          </Link>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
              marginTop: '10px',
              fontSize: '13px'
            }}
          >
            <p style={{ marginRight: '20px' }}>
              <span style={{ fontWeight: 'bold' }}>Kích thước: </span>
              {item.Size.name}
            </p>
            <p style={{ marginRight: '20px' }}>
              <span style={{ fontWeight: 'bold' }}>Số lượng: </span>
              {item.quantity}
            </p>
          </div>
          <div className='cart__product--price'>
            {item.promotionId ? (
              <>
                <p className='cart__product--priceNow'>{CurrencyFormatter(item.priceReduced)}</p>
                <del>{CurrencyFormatter(item.price)}</del>
              </>
            ) : (
              <p className='cart__product--priceNow'>{CurrencyFormatter(item.price)}</p>
            )}
          </div>
          <div className='input-group fs-4 text'>
            <input
              type='button'
              value='-'
              onClick={() => dispatch(decrementQuantity({ id: item.id, scope: 'dec' }))}
              className='qty-btn'
            />
            <div className='qty-btn fs-4 text lh-lg p-2 text-center'>{item.quantityCart}</div>
            <input
              type='button'
              value='+'
              onClick={() => dispatch(decrementQuantity({ id: item.id, scope: 'inc' }))}
              className='qty-btn'
            />
          </div>
        </div>
        <div className='cart__product--contentLeft'>
          <div
            onClick={(e) => {
              Swal.fire({
                title: 'Bạn có chắc muốn xóa không?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Đồng ý!',
                cancelButtonText: 'Đóng'
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(deleteCartItem({ id: item.id }))
                }
              })
            }}
            className='cart__product--delete'
            style={{ cursor: 'pointer', color: 'red' }}
          >
            <CloseSquareFilled rev='someValue' className='rounded-xl text-lg' />
          </div>

          <div className='cart__product--money'>{CurrencyFormatter(item.priceCart)}</div>
        </div>
      </div>
    </nav>
  )
}

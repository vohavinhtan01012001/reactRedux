import CurrencyFormatter from 'component/currencyFormatter'
import React from 'react'
import { Cart } from 'types/cart.type'

interface PropsProduct {
  item: Cart
  index: number
}

export default function ProductItem({ item, index }: PropsProduct) {
  return (
    <nav key={index} className='cart__product--item' style={{ paddingTop: '20px' }}>
      <div>
        <div className='cart__product--link2'>
          <img src={item.image} alt='' className='cart__product--img' style={{ width: '80px', borderRadius: '10px' }} />
          <p className='cart_product--link--text'>{item.quantityCart}</p>
        </div>
      </div>
      <div className='cart__product--content'>
        <div className='cart__product--contentRight'>
          <div className='cart__product--name' style={{ color: '#737373' }}>
            {item.name}
          </div>
          <div className='d-flex' style={{ justifyContent: 'space-between' }}>
            <p className='cart__product--size' style={{ color: '#737373' }}>
              {item.Size.name}
            </p>
          </div>
        </div>
        <div className='cart__product--contentLeft'>
          <p className='cart__product--money' style={{ color: '#737373' }}>
            {CurrencyFormatter(item.priceCart)}
          </p>
        </div>
      </div>
    </nav>
  )
}

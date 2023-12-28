import { faChevronRight, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RootState, useAppDispatch } from 'store'
import { useSelector } from 'react-redux'
import { searchProduct } from 'api/admin/product.api'
import ProductItem from 'component/productItem/ProductItem'

function Search() {
  const [product, setProduct] = useState([])
  const productList = useSelector((state: RootState) => state.product.productList)

  const dispatch = useAppDispatch()
/*   useEffect(() => {
    if (message != '') {
      dispatch(searchProduct(message))
    }
  }, [message, dispatch]) */

  return (
    <>
      <div className='app__container'>
        <div className='wide grid'>
          <div className='row'>
            <div className='app__container--category'>
              <Link to='/' className='app__container--link'>
                Trang chủ
              </Link>
              <FontAwesomeIcon icon={faChevronRight} />
              <div className='app__container--link'>Tìm kiếm</div>
            </div>
          </div>
        </div>
        <div className='wide grid'>
          <div className='row'>
           {/*  <div className='col'>
              <div className='tshirts__title'>
                <h3 className='tshirts__title--heading'>Tìm kiếm: {message != '' ? message : ''}</h3>
              </div>
              <div className='tshirts__content'>
                <div className='row'>
                  {productList.map((item, index) => {
                    return <ProductItem data={item} index={index} />
                  })}
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Search

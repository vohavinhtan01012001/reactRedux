import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { showFavouriteProductList } from 'api/client/productClient.api'
import ProductItem from 'component/productItem/ProductItem'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState, useAppDispatch } from 'store'

export default function Favourite() {
  const productList = useSelector((state: RootState) => state.productClient.productList)
  const dispatch = useAppDispatch()
  useEffect(() => {
    const promise = dispatch(showFavouriteProductList())

    return () => {
      promise.abort()
    }
  }, [dispatch])
  console.log(productList)

  return (
    <>
      <div className='app__container' id='ssa'>
        <div className='wide grid'>
          <div className='row'>
            <div className='app__container--category'>
              <Link to='/' className='app__container--link'>
                Trang chủ
              </Link>
              <FontAwesomeIcon icon={faChevronRight} />
              <div className='app__container--link'>Danh mục</div>
              <FontAwesomeIcon icon={faChevronRight} />
              <p className='app__container--text'>Yêu thích</p>
            </div>
          </div>
        </div>
        <div className='wide grid'>
          <div className='row'>
            <div className='col l-9'>
              <div className='tshirts__content'>
                <div className='grid grid-cols-5 gap-5'>
                  {productList.map((item, index) => {
                    return <ProductItem data={item} index={index} />
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

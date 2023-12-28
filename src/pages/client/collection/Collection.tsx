import { faChevronRight, faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { searchProduct } from 'api/admin/product.api'
import { getCategoryById } from 'api/client/categoryClient.api'
import { getListProductOfCategory, showCategoryAndSizeAndMinMaxPrice } from 'api/client/productClient.api'
import ProductItem from 'component/productItem/ProductItem'
import SearchAdmin from 'component/search/SearchAdmin'
import SearchClient from 'component/search/SearchClient'
import MenuCategory from 'layouts/client/MenuCategory'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { showProductList } from 'slice/client/productClient.slice'
import { RootState, useAppDispatch } from 'store'

export default function Collection() {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const category = useSelector((state: RootState) => state.productClient.category)
  const productList = useSelector((state: RootState) => state.productClient.productList)

  useEffect(() => {
    const ids: number = Number(id)
    const promise = dispatch(getListProductOfCategory(ids))

    return () => {
      promise.abort()
    }
  }, [dispatch, id])

  const handleOption = (e: any) => {
    console.log(e.target.value)
    dispatch(showProductList(e.target.value))
  }
  const onSearch: any = (value: string) => dispatch(searchProduct(value))
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
              <p className='app__container--text'>{category?.name}</p>
            </div>
          </div>
        </div>
        <div className='block pb-4 text-end'></div>
        <div className='wide grid'>
          <div className='grid grid-cols-4 gap-4'>
            <MenuCategory />
            <div className='col-span-3'>
              <div className='tshirts__title'>
                <h3 className='tshirts__title--heading font-bold'>{category?.name}</h3>
                <div className='tshirts__title--sort'>
                  <p style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 0 20px' }}>Bộ lọc</p>
                  {/* <Filter
                    fil={1}
                    iconButton={<FilterAltIcon style={{ fontSize: '35px' }} />}
                    setValue={setValue}
                    value={value}
                    setProduct={setProduct}
                  /> */}

                  <div className='tshirts__title--option' style={{ marginLeft: '20px' }}>
                    <select onChange={handleOption} id='search' className='tshirts__title--select'>
                      <option>---Sắp xếp---</option>
                      <option value={1}>Giá:Tăng dần</option>
                      <option value={2}>Giá:Giảm dần</option>
                      <option value={3}>Tên: A--Z</option>
                      <option value={4}>Tên: Z--A</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className='tshirts__content'>
                <div className='grid grid-cols-4 gap-4'>
                  {productList.map((item, index) => {
                    return <ProductItem data={item} index={index} />
                  })}
                </div>
                {productList.length === 0 && (
                  <h2 className='mx-auto my-5 ml-3 text-xl text-red-600'>Products is empty</h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

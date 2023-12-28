import { faFilter, faHeartCirclePlus, faMinus, faPlus, faPlusMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getCategoryList } from 'api/admin/category.api'
import { searchProductClient } from 'api/client/productClient.api'
import ButtonCusTom from 'component/button'
import SearchClient from 'component/search/SearchClient'
import Filter from 'pages/client/collection/Filter'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { RootState, useAppDispatch } from 'store'

export default function MenuCategory() {
  const categoryList = useSelector((state: RootState) => state.categoryClient.categoryList)
  const dispatch = useAppDispatch()
  const [onMenu, setOnMenu] = useState<boolean>(true)
  const history = useNavigate()
  //Xử lý dữ liệu loại sản phẩm
  useEffect(() => {
    const promise = dispatch(getCategoryList())

    return () => {
      promise.abort()
    }
  }, [dispatch])

  const handleMenu = () => {
    if (!onMenu) {
      setOnMenu(true)
    } else {
      setOnMenu(false)
    }
  }
  const onSearch: any = (value: string) => dispatch(searchProductClient(value))
  return (
    <>
      <div>
        <div className='tshirts__category--title'>
          <h3 className='tshirts__category--text'>Danh mục nhóm</h3>
          <div onClick={handleMenu} className='tshirts__category--minus'>
            <FontAwesomeIcon icon={onMenu ? faMinus : faPlus} className='text-base' />
          </div>
        </div>
        {onMenu ? (
          <ul className='tshirts__category--list tshirts__category'>
            {categoryList.map((item, index) => {
              return (
                <li key={index} className='tshirts__category--item'>
                  <Link to={`/collection/${item.id}`}>{item.name}</Link>
                </li>
              )
            })}
          </ul>
        ) : (
          ''
        )}
        <div className='px-2 pt-3 '>
          <SearchClient onSearch={onSearch} placeholder={'search name product...'} />
        </div>
        <div className='px-2 pt-3'>
          <Filter />
        </div>
      </div>
    </>
  )
}

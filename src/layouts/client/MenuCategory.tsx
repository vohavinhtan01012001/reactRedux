import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getCategoryList } from 'api/admin/category.api'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState, useAppDispatch } from 'store'

export default function MenuCategory() {
  const categoryList = useSelector((state: RootState) => state.categoryClient.categoryList)
  const dispatch = useAppDispatch()
  const [onMenu, setOnMenu] = useState<boolean>(true)
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

  return (
    <div>
      <div className='tshirts__category--title'>
        <h3 className='tshirts__category--text'>Danh mục nhóm</h3>
        <div onClick={handleMenu} className='tshirts__category--minus'>
          <FontAwesomeIcon icon={faMinus} />
        </div>
      </div>
      <ul className='tshirts__category--list tshirts__category'>
        {categoryList.map((item, index) => {
          return (
            <li key={index} className='tshirts__category--item'>
              <Link to={`/collection/${item.id}`}>{item.name}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

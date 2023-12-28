import React, { useEffect, useState } from 'react'
import { Link, Router, useNavigate } from 'react-router-dom'
import '../../assets/frontend/css/grid.css'
import '../../assets/frontend/css/style.css'
import logo from '../../assets/frontend/img/logo/imageLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleDown,
  faAngleRight,
  faBars,
  faClose,
  faPhone,
  faSearch,
  faShoppingCart,
  faTimes,
  faUserAlt,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'store'
import { getCategoryList } from 'api/client/categoryClient.api'
import Cookies from 'js-cookie'

function Header(/* { cart, setMessage } */) {
  const history = useNavigate()
  const [onSearch, setOnSearch] = useState(false)
  const [onMenu, setOnMenu] = useState(false)
  const [onMenu2, setOnMenu2] = useState(false)
  const categoryList = useSelector((state: RootState) => state.categoryClient.categoryList)
  const dispatch = useAppDispatch()

  //Xử lý dữ liệu loại sản phẩm
  useEffect(() => {
    const promise = dispatch(getCategoryList())

    return () => {
      promise.abort()
    }
  }, [dispatch])
  console.log(categoryList)
  //xử lý search
  const handleSearchClose = () => {
    if (onSearch) {
      setOnSearch(false)
    }
  }
  const handleSearch = () => {
    if (!onSearch) {
      setOnSearch(true)
    } else {
      setOnSearch(false)
    }
  }

  var inputSearch: any
  // const handleInput = (e) => {
  //   if (e.key === 'Enter') {
  //     setMessage(e.target.value)
  //   }
  // }
  const handleClickSearch = (e: any) => {
    e.preventDefault()
  }

  if (onSearch) {
    inputSearch = (
      <div className='header__content-put'>
        <input
          name='name'
          /* value={search} */ type='text'
          id='header__content-inputid'
          className='header__content-input fs-4 text'
          placeholder='Tìm kiếm...' /* onKeyDown={handleInput} */
          /* onChange={handleInputChange} */
        />
        <div className='header__content-input--close' onClick={handleSearchClose}>
          <FontAwesomeIcon icon={faClose} />
        </div>
      </div>
    )
  } else {
    inputSearch = ''
  }

  //xử lý menu2
  const handleMenu2 = () => {
    if (!onMenu2) {
      setOnMenu2(true)
    } else {
      setOnMenu2(false)
    }
  }

  var menuMobile2: any
  var iconMenuMobile2: any
  if (onMenu2) {
    iconMenuMobile2 = <FontAwesomeIcon icon={faAngleDown} />
    menuMobile2 = (
      <ul className='header__menu-list2'>
        {categoryList.map((item, index) => {
          return (
            <li key={index} className='haeder__menu-item2'>
              <Link to={`/collection/${item.name}`} className='header__menu-link2'>
                {item.name}
              </Link>
            </li>
          )
        })}
      </ul>
    )
  } else {
    iconMenuMobile2 = <FontAwesomeIcon icon={faAngleRight} />
    menuMobile2 = ''
  }
  //Xử lý Auth Account PC vaf Tablet
  var nameMobile = localStorage.getItem('auth_name')
  let authAccount: any
  if (!Cookies.get('accessToken')) {
    authAccount = (
      <Link to='/login' className='header__content-account'>
        <FontAwesomeIcon icon={faUserAlt} className='text-lg' />
      </Link>
    )
  } else {
    authAccount = (
      <Link to='/account' className='header__content-account'>
        <FontAwesomeIcon icon={faUserAlt} />
      </Link>
    )
  }

  //Xử lý Auth Account Mobile
  var authAccountMobile: any
  if (!localStorage.getItem('auth_token')) {
    authAccountMobile = (
      <div className='header__menu--account'>
        <div className='header__menu--login'>
          <Link to='/login' className='header__menu-link'>
            Đăng Nhập
          </Link>
        </div>
        <div className='header__menu-shotbar'></div>
        <div className='header__menu--signUp'>
          <Link to='/register' className='header__menu-link'>
            Đăng Ký
          </Link>
        </div>
      </div>
    )
  } else {
    authAccountMobile = (
      <div className='header__menu--authAccountMobile'>
        <Link to='/account' className='header__menu-authAccountMobile--name'>
          {nameMobile}
        </Link>
      </div>
    )
  }

  //xử lý menu Mobile
  const handleMenu = () => {
    if (!onMenu) {
      setOnMenu(true)
    } else {
      setOnMenu(false)
    }
  }
  const hanleCloseMenu = () => {
    if (onMenu) {
      setOnMenu(false)
    }
  }
  var menuMobile: any
  var bodyCover: any
  if (onMenu) {
    bodyCover = <div onClick={hanleCloseMenu} className='body__cover'></div>
    menuMobile = (
      <ul className='header__menu-list'>
        <li className='header__menu-item'>
          <div className='header__menu-close'>
            <div onClick={hanleCloseMenu} className='header__menu-link--close'>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
          <div className='header__menu-user'>
            <FontAwesomeIcon icon={faUserCircle} />
          </div>
          {authAccountMobile}
        </li>
        <li className='header__menu-item'>
          <Link to='/' className='header__menu-link'>
            TRANG CHỦ
          </Link>
        </li>
        <li className='header__menu-item'>
          <div onClick={handleMenu2} className='header__menu-shop'>
            <div className='header__menu-link header__menu-shop--link'>
              SẢN PHẨM
              <div className='header__menu-icon'>{iconMenuMobile2}</div>
            </div>
            {menuMobile2}
          </div>
        </li>
        <li className='header__menu-item'>
          <Link to='/blog' className='header__menu-link'>
            BLOG
          </Link>
        </li>
        <li className='header__menu-item'>
          <Link to='/contact' className='header__menu-link'>
            LIÊN HỆ
          </Link>
        </li>
        <li className='header__menu-item'>
          <Link to='/about' className='header__menu-link'>
            GIỚI THIỆU
          </Link>
        </li>
        <li className='header__menu-item'>
          <a
            href='https://www.facebook.com/phat.ngo.5454'
            target='_blank'
            rel='noreferrer'
            className='header__navbar-link'
            style={{ textDecoration: 'none', color: 'white', fontSize: '1.6rem', display: 'block', padding: '13px' }}
          >
            FANPAGE
          </a>
        </li>
        <li className='header__menu-item'>
          <a
            href='https://www.instagram.com/'
            target='_blank'
            rel='noreferrer'
            className='header__navbar-link'
            style={{ textDecoration: 'none', color: 'white', fontSize: '1.6rem', display: 'block', padding: '13px' }}
          >
            INTAGRAM
          </a>
        </li>
      </ul>
    )
  } else {
    bodyCover = ''
    menuMobile = ''
  }

  //Xử lý scroll menu Tablet và PC
  const handleScroll = () => {
    var menuPC: any = document.getElementById('header__navbar-listid')
    var x = window.scrollY
    if (menuPC) {
      if (x > 100) {
        menuPC.style.top = 0
        menuPC.style.boxShadow = '0 14px 20px -17px rgb(0 0 0 / 75%)'
        menuPC.style.position = 'fixed'
      } else {
        menuPC.style.boxShadow = 'none'
        menuPC.style.position = 'relative'
      }
    }
  }

  return (
    <header className='header'>
      <div className='header header__content grid'>
        <div className='px-4'>
          <ul className='header__content-list'>
            <li className='header__content-item'>
              <div className='header__content--contact'>
                <div className='header__content--phone'>
                  <FontAwesomeIcon icon={faPhone} />
                </div>
              </div>
            </li>
            <li className='header__content-item'>
              {bodyCover}
              <div onClick={handleMenu} className='header__content--bars'>
                <FontAwesomeIcon icon={faBars} />
              </div>
              {menuMobile}
            </li>
            <li className='header__content-item'>
              <Link to='/' className='header__content-logo'>
                <img src={logo} alt='Vergency' />
              </Link>
            </li>
            <li className='header__content-item'>
              <ul className='header__content-list2'>
                <li className='header__content-item2'>
                  <div className='header__content-search'>{authAccount}</div>
                </li>
                <li className='header__content-item2'>
                  <div className='header__content-search'>
                    <Link to='/cart' className='header__content-cart'>
                      <FontAwesomeIcon icon={faShoppingCart} />
                      {/* <p>{cart}</p> */}
                    </Link>
                  </div>
                </li>
                <li className='header__content-item2'>
                  {/*  {inputSearch}
                  <Link to='/search' className='header__content-label' onClick={handleSearch}>
                    <div className='header__content-search'>
                      <FontAwesomeIcon icon={faSearch} />
                    </div>
                  </Link> */}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div className='header header__navbar grid'>
        <div className='bg-slate-100'>
          <ul className='header__navbar-list' id='header__navbar-listid'>
            <li className='header__navbar-item'>
              <Link to='/' className='header__navbar-link'>
                TRANG CHỦ
              </Link>
            </li>
            <li className='header__navbar-item'>
              <div className='header__navbar-link'>
                SẢN PHẨM
                <div className='header__navbar-icon'>
                  <FontAwesomeIcon icon={faAngleDown} />
                </div>
                <ul className='header__navbar-list2'>
                  {categoryList.map((item, index) => {
                    return (
                      <li key={index} className='haeder__navbar-item2'>
                        <Link to={`/collection/${item.id}`} className='header__navbar-link2'>
                          {item.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </li>
            <li className='header__navbar-item'>
              <Link to='/blog' className='header__navbar-link'>
                BLOG
              </Link>
            </li>
            <li className='header__navbar-item'>
              <Link to='/contact' className='header__navbar-link'>
                LIÊN HỆ
              </Link>
            </li>
            <li className='header__navbar-item'>
              <Link to='/about' className='header__navbar-link'>
                GIỚI THIỆU
              </Link>
            </li>
            <li className='header__navbar-item'>
              <a
                href='https://www.facebook.com/phat.ngo.5454'
                target='_blank'
                rel='noreferrer'
                className='header__navbar-link'
              >
                FANPAGE
              </a>
            </li>
            <li className='header__navbar-item'>
              <a href='https://www.instagram.com/' target='_blank' rel='noreferrer' className='header__navbar-link'>
                INTAGRAM
              </a>
            </li>
          </ul>
          {/* {handleScroll} */}
        </div>
      </div>
    </header>
  )
}

export default Header

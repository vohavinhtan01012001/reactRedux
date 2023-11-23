import { faLeaf, faShop, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useRef, useState } from 'react'
import './sidebar.css'
import { useNavigate } from 'react-router-dom'
import SidebarLogo from './SidebarLogo'
import MenuList from './MenuList'
import initMenu from '../menu/menu'

function Sidebar({ ...props }) {
  const navigate = useNavigate()
  const [menus, setMenus] = useState(initMenu)
  const [scButton, setScButton] = useState(false)
  const search = useRef('')

  const handleChange = (e: any) => {
    if (e.target.value) {
      setScButton(true)
      setMenus(
        menus.filter((el: any) => {
          return el.label.toLowerCase().includes(e.target.value.toLowerCase())
        })
      )
    } else {
      setScButton(false)
      setMenus(initMenu)
    }
  }

  // const clearSearch = () => {
  //   search.current.value = ''
  //   setMenus(initMenu)
  //   setScButton(false)
  // }

  const logout = () => {
    navigate('/auth/login')
  }

  return (
    <>
      <aside
        id='sidebar'
        className={`sidebarWrapper no-scrollbar z-50 -translate-x-full md:z-0 md:translate-x-0 ${props.className}`}
      >
        {/* Sidebar wrapper */}
        <div className='flex h-full flex-shrink-0 flex-col border-r-2 border-gray-100 md:w-64'>
          {/* Logo */}
          <SidebarLogo /* toggle={props.toggle} */ icon={faShop} text='Shop' />

          {/* Search Menu */}
          {/*  <SidebarSearch clearSearch={clearSearch} handleChange={handleChange} scButton={scButton} search={search} /> */}

          {/* Menu */}
          <MenuList menus={menus} toggle={props.toggle} />

          {/* Profile */}
          <div className='border-t border-gray-300 pt-2'>
            <div className='px-4 py-2'>
              {/* Logout Button */}
              <button
                className='w-full justify-end rounded-full border border-emerald-500 bg-emerald-600 px-4 py-2 text-sm text-gray-200 hover:border-emerald-600 hover:bg-emerald-600'
                onClick={() => logout()}
              >
                <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon> Logout
              </button>
            </div>
          </div>
        </div>
      </aside>

      {props.className === 'mobile' && (
        <div
          id='overlaySidebar'
          onClick={props.toggle}
          className='absolute inset-0 z-10 hidden h-screen w-full bg-black opacity-60'
        >
          <div></div>
        </div>
      )}
    </>
  )
}

export default Sidebar

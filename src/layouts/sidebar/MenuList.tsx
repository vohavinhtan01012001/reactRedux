import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { NavLink } from 'react-router-dom'
import SubMenu from './SubMenu'

interface Menu {
  label: string
  path?: string
  icon?: any // Replace 'any' with the specific type of your icon library if available
  role?: string
  submenu?: Menu[]
}

interface MenuListProps {
  menus: Menu[]
  toggle: () => void
}

const MenuList: React.FC<MenuListProps> = ({ menus, toggle }) => {
  return (
    <div className='navWrapper p-4'>
      <ul id='menu' className=''>
        {menus?.map((menu: Menu) =>
          menu.submenu ? (
            <SubMenu key={menu.label} menu={menu} toggle={toggle} />
          ) : menu.path ? (
            <li key={menu.label} className={``} onClick={toggle}>
              <NavLink to={`${menu.path}`} className='link'>
                {menu.icon && <FontAwesomeIcon icon={menu.icon} />}
                {menu.label}
              </NavLink>
            </li>
          ) : (
            <li key={menu.label} className='mb-3 mt-5'>
              <span className='mx-2 text-xs font-medium uppercase text-gray-500'>
                {menu.label} {menu.role}
              </span>
            </li>
          )
        )}
      </ul>
    </div>
  )
}

export default MenuList

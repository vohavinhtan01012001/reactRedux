import { faAngleRight, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { NavLink, useLocation } from 'react-router-dom'

interface SubMenuItem {
  label: string
  path: string
}

interface SubMenuProps {
  menu: any
  toggle: () => void
}

const SubMenu: React.FC<SubMenuProps> = ({ menu, toggle }) => {
  const { pathname } = useLocation()
  const [subMenuOpen, setSubMenuOpen] = useState<boolean>(pathname.includes(menu.path || ''))

  return (
    <div className={``} key={menu.label}>
      <li
        key={menu.label}
        className={`link ${pathname.includes(menu.path || '') ? 'active' : ''} `}
        onClick={() => setSubMenuOpen(!subMenuOpen)}
      >
        {menu.icon && <FontAwesomeIcon icon={menu.icon} />}
        <p className='flex-1'>{menu.label}</p>
        <FontAwesomeIcon icon={faAngleRight} className={`${subMenuOpen && 'rotate-90'} h-4 w-4 duration-200`} />
      </li>
      <motion.ul
        animate={
          subMenuOpen
            ? {
                height: 'fit-content'
              }
            : {
                height: 0
              }
        }
        className='flex h-0 flex-col overflow-hidden pl-[39px] text-[0.7rem]'
      >
        {menu.submenu.map((sm: any) => (
          <li key={sm.label} onClick={toggle}>
            <NavLink to={`${menu.path}/${sm.path}`} className='link'>
              {sm.label}
            </NavLink>
          </li>
        ))}
      </motion.ul>
    </div>
  )
}

export default SubMenu

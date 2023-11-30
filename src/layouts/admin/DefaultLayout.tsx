import React, { ReactNode, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './sidebar/Sidebar'
import { sidebarToggle } from 'utils/toggler'
import { checkAdmin } from 'api/admin/auth.api'
import { RootState, useAppDispatch } from 'store'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function DefaultLayout({ children }: any) {
  const isDesktop: any = () => document.body.clientWidth > 768
  const [sidebarStatus, setSidebarStatus] = useState('')

  useEffect(() => {
    window.addEventListener('resize', () => {
      setSidebarStatus(isDesktop())
    })
    return () => window.removeEventListener('resize', isDesktop)
  }, [])

  return (
    <div className='adminLayout'>
      {/* Sidebar */}
      <Sidebar toggle={sidebarToggle} className={sidebarStatus ? '' : 'mobile'} />

      {/* Main Wrapper */}
      <div className='mainWrapper'>
        {/* <Outlet context={[sidebarToggle]} /> */}
        {children}
      </div>

      {/* Bottom Navigation */}
      {/* <BottomNavbar /> */}
    </div>
  )
}

export default DefaultLayout

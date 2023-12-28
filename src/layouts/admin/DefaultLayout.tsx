import React, { ReactNode, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './sidebar/Sidebar'
import { sidebarToggle } from 'utils/toggler'
import { checkAdmin } from 'api/admin/auth.api'
import { RootState, useAppDispatch } from 'store'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loading from 'component/loading/Loading'
import Page404 from 'pages/pageError'

function DefaultLayout({ children }: any) {
  const isDesktop: any = () => document.body.clientWidth > 768
  const [sidebarStatus, setSidebarStatus] = useState('')
  const loading = useSelector((state: RootState) => state.user.loading)
  const isAdmin = useSelector((state: RootState) => state.user.checkAdmin)
  const dispatch = useAppDispatch()
  useEffect(() => {
    const promise = dispatch(checkAdmin())
    return () => {
      promise.abort()
    }
  }, [dispatch])
  useEffect(() => {
    window.addEventListener('resize', () => {
      setSidebarStatus(isDesktop())
    })
    return () => window.removeEventListener('resize', isDesktop)
  }, [])
  return (
    <>
      {isAdmin ? (
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
      ) : (
        <Page404 />
      )}
    </>
  )
}

export default DefaultLayout

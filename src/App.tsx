import DefaultLayout from 'layouts/admin'
import DefaultLayoutClient from 'layouts/client/DefaultLayoutClient'
import Page404 from 'pages/pageError'
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { authRouters, privateRoutes, publicRoutes } from 'routes'
import './assets/frontend/css/style.css'
import './assets/frontend/css/grid.css'
import { RootState, useAppDispatch } from 'store'
import { useEffect } from 'react'
import { checkAdmin } from 'api/admin/auth.api'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
function App() {
  return (
    <div className='App'>
      <ToastContainer />
      <Router>
        <Routes>
          {/* auth routes */}
          {authRouters.map((route) => {
            return <Route key={route.path} path={route.path} element={<route.component />} />
          })}

          {/* admin routes */}
          {privateRoutes.map((route) => (
            <Route
              key={'/admin' + route.path}
              path={'/admin' + route.path}
              element={
                <DefaultLayout>
                  <route.component />
                </DefaultLayout>
              }
            />
          ))}
          {/* client routes */}
          {publicRoutes.map((route) => {
            if (route.path == '/pay') {
              return <Route key={route.path} path={route.path} element={<route.component />} />
            }
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <DefaultLayoutClient>
                    <route.component />
                  </DefaultLayoutClient>
                }
              />
            )
          })}

          {/* 404 page */}
          <Route path='*' element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

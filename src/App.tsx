import DefaultLayout from 'layouts'
import Product from 'pages/admin/product'
import Page404 from 'pages/pageError'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { authRouters, privateRoutes } from 'routes'

function App() {
  return (
    <div className='App'>
      <ToastContainer />
      <Router>
        <Routes>
          {/* client routes */}
          {authRouters.map((route) => (
            <Route key={route.path} path={route.path} element={<route.component />} />
          ))}

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

          {/* 404 page */}
          <Route path='*' element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

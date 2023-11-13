import DefaultLayout from 'layouts'
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
          {authRouters.map((route) => {
            const Page = route.component
            const path = route.path
            return <Route path={path} element={<Page />} />
          })}

          {/* admin routes */}
          {privateRoutes.map((route) => {
            const Page = route.component
            const path = '/admin' + route.path
            return <Route path={path} element={<DefaultLayout>{<Page />}</DefaultLayout>} />
          })}
        </Routes>
      </Router>
    </div>
  )
}

export default App

import React from 'react'
import Header from './Header'
import Footer from './Footer'

export default function DefaultLayoutClient({ children }: any) {
  return (
    <>
      <div>
        <Header />
      </div>
      <div className='container'>{children}</div>
      <div>
        <Footer />
      </div>
    </>
  )
}

import React from 'react'
import Header from './Header'
import Footer from './Footer'

export default function DefaultLayoutClient({ children }: any) {
  return (
    <div className='bg-slate-100'>
      <div>
        <Header />
      </div>
      <div className='mx-auto my-0 max-w-7xl'>{children}</div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

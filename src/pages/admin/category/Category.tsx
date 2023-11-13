import React from 'react'
import ListCategory from './listCategory'
import { ToastContainer } from 'react-toastify'

export default function Category() {
  return (
    <>
      <div className=''>
        <div className='ml-auto mr-auto mt-5'>
          <div className='ml-auto mr-auto w-4/5'>
            <ListCategory />
          </div>
        </div>
      </div>
    </>
  )
}

import React from 'react'
import { ToastContainer } from 'react-toastify'
import ListCategory from './ListCategory'

export default function Category() {
  return (
    <>
      <div className=''>
        <div className='ml-auto mr-auto mt-5'>
          <div className='mx-auto mt-36 w-4/5'>
            <ListCategory />
          </div>
        </div>
      </div>
    </>
  )
}

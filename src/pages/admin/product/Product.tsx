import React from 'react'
import ListProduct from './ListProduct'
import SearchAdmin from 'component/search/SearchAdmin'

export default function Product() {
  return (
    <>
      <div className=''>
        <div className='ml-auto mr-auto mt-5'>
          <div className='mx-auto mt-36 w-4/5'>
            <ListProduct />
          </div>
        </div>
      </div>
    </>
  )
}

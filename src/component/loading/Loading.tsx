import React from 'react'
import { FillingBottle } from 'react-cssfx-loading'

export default function Loading() {
  return (
    <>
      <div className='fixed bottom-0 left-0 right-0 top-0 z-40 bg-gray-400 bg-opacity-20 '></div>
      <div className='relative top-1/3 z-50'>
        <FillingBottle color='#FF0000' width='100px' height='100px' duration='3s' className='mx-auto' />
      </div>
    </>
  )
}

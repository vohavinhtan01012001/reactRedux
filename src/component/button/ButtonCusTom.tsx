import React from 'react'
import './button.css'

interface buttonProps {
  label: string
  onClick: any | undefined
  length: string
  type: 'button' | 'submit' | 'reset' | undefined
}

const ButtonCusTom = ({ label, onClick, length, type }: buttonProps) => {
  return (
    <button
      onClick={type === 'submit' ? undefined : onClick}
      type={type}
      className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-green-400 to-blue-600 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-200 group-hover:from-green-400 group-hover:to-blue-600 dark:text-white dark:focus:ring-green-800'
    >
      {length == 'long' ? (
        <span className='relative w-40 rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
          {label}
        </span>
      ) : length == 'longs' ? (
        <span className='relative w-full rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
          {label}
        </span>
      ) : (
        <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
          {label}
        </span>
      )}
    </button>
  )
}

export default ButtonCusTom

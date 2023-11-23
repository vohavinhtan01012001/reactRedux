import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
interface PropsLogo {
  icon: any
  text: string
}
function SidebarLogo({ icon, text /* ...props */ }: PropsLogo) {
  return (
    <div className='relative mb-5 flex flex-row justify-between p-4 text-3xl font-semibold text-green-700 md:mx-auto md:items-center'>
      <Link to='/'>
        <FontAwesomeIcon icon={icon}></FontAwesomeIcon> {text}
      </Link>
     {/*  <button
        onClick={props.toggle}
        className='absolute right-1 top-3 block border border-emerald-300 px-4 py-2 text-xl font-medium md:hidden'
      >
        <FontAwesomeIcon icon={faTimes} />
      </button> */}
    </div>
  )
}

export default SidebarLogo

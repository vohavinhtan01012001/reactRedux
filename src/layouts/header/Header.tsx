import { useState } from 'react'
import logo from '../../assets/frontend/img/logo/imageLogo.png'
import AvatarCusTome from 'component/avatar'

export default function NavbarWithDropdown() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  console.log(isMenuOpen)

  return <div className=''>He</div>
}

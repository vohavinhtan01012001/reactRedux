import React from 'react'
import { Carousel } from 'antd'
import Slider1 from '../../assets/frontend/img/slide/1.jpg'
import Slider2 from '../../assets/frontend/img/slide/2.jpg'
const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79'
}
const CarouselClient: React.FC<any> = () => {
  return (
    <Carousel autoplay className='w-full'>
      <img className='d-block w-100' src={Slider1} alt='Second slide' />
      <img className='d-block w-100' src={Slider2} alt='Second slide' />
    </Carousel>
  )
}

export default CarouselClient

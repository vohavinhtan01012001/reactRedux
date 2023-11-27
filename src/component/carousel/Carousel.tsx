import React from 'react'
import { Carousel } from 'antd'

const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79'
}
const CarouselClient: React.FC<any> = (data) => (
  <Carousel autoplay>
    {data.map((carousel: any) => (
      <div>
        <h3 style={contentStyle}>
          <img className='d-block w-100' src={carousel} alt='Second slide' />
        </h3>
      </div>
    ))}
  </Carousel>
)

export default CarouselClient

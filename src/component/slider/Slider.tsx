import React, { useEffect, useState } from 'react'
import { Slider } from 'antd'
import { useAppDispatch } from 'store'
import { updateMinMaxPrice } from 'slice/client/productClient.slice'

const SliderCustom: React.FC<{
  min: number
  max: number
}> = ({ min: initialMin, max: initialMax }) => {
  const dispatch = useAppDispatch()
  const [min, setMin] = useState(initialMin)
  const [max, setMax] = useState(initialMax)

  const handleSlider = (v: any) => {
    const [newMin, newMax] = v
    setMin(newMin)
    setMax(newMax)
    dispatch(updateMinMaxPrice({ min: newMin, max: newMax }))
  }

  const handleChangeMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseInt(event.target.value)
    if (!isNaN(newMin) && newMin <= max) {
      setMin(newMin)
      dispatch(updateMinMaxPrice({ min: newMin, max }))
    }
  }

  const handleChangeMax = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(event.target.value)
    if (!isNaN(newMax) && newMax >= min) {
      setMax(newMax)
      dispatch(updateMinMaxPrice({ min, max: newMax }))
    }
  }

  useEffect(() => {
    setMin(initialMin)
    setMax(initialMax)
  }, [initialMin, initialMax])

  return (
    <>
      <Slider range={{ draggableTrack: true }} step={100} min={initialMin} max={initialMax} onChange={handleSlider} />
      <div className='flex items-center justify-around'>
        <div className='flex items-center justify-start'>
          <label className='pr-2'>Min:</label>
        {/*   <input
            type='number'
            disabled
            value={min}
            onChange={handleChangeMin}
            className='w-24 rounded-xl border p-2 outline-none'
          /> */}
          <span>{min}</span>
          <span className='pl-2'>VNĐ</span>
        </div>
        <div className='flex items-center justify-start'>
          <label className='pr-2'>Max:</label>
          {/*   <input
            type='number'
            disabled
            value={max}
            onChange={handleChangeMax}
            className='w-24 rounded-xl border p-2 outline-none'
          /> */}
          <span>{max}</span>
          <span className='pl-2'>VNĐ</span>
        </div>
      </div>
    </>
  )
}

export default SliderCustom

import React, { useEffect, useState } from 'react'
import { Radio } from 'antd'
import type { RadioChangeEvent } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from 'store'

const RadioCheck: React.FC<any> = (props) => {
  const sizeListDetail = useSelector((state: RootState) => state.productClient.sizeListDetail)

  const [size, setSize] = useState<number>()

  useEffect(() => {
    if (props.size) {
      setSize(props.size)
    }
  }, [props.size])

  return (
    <Radio.Group
      options={sizeListDetail}
      onChange={props.handleCheckSize}
      value={size}
      optionType='button'
      buttonStyle='solid'
      className='checkRadioGroup'
    />
  )
}

export default RadioCheck

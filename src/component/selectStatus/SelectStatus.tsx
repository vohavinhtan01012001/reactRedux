import { Select } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store'

interface PropsSelect {
  status: number
  id: number
  onChange: any
}
export default function SelectStatus({ status, id, onChange }: PropsSelect) {
  const statusProduct = useSelector((state: RootState) => state.product.statusProduct)

  return (
    <Select
      value={
        statusProduct != null && statusProduct == 0
          ? 'Pause'
          : statusProduct != null && statusProduct == 1
          ? 'Activity'
          : statusProduct == null && status == 0
          ? 'Pause'
          : 'Activity'
      }
      style={{ width: 120 }}
      onChange={(e: any) => onChange(e, id)}
      className={status == 0 ? 'text-red-600' : 'text-blue-800'}
      options={[
        { value: '1', label: 'Activity' },
        { value: '0', label: 'Pause' }
      ]}
    />
  )
}

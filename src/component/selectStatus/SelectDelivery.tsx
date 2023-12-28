import { Select } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store'

interface PropsSelect {
  status: number | null
  id: number | null
  onChange: any
}
export default function SelectDelivery({ status, id, onChange }: PropsSelect) {
  const orderDelivery = useSelector((state: RootState) => state.order.orderDelivery)

  return (
    <Select
      value={
        orderDelivery != null && orderDelivery == 0
          ? 'Chưa vận chuyển'
          : orderDelivery != null && orderDelivery == 1
          ? 'Đang vận chuyển'
          : orderDelivery != null && orderDelivery == 2
          ? 'Đã giao'
          : orderDelivery == null && status == 0
          ? 'Chưa vận chuyển'
          : status == 1
          ? 'Đang vận chuyển'
          : 'Đã giao'
      }
      style={{ width: 200 }}
      onChange={(e: any) => onChange(e, id)}
      className={status == 0 ? 'text-red-600' : 'text-blue-800'}
      options={[
        { value: '0', label: 'Chưa vận chuyển' },
        { value: '1', label: 'Đang vận chuyển' },
        { value: '2', label: 'Đã giao' }
      ]}
    />
  )
}

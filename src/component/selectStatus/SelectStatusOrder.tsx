import { Select } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store'

interface PropsSelect {
  status: number | null
  id: number | null
  onChange: any
}
export default function SelectStatusOrder({ status, id, onChange }: PropsSelect) {
  const orderStatus = useSelector((state: RootState) => state.order.orderStatus)

  return (
    <Select
      value={
        orderStatus != null && orderStatus == 0
          ? 'Chưa xử lý'
          : orderStatus != null && orderStatus == 1
          ? 'Đang xử lý'
          : orderStatus != null && orderStatus == 2
          ? 'Đã xử lý'
          : orderStatus == null && status == 0
          ? 'Chưa xử lý'
          : status == 1
          ? 'Đang xử lý'
          : 'Đã xử lý'
      }
      style={{ width: 200 }}
      onChange={(e: any) => onChange(e, id)}
      className={status == 0 ? 'text-red-600' : 'text-blue-800'}
      options={[
        { value: '0', label: 'Chưa xử lý' },
        { value: '1', label: 'Đang xử lý' },
        { value: '2', label: 'Đã xử lý' }
      ]}
    />
  )
}

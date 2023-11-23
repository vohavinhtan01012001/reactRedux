import { Select } from 'antd'
import React from 'react'

interface PropsSelect {
  status: number
  id: number
  onChange: any
}
export default function SelectStatus({ status, id, onChange }: PropsSelect) {
  return (
    <Select
      defaultValue={status == 0 ? 'Pause' : 'Activity'}
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

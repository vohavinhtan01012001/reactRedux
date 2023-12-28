import React, { useEffect, useState } from 'react'
import { List, Tabs } from 'antd'
import type { TabsProps } from 'antd'
import ListOrder from './ListOrder'
import { RootState, useAppDispatch } from 'store'
import { getOrderList, getOrderListStatus } from 'api/admin/order.api'
import { useSelector } from 'react-redux'

const items: TabsProps['items'] = [
  {
    key: '3',
    label: <span className='text-base'>Tất cả</span>,
    children: <ListOrder />
  },
  {
    key: '0',
    label: <span className='text-base'>Chưa xử lý</span>,
    children: <ListOrder />
  },
  {
    key: '1',
    label: <span className='text-base'>Đang xử lý</span>,
    children: <ListOrder />
  },
  {
    key: '2',
    label: <span className='text-base'>Đã xử lý</span>,
    children: <ListOrder />
  },
  {
    key: '4',
    label: <span className='text-base'>Đã hủy</span>,
    children: <ListOrder />
  }
]

const TabsListOrder: React.FC = () => {
  const dispatch = useAppDispatch()
  const orderList = useSelector((state: RootState) => state.order.orderList)
  const [refresh, setRefresh] = useState<boolean>(false)
  useEffect(() => {
    dispatch(getOrderList())
  }, [dispatch, refresh])
  const onChange = (key: string) => {
    const value: number = parseInt(key)
    dispatch(getOrderListStatus(value))
  }

  return (
    <div className=''>
      <div className='mx-3 mt-5 '>
        <Tabs defaultActiveKey='3' items={items} onChange={onChange} />
      </div>
    </div>
  )
}

export default TabsListOrder

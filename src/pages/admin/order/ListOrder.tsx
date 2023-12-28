import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'store'
import Swal from 'sweetalert2'
import Skeleton from 'component/skeleton'
import { CloseSquareFilled, ContainerOutlined, FilterOutlined } from '@ant-design/icons'
import { getOrderList, getOrderListStatus } from 'api/admin/order.api'
import CurrencyFormatter from 'component/currencyFormatter'
import SelectStatusOrder from 'component/selectStatus/SelectStatusOrder'
import ShowOrderDetail from './ShowOrderDetail'
import { useNavigate } from 'react-router-dom'
import { Button, Tooltip } from 'antd'

export default function ListOrder() {
  const history = useNavigate()
  const orderList = useSelector((state: RootState) => state.order.orderList)
  const loading = useSelector((state: RootState) => state.order.loading)

  /*   const handleShowEdit = (id: number) => {
    dispatch(showEditorder(id))
  }

  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteorder(id))
      }
    })
  } */

  return (
    <>
      <div className=''>
        <div className='ml-auto mr-auto mt-5'>
          <div className='mx-auto mt-36 w-4/5'>
            <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
              <div className='mb-5'></div>
              <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
                <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th scope='col' className='px-6 py-3'>
                      Id
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      <div className='flex items-center'>
                        Full Name
                        <a href='#'>
                          <svg
                            className='ml-1.5 h-3 w-3'
                            aria-hidden='true'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path d='M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z' />
                          </svg>
                        </a>
                      </div>
                    </th>

                    <th scope='col' className='px-6 py-3'>
                      <div className='flex items-center'>
                        Price
                        <a href='#'>
                          <svg
                            className='ml-1.5 h-3 w-3'
                            aria-hidden='true'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path d='M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z' />
                          </svg>
                        </a>
                      </div>
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      <div className='flex items-center'>
                        Status Order
                        <a href='#'>
                          <svg
                            className='ml-1.5 h-3 w-3'
                            aria-hidden='true'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path d='M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z' />
                          </svg>
                        </a>
                      </div>
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      <span className='sr-only'>Show detail</span>
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      <span className='sr-only'>Remove</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <Fragment>
                      <tr>
                        <td colSpan={5}>
                          <Skeleton />
                        </td>
                      </tr>
                    </Fragment>
                  )}

                  {!loading &&
                    orderList?.map((item, index) => {
                      return (
                        <>
                          <tr key={index} className=' border-b bg-gray-50 dark:border-gray-700 dark:bg-gray-800'>
                            <th
                              scope='row'
                              className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'
                            >
                              {item.id}
                            </th>
                            <td className='px-6 py-4'>{item.fullname}</td>
                            <td className='px-6 py-4'>{CurrencyFormatter(item.sumPrice)}</td>
                            <td className='px-6 py-4'>
                              {item.status == 0 ? (
                                <span className='font-bold text-red-600'>Chưa xử lý</span>
                              ) : item.status == 1 ? (
                                <span className='font-bold text-blue-600'>Đang xử lý</span>
                              ) : (
                                <span className='font-bold text-green-600'>Đã xử lý</span>
                              )}
                            </td>
                            <td className='px-6 py-4 text-right'>
                              <button onClick={() => history(`/admin/order/${item.id}`)}>
                                <ContainerOutlined rev='someValue' className='text-lg text-blue-600' />
                              </button>
                            </td>
                            <td className='px-6 py-4 text-right'>
                              <button
                                /* onClick={(e) => handleDelete(item.id)} */
                                className='font-medium text-red-600 hover:underline dark:text-red-500'
                              >
                                <CloseSquareFilled rev='someValue' className='rounded-xl text-lg' />
                              </button>
                            </td>
                          </tr>
                        </>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

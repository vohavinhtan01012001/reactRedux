import { CloseSquareFilled, PlusCircleOutlined } from '@ant-design/icons'
import { deletePromotion, getPromotionList, updateStatusPromotion } from 'api/promotion.api'
import DateFormatter from 'component/dateFormatter/DateFormatter'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'store'
import { Promotion, UpdateStatusPromotion } from 'types/promotion.type'
import AddPromotion from '../addPromotion'
import { Select } from 'antd'
import { faHand } from '@fortawesome/free-solid-svg-icons'
import EditPromotion from '../editPromotion'
import { showEditPromotion } from 'slice/promotion.slice'
import SelectStatus from '../../../../component/selectStatus/SelectStatus'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export default function ListPromotion() {
  const promotionList = useSelector((state: RootState) => state.promotion.promotionList)
  const [promotion, setPromotion] = useState<Promotion[]>(promotionList)
  const dispatch = useAppDispatch()
  const history = useNavigate()
  useEffect(() => {
    const promise = dispatch(getPromotionList())

    return () => {
      promise.abort()
    }
  }, [dispatch])
  useEffect(() => {
    if (promotionList) {
      setPromotion(promotionList)
    }
  }, [promotionList])

  const handleEditStatus = (value: any, id: number) => {
    const payload: UpdateStatusPromotion = {
      status: value,
      promotionId: id
    }
    dispatch(updateStatusPromotion(payload))
  }

  const handleShowEdit = (id: number) => {
    dispatch(showEditPromotion(id))
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
        dispatch(deletePromotion(id))
      }
    })
  }
  return (
    <>
      <AddPromotion />
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <div className='mb-5'></div>
        <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
          <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                #
              </th>
              <th scope='col' className='px-6 py-3'>
                <div className='flex items-center'>
                  title
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
                  discount
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
                  startDate
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
                  endDate
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
                  status
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
                <span className='sr-only'>Add</span>
              </th>
              <th scope='col' className='px-6 py-3'>
                <span className='sr-only'>Edit</span>
              </th>
              <th scope='col' className='px-6 py-3'>
                <span className='sr-only'>Remove</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {loading && (
              <Fragment>
                <tr>
                  <td colSpan={5}>
                    <Skeleton />
                  </td>
                </tr>
              </Fragment>
            )} */}
            {promotion?.map((item, index) => {
              return (
                <tr key={index} className=' border-b bg-gray-50 dark:border-gray-700 dark:bg-gray-800'>
                  <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                    {index + 1}
                  </th>
                  <td className='px-6 py-4'>{item.title}</td>
                  <td className='px-6 py-4'>{item.discount}%</td>
                  <td className='px-6 py-4'>{<DateFormatter date={item.startDate} />}</td>
                  <td className='px-6 py-4'>{<DateFormatter date={item.endDate} />}</td>
                  <td className='px-6 py-4'>
                    <SelectStatus status={item.status} id={item.id} onChange={handleEditStatus} />
                  </td>
                  <td className='px-6 py-4 text-right'>
                    <button onClick={() => history('add-product/' + item.id)}>
                      <PlusCircleOutlined rev='someValue' className='text-lg text-blue-600' />
                    </button>
                  </td>
                  <td className='px-6 py-4 text-right'>
                    <button onClick={(e) => handleShowEdit(item.id)}>
                      <EditPromotion />
                    </button>
                  </td>
                  <td className='px-6 py-4 text-right'>
                    <button
                      onClick={(e) => handleDelete(item.id)}
                      className='font-medium text-red-600 hover:underline dark:text-red-500'
                    >
                      <CloseSquareFilled rev='someValue' className='rounded-xl text-lg' />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

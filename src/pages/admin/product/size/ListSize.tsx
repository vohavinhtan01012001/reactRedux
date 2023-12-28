import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'store'
import { Category } from 'types/category.type'
import Swal from 'sweetalert2'
import Skeleton from 'component/skeleton'
import { CloseSquareFilled } from '@ant-design/icons'
import { showEditCategory } from 'slice/admin/category.slice'
import { deleteCategory, getCategoryList } from 'api/admin/category.api'
import AddSize from './AddSize'
import { deleteSize, getSizeList } from 'api/admin/size.api'

export default function ListSize() {
  const sizeList = useSelector((state: RootState) => state.size.sizeList)
  const loading = useSelector((state: RootState) => state.size.loading)
  const dispatch = useAppDispatch()
  useEffect(() => {
    const promise = dispatch(getSizeList())

    return () => {
      promise.abort()
    }
  }, [dispatch])

  return (
    <>
      <div className='mx-auto mt-36 w-4/5'>
        <AddSize />
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
                    Name
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
                    Description
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
                sizeList?.map((item, index) => {
                  return (
                    <tr key={index} className=' border-b bg-gray-50 dark:border-gray-700 dark:bg-gray-800'>
                      <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                        {item.id}
                      </th>
                      <td className='px-6 py-4'>{item.name}</td>
                      <td className='px-6 py-4'>{item.description}</td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

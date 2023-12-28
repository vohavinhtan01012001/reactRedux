import { CloseSquareFilled, ContainerOutlined, EditFilled } from '@ant-design/icons'
import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Skeleton } from 'antd'
import {
  deleteProduct,
  getProductListByProductGroupId,
  searchProduct,
  updateStatusProduct
} from 'api/admin/product.api'
import CurrencyFormatter from 'component/currencyFormatter'
import SearchAdmin from 'component/search/SearchAdmin'
import SelectStatus from 'component/selectStatus/SelectStatus'
import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState, useAppDispatch } from 'store'
import Swal from 'sweetalert2'

export default function ProductGroup() {
  const productList = useSelector((state: RootState) => state.product.productList)
  const loading = useSelector((state: RootState) => state.product.loading)
  const dispatch = useAppDispatch()
  const history = useNavigate()
  const { id } = useParams()
  useEffect(() => {
    if (id != undefined) {
      const ids = parseInt(id)
      const promise = dispatch(getProductListByProductGroupId(ids))

      return () => {
        promise.abort()
      }
    }
  }, [dispatch, id])
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
        dispatch(deleteProduct(id))
      }
    })
  }
  const handleEditStatus = (value: any, itemId: number) => {
    dispatch(updateStatusProduct({ status: value, productId: itemId }))
  }
  console.log(productList)
  const onSearch: any = (value: string) => dispatch(searchProduct(value))
  return (
    <>
      <div>
        <div className='mx-auto mt-36 w-4/5'>
          <div className='pb-5'>
            <SearchAdmin onSearch={onSearch} placeholder={'search name product...'} />
          </div>
          <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
              <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    #
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Product name
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    <div className='flex items-center'>
                      Category
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
                      Price Reduced
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
                      Quantity
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
                      Image
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
                      Gender
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
                      Status
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
                      Status quantity
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
                    <span className='sr-only'>Edit</span>
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
                  productList.map((item, index) => {
                    return (
                      <tr className='border-b bg-white dark:border-gray-700 dark:bg-gray-800'>
                        <th
                          scope='row'
                          className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'
                        >
                          {index + 1}
                        </th>
                        <th
                          scope='row'
                          className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'
                        >
                          {item.name}
                        </th>
                        <td className='px-6 py-4'>{item.Category?.name}</td>
                        <td className='px-6 py-4'>{CurrencyFormatter(item.price)}</td>
                        <td className='px-6 py-4'>{CurrencyFormatter(item.priceReduced)}</td>
                        <td className='px-6 py-4'>{item.quantity}</td>
                        <td className='px-6 py-4'>
                          <img src={item.image} alt={item.name} width={50} />
                        </td>
                        <td className='px-6 py-4'>
                          {item.gender === 0 ? 'Male' : item.gender === 1 ? 'Female' : 'Both'}
                        </td>
                        <td className='px-6 py-4'>
                          <SelectStatus status={item.status} id={item.id} onChange={handleEditStatus} />
                        </td>
                        <td className='px-6 py-4'>
                          {item.quantity ? (
                            <FontAwesomeIcon icon={faClose} className='text-lg font-bold text-red-600' />
                          ) : (
                            <FontAwesomeIcon icon={faCheck} className='text-lg font-bold text-red-600' />
                          )}
                        </td>
                        <td className='px-6 py-4 text-right'>
                          <button onClick={(e) => history(`/admin/edit-product/${item.id}`)}>
                            <EditFilled rev='someValue' className='text-lg text-blue-600' />
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
        </div>
      </div>
    </>
  )
}

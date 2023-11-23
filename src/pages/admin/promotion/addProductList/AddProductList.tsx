import { CloseSquareFilled, EditFilled, PlusCircleOutlined } from '@ant-design/icons'
import { Checkbox, Select } from 'antd'
import { deleteProduct, getProductList, updateStatusProduct } from 'api/product.api'
import ButtonCusTom from 'component/button'
import CurrencyFormatter from 'component/currencyFormatter'
import Skeleton from 'component/skeleton'
import { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState, useAppDispatch } from 'store'
import Swal from 'sweetalert2'
import SelectStatus from 'component/selectStatus/SelectStatus'
import { CheckboxChangeEvent } from 'antd/es/checkbox'

export default function AddProductList() {
  const productList = useSelector((state: RootState) => state.product.productList)
  const loading = useSelector((state: RootState) => state.product.loading)
  const dispatch = useAppDispatch()
  const [listCheck, setListCheck] = useState([])
  useEffect(() => {
    const promise = dispatch(getProductList())

    return () => {
      promise.abort()
    }
  }, [dispatch])

  const handleCheck = (e: CheckboxChangeEvent, id: number) => {
    console.log(e.target.checked)
    if (e.target.checked === true) {
      setListCheck({ ...listCheck, [`id${id}:`]: id })
    } else {
      setListCheck({ ...listCheck, [`id${id}:`]: 0 })
    }
  }
  console.log(listCheck)
  const handlSubmit = () => {
    
  }
  return (
    <>
      <div className=''>
        <div className='ml-auto mr-auto mt-5'>
          <div className='mx-auto mt-36 w-4/5'>
            <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
              <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
                <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th scope='col' className='px-6 py-3'></th>
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
                            <Checkbox onChange={(e) => handleCheck(e, item.id)} className='w-9' />
                          </th>
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
                          <td className='px-6 py-4'>
                            <img src={item.image} alt={item.name} width={50} />
                          </td>
                          <td className='px-6 py-4'>
                            {item.gender === 0 ? 'Male' : item.gender === 1 ? 'Female' : 'Both'}
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <div className='mx-auto my-8 block w-1/4'>
            <div className='mx-auto '>
              <ButtonCusTom type='button' label='Submit' onClick={handlSubmit} length='long' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

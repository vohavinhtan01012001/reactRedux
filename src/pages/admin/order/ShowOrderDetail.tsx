import { getDetailOrder, updateDeliveryOrder, updateStatusOrder } from 'api/admin/order.api'
import CurrencyFormatter from 'component/currencyFormatter'
import Loading from 'component/loading/Loading'
import SelectDelivery from 'component/selectStatus/SelectDelivery'
import SelectStatusOrder from 'component/selectStatus/SelectStatusOrder'
import { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState, useAppDispatch } from 'store'

export default function ShowOrderDetail() {
  const loading = useSelector((state: RootState) => state.order.loading)
  const order = useSelector((state: RootState) => state.order.order)
  const orderStatus = useSelector((state: RootState) => state.order.orderStatus)
  const orderDelivery = useSelector((state: RootState) => state.order.orderDelivery)
  const orderItemList = useSelector((state: RootState) => state.order.orderItemList)
  const [checkOrderStatus, setCheckOrderStatus] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const history = useNavigate()
  const { id } = useParams()
  useEffect(() => {
    if (id) {
      const ids: number = parseInt(id)
      const promise = dispatch(getDetailOrder(ids))

      return () => {
        promise.abort()
      }
    }
  }, [dispatch, id])

  useEffect(() => {
    if (order?.status == 0 || order?.status == 2 || orderStatus == 0 || orderStatus == 2) {
      setCheckOrderStatus(true)
    }
    if (order?.status == 1 || orderStatus == 1) {
      setCheckOrderStatus(false)
    }
  }, [id, order, dispatch, orderStatus])

  const handleEditStatus = (value: number, itemId: number) => {
    dispatch(updateStatusOrder({ status: value, id: itemId }))
  }
  const handleEditDelivery = (value: number, itemId: number) => {
    console.log(value)
    //fix chỗ này
    dispatch(updateDeliveryOrder({ delivery: value, id: itemId }))
    if (value == 1) {
      setCheckOrderStatus(false)
    }
    if (value == 0 || value == 2) {
      setCheckOrderStatus(true)
    }
  }
  return (
    <>
      {loading && <Loading />}
      <div className=''>
        <div className='ml-auto mr-auto mt-5'>
          <div className='mx-auto mt-36 w-4/5'>
            <h1 className='pb-3 text-xl font-bold text-lime-900'>Order code {order?.id}</h1>
            <div className='mb-5 rounded-md bg-gray-50 py-3 text-gray-700 shadow-md dark:bg-gray-700 dark:text-gray-400'>
              <h1 className='text-center text-xl font-bold text-lime-900'>Customer information</h1>
              <div className='flex justify-around'>
                <div className='space-y-6 px-6 py-3'>
                  <div className='flex items-center text-base'>
                    <div className='pr-2 font-bold'>Full Name:</div>
                    <div className=''>{order?.fullname}</div>
                  </div>
                  <div className='flex items-center text-base'>
                    <div className='pr-2 font-bold'>Email:</div>
                    <div className=''>{order?.email}</div>
                  </div>
                  <div className='flex items-center text-base'>
                    <div className='pr-2 font-bold'>Phone:</div>
                    <div className=''>{order?.phone}</div>
                  </div>
                  <div className='flex items-center text-base'>
                    <div className='pr-2 font-bold'>Address:</div>
                    <div className=''>{order?.address}</div>
                  </div>
                  <div className='flex items-center text-base'>
                    <div className='pr-2 font-bold'>Note:</div>
                    <div className=''>{order?.note}</div>
                  </div>
                </div>
                <div className='space-y-6 px-6 py-3'>
                  <div className='flex items-center text-base'>
                    <div className='pr-2 font-bold'>Status order:</div>
                    <div className=''>
                      <SelectStatusOrder
                        status={order ? order.status : null}
                        id={order ? order.id : null}
                        onChange={handleEditStatus}
                      />
                    </div>
                  </div>
                  <div className='flex items-center text-base'>
                    <div className='pr-2 font-bold'>Pay:</div>
                    <div className=''>{order?.pay == 1 ? 'Thanh toán khi nhận hàng' : 'Thanh toán bằng vnpay'}</div>
                  </div>
                  <div className='flex items-center text-base'>
                    <div className='pr-2 font-bold'>Delivery:</div>
                    <div className=''>
                      {checkOrderStatus && orderDelivery != null && orderDelivery == 0
                        ? 'Chưa vận chuyển'
                        : checkOrderStatus && orderDelivery != null && orderDelivery == 1
                        ? 'Đang vận chuyển'
                        : checkOrderStatus && orderDelivery != null && orderDelivery == 2
                        ? 'Đã giao'
                        : checkOrderStatus && orderDelivery == null && order?.delivery == 0
                        ? 'Chưa vận chuyển'
                        : checkOrderStatus && orderDelivery == null && order?.delivery == 1
                        ? 'Đang vận chuyển'
                        : checkOrderStatus && orderDelivery == null && order?.delivery == 2
                        ? 'Đã giao'
                        : ''}
                      {!checkOrderStatus && (
                        <SelectDelivery
                          status={order ? order.delivery : null}
                          id={order ? order.id : null}
                          onChange={handleEditDelivery}
                        />
                      )}
                    </div>
                  </div>
                  {order?.cancelOrder == 1 && (
                    <div className='flex items-center text-base'>
                      <div className='pr-2 font-bold'>Cancel Oder:</div>
                      <div className=''>Đã hủy đơn hàng</div>
                    </div>
                  )}
                  <div className='flex items-center text-base'>
                    <div className='pr-2 font-bold'>Sum Price:</div>
                    <div className=''>{order && CurrencyFormatter(order.sumPrice)}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='relative top-3 overflow-x-auto shadow-md sm:rounded-lg'>
              <h1 className='w-full bg-white py-2 text-center text-xl font-bold text-lime-900'>Product details</h1>
              <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
                <thead className='bg-gray-50 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th scope='col' className='px-6 py-3'>
                      ID
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
                        Sum Price
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
                  {!loading &&
                    orderItemList.map((item, index) => {
                      return (
                        <tr className='border-b bg-white dark:border-gray-700 dark:bg-gray-800'>
                          <th
                            scope='row'
                            className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'
                          >
                            {item.productId}
                          </th>
                          <th
                            scope='row'
                            className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'
                          >
                            {item.Product?.name}
                          </th>
                          <td className='px-6 py-4'>{item.Product?.Category?.name}</td>
                          <td className='px-6 py-4'>
                            <img src={item.Product?.image} alt={item.Product?.name} width={50} />
                          </td>
                          <td className='px-6 py-4'>
                            {item.Product?.gender === 0 ? 'Male' : item.Product?.gender === 1 ? 'Female' : 'Both'}
                          </td>
                          <td className='px-6 py-4'>{CurrencyFormatter(item.price)}</td>
                          <td className='px-6 py-4'>{item.quantity}</td>
                          <td className='px-6 py-4'>{CurrencyFormatter(item.sumPrice)}</td>
                        </tr>
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

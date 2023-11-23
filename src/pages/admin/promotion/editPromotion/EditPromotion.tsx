import { EditFilled } from '@ant-design/icons'
import { Modal } from 'antd'
import ButtonCusTom from 'component/button'
import DateTimeInput from 'component/dateTimeInput'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'store'
import { updatePromotionSchema } from 'validator/promotion.valid'
import dayjs from 'dayjs'
import { updatePromotion } from 'api/promotion.api'
import { Promotion, UpdatePromotion } from 'types/promotion.type'

const convertToCustomFormat = (inputDate: string) => {
  const formattedDate = dayjs(inputDate).format('YYYY-MM-DD HH:mm:YY')
  return formattedDate
}

export default function EditPromotion() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const edittingPromotion = useSelector((state: RootState) => state.promotion.edittingPromotion)
  const [datetime, setDatetime] = useState<[string, string]>([
    moment().startOf('day').toISOString(),
    moment().endOf('day').toISOString()
  ])
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (edittingPromotion) {
      setDatetime([edittingPromotion.startDate, edittingPromotion.endDate])
    }
  }, [edittingPromotion, setDatetime])
  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const handleSubmit = (values: Promotion) => {
    const data = {
      title: values.title,
      discount: values.discount,
      startDate: datetime[0],
      endDate: datetime[1],
      status: values.status
    }
    dispatch(updatePromotion({ promotion: data, promotionId: values.id }))
    setIsModalOpen(false)
  }

  return (
    <>
      <button className='' onClick={showModal}>
        <EditFilled rev='someValue' className='text-lg text-blue-600' />
      </button>
      <Modal title='Add Promotion' visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Formik
          initialValues={
            edittingPromotion ?? {
              id: 0,
              title: '',
              discount: 0,
              startDate: moment().startOf('day').toISOString(),
              endDate: moment().endOf('day').toISOString(),
              status: 1
            }
          }
          validationSchema={updatePromotionSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className='space-y-6 px-5 py-3'>
              <div>
                <div className='mb-2 block font-semibold'>Title</div>
                <Field type='text' name='title' id='title' placeholder='Title' required className='form-edit--input' />
                <ErrorMessage name='title' component='div' className='text-red-600' />
              </div>

              <div>
                <div className='mb-2 block font-semibold'>StartDate - EndDate</div>
                <DateTimeInput
                  setDatetime={setDatetime}
                  datetime={[convertToCustomFormat(datetime[0]), convertToCustomFormat(datetime[1])]}
                />

                <ErrorMessage name='startDate' component='div' className='text-red-600' />
              </div>
              <div className='text-center'>
                <div>
                  <div className='mb-2 block font-semibold'>Discount(%)</div>
                  <Field
                    type='number'
                    name='discount'
                    id='discount'
                    placeholder='Short'
                    required
                    className='form-edit--input mx-auto my-0 w-24'
                  />
                  <ErrorMessage name='discount' component='div' className='text-red-600' />
                </div>
                <div className='py-6'>
                  <div className='mb-2 block font-semibold'>Status</div>
                  <Field as='select' type='number' id='status' name='status' required className='w-28'>
                    <option value='1'>Hoạt động</option>
                    <option value='0'>Tạm dừng</option>
                  </Field>
                  <ErrorMessage name='status' component='div' className='text-red-600' />
                </div>
              </div>
            </div>
            <div className='my-4 px-5 text-center'>
              <ButtonCusTom type='submit' label='Create' length='long' onClick={undefined} />
            </div>
          </Form>
        </Formik>
      </Modal>
    </>
  )
}

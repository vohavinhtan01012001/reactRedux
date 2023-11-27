import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Modal } from 'antd'
import { CreatePromotion } from 'types/promotion.type'
import { useAppDispatch } from 'store'
import ButtonCusTom from 'component/button'
import TextArea from 'antd/es/input/TextArea'
import { addPromotion } from 'api/promotion.api'
import { createPromotionSchema } from 'validator/promotion.valid'
import DateTimeInput from 'component/dateTimeInput'
import moment from 'moment'

function AddPromotion(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [datetime, setDatetime] = useState<[string, string]>([
    moment().startOf('day').toISOString(),
    moment().endOf('day').toISOString()
  ])
  const dispatch = useAppDispatch()

  const initialValues: CreatePromotion = {
    title: '',
    discount: 0,
    startDate: moment().startOf('day').toISOString(),
    endDate: moment().endOf('day').toISOString(),
    status: 1
  }

  const handleSubmit = (values: CreatePromotion) => {
    values.startDate = datetime[0]
    values.endDate = datetime[1]
    dispatch(addPromotion(values))
    setIsModalOpen(false)
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <ButtonCusTom type='button' label='Create' onClick={showModal} length='short' />
      <Modal title='Add Promotion' visible={isModalOpen} onCancel={handleCancel}>
        <Formik initialValues={initialValues} validationSchema={createPromotionSchema} onSubmit={handleSubmit}>
          <Form>
            <div className='space-y-6 px-5 py-3'>
              <div>
                <div className='mb-2 block font-semibold'>Title</div>
                <Field type='text' name='title' id='title' placeholder='Title' required className='form-edit--input' />
                <ErrorMessage name='title' component='div' className='text-red-600' />
              </div>

              <div>
                <div className='mb-2 block font-semibold'>StartDate - EndDate</div>
                <DateTimeInput setDatetime={setDatetime} datetime={datetime} />

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

export default AddPromotion

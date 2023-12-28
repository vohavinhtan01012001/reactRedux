import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Modal } from 'antd'
import { CreateCategory } from 'types/category.type'
import { useAppDispatch } from 'store'
import ButtonCusTom from 'component/button'
import TextArea from 'antd/es/input/TextArea'
import { createCategorySchema } from 'validator/category.valid'
import { CreateSize } from 'types/size.type'
import { addSize } from 'api/admin/size.api'

function AddSize(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useAppDispatch()

  const initialValues: CreateCategory = {
    name: '',
    description: ''
  }

  const handleSubmit = (values: CreateSize) => {
    dispatch(addSize(values))
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
      <Modal title='Add Category' visible={isModalOpen} onCancel={handleCancel}>
        <Formik initialValues={initialValues} validationSchema={createCategorySchema} onSubmit={handleSubmit}>
          <Form>
            <div className='space-y-6 px-5 py-3'>
              <div>
                <div className='mb-2 block'>Name</div>
                <Field type='text' name='name' id='name' placeholder='M' required className='form-edit--input' />
                <ErrorMessage name='name' component='div' className='text-red-600' />
              </div>
              <div>
                <div className='mb-2 block'>Description</div>
                <Field
                  as={TextArea}
                  id='description'
                  name='description'
                  required
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500'
                />
                <ErrorMessage name='description' component='div' className='text-red-600' />
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

export default AddSize

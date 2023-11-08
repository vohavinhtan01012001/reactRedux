import React, { useEffect, useState } from 'react'
import { Modal, Input } from 'antd'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'store'
import { Category } from 'types/category.type'
import { toast } from 'react-toastify'
import ButtonCusTom from 'component/button'
import TextArea from 'antd/es/input/TextArea'
import { EditFilled } from '@ant-design/icons'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup' // Import Yup
import { updateCategory } from 'api/category.api'

const EditCategory: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const category = useSelector((state: RootState) => state.category.edittingCategory)
  const [itemCategory, setItemCategory] = useState<Category>({
    id: 0,
    name: '',
    description: ''
  })
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isModalOpen && category) {
      setItemCategory(category)
    }
    if (isModalOpen === undefined) {
      setItemCategory({
        id: 0,
        name: '',
        description: ''
      })
    }
  }, [isModalOpen, category])

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required')
  })

  const handleSubmit = (values: Category) => {
    dispatch(updateCategory(values))
    setIsModalOpen(false)
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <button className='' onClick={showModal}>
        <EditFilled rev='someValue' className='text-lg text-blue-600' />
      </button>
      <Modal title='Basic Modal' visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Formik initialValues={itemCategory} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form>
            <div className='space-y-6 px-5 py-3'>
              <h2 className='text-xl font-medium text-gray-900 dark:text-white'>Edit Category</h2>
              <div>
                <div className='mb-2 block'>Name</div>
                <Field type='text' name='name' placeholder='Short' required className='form-edit--input' />
                <ErrorMessage name='name' component='div' className='text-red-600' />
              </div>
              <div>
                <div className='mb-2 block'>Description</div>
                <Field
                  as={TextArea}
                  name='description'
                  required
                  className='bg-h-20 w-full rounded-lg border-2 px-3 py-3 focus:outline-slate-300'
                />
                <ErrorMessage name='description' component='div' className='text-red-600' />
              </div>
              <div className='w-full pb-3'>
                <ButtonCusTom type='submit' label='Update' length='long' onClick={undefined} />
              </div>
            </div>
          </Form>
        </Formik>
      </Modal>
    </>
  )
}

export default EditCategory

import React, { useEffect, useState } from 'react'
import { Button, Input, Modal } from 'antd'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'store'
import { Category } from 'types/shirt.type'
import { toast } from 'react-toastify'
import TextArea from 'antd/es/input/TextArea'
import ButtonCusTom from 'component/button'
import { updateCategory } from '../adminCategory.api'
import { EditFilled, EditOutlined } from '@ant-design/icons'

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

  const handleInput = (e: { target: { name: any; value: any } }) => {
    setItemCategory({ ...itemCategory, [e.target.name]: e.target.value })
  }

  const handleSubmit = (item: Category) => {
    dispatch(updateCategory({ body: item }))
    setIsModalOpen(false)
    toast.success('Category updated successfully!', {
      position: toast.POSITION.TOP_RIGHT
    })
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
      <Modal title='Basic Modal' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className='space-y-6 px-5 py-3'>
          <h2 className='text-xl font-medium text-gray-900 dark:text-white'>Edit Category</h2>
          <div>
            <div className='mb-2 block'>Name</div>
            <Input
              name='name'
              id='name'
              placeholder='Short'
              required
              className='form-edit--input'
              onChange={handleInput}
              value={itemCategory.name}
            />
          </div>
          <div>
            <div className='mb-2 block'>Description</div>
            <TextArea
              id='description'
              name='description'
              required
              className='bg- h-20 w-full rounded-lg border-2 px-3 py-3 focus:outline-slate-300'
              onChange={handleInput}
              value={itemCategory.description}
            />
          </div>
          <div className='w-full pb-3'>
            <ButtonCusTom label='Update' onClick={() => handleSubmit(itemCategory)} length='long' />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default EditCategory

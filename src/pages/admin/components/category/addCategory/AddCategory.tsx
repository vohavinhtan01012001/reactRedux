import React, { useState } from 'react'
import { Button, Input, Modal } from 'antd'
import { toast } from 'react-toastify'
import { Category } from 'types/shirt.type'
import { useAppDispatch } from 'store'
import ButtonCusTom from 'component/button'
import TextArea from 'antd/es/input/TextArea'
import { addCategory } from '../adminCategory.api'

const AddCategory: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [itemCategory, setItemCategory] = useState<Category>({
    id: 0,
    name: '',
    description: ''
  })
  const dispatch = useAppDispatch()

  const handleInput = (e: { target: { name: any; value: any } }) => {
    setItemCategory({ ...itemCategory, [e.target.name]: e.target.value })
  }

  const handleSubmit = (item: Category) => {
    dispatch(addCategory({ body: item }))
    toast.success('Category updated successfully!', {
      position: toast.POSITION.TOP_RIGHT
    })
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
      <ButtonCusTom label='Create' onClick={showModal} length='short' />
      <Modal title='Add Category' open={isModalOpen} onCancel={handleCancel}>
        <div className='space-y-6 px-5 py-3'>
          <div>
            <div className='mb-2 block'>Name</div>
            <Input
              name='name'
              id='name'
              placeholder='Short'
              required
              className='form-edit--input'
              onChange={handleInput}
            />
          </div>
          <div>
            <div className='mb-2 block'>Description</div>
            <TextArea
              id='description'
              name='description'
              required
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500'
              onChange={handleInput}
            />
          </div>
        </div>
        <div className='my-4 px-5 text-center'>
          <ButtonCusTom label='Create' onClick={handleSubmit} length='long' />
        </div>
      </Modal>
    </>
  )
}

export default AddCategory

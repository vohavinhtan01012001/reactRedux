import React, { useEffect, useState } from 'react'
import { Button, Modal, Select } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import SliderCustom from 'component/slider/Slider'
import ButtonCusTom from 'component/button'
import { RootState, useAppDispatch } from 'store'
import { showCategoryAndSizeAndMinMaxPrice, showFilterProduct } from 'api/client/productClient.api'
import { useSelector } from 'react-redux'

const Filter: React.FC = () => {
  const categoryList = useSelector((state: RootState) => state.productClient.categoryList)
  const sizeList = useSelector((state: RootState) => state.productClient.sizeList)
  const priceMinInit = useSelector((state: RootState) => state.productClient.priceMinInit)
  const priceMaxInit = useSelector((state: RootState) => state.productClient.priceMaxInit)
  const priceMin = useSelector((state: RootState) => state.productClient.priceMin)
  const priceMax = useSelector((state: RootState) => state.productClient.priceMax)

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<{}>({
    category: 0,
    size: 0,
    gender: 0,
    priceMin: 0,
    priceMax: 0
  })
  const dispatch = useAppDispatch()
  useEffect(() => {
    const promise = dispatch(showCategoryAndSizeAndMinMaxPrice())

    return () => {
      promise.abort()
    }
  }, [dispatch])
  const showModal = () => {
    setOpen(true)
  }
  console.log(categoryList)
  const handleOk = () => {
    const valueSubmit: any[] = []
    if (priceMax == 0 || priceMax == 0) {
      valueSubmit.push({ ...value, priceMin: priceMinInit, priceMax: priceMaxInit })
    } else {
      valueSubmit.push({ ...value, priceMin: priceMin, priceMax: priceMax })
    }
    dispatch(showFilterProduct(valueSubmit[0]))
    setOpen(false)
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
  }
  const handleChangeCategory = (selectedCategoryId: any) => {
    setValue({ ...value, category: selectedCategoryId })
  }

  const handleChangeGender = (selectedGenderValue: any) => {
    setValue({ ...value, gender: selectedGenderValue })
  }

  const handleChangeSize = (selectedSizeId: any) => {
    setValue({ ...value, size: selectedSizeId })
  }
  return (
    <>
      <button type='button' onClick={showModal}>
        <div className='relative h-12 w-12 rounded-full bg-sky-500 text-center'>
          <FontAwesomeIcon icon={faFilter} className='absolute right-1/3 top-1/3 text-white' />
        </div>
      </button>
      <Modal title='Filter' open={open} onCancel={handleCancel}>
        <h1 style={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }}>Lọc sản phẩm</h1>
        <div style={{ marginTop: '20px' }}>
          <div className='d-flex'>
            <div style={{ marginTop: '20px', width: '50%' }}>
              <label id='demo-simple-select-label' style={{ fontSize: '16px', marginTop: '20px', marginRight: '10px' }}>
                Thể loại:
              </label>
              <Select
                style={{ width: 120 }}
                onChange={handleChangeCategory}
                options={
                  categoryList.map((item) => ({
                    value: item.id,
                    label: item.name
                  })) || []
                }
              />
            </div>
          </div>
          <div className='d-flex'>
            <div style={{ marginTop: '20px', width: '50%' }}>
              <label id='demo-simple-select-label' style={{ fontSize: '16px', marginTop: '20px', marginRight: '10px' }}>
                Giới tính:
              </label>
              <Select
                style={{ width: 120 }}
                onChange={handleChangeGender}
                options={[
                  { value: 0, label: 'Nam' },
                  { value: 1, label: 'Nữ' },
                  { value: 2, label: 'Nam và nữ' }
                ]}
              />
            </div>
          </div>
          <div style={{ marginTop: '20px' }}>
            <label id='demo-simple-select-label' style={{ fontSize: '16px', marginTop: '20px', marginRight: '10px' }}>
              Kích thước:
            </label>
            <Select
              style={{ width: 120 }}
              onChange={handleChangeSize}
              options={
                sizeList.map((item) => ({
                  value: item.id,
                  label: item.name
                })) || []
              }
            />
          </div>
          <div className='mt-5'>
            <label id='demo-simple-select-label' style={{ fontSize: '16px', marginTop: '30px', marginRight: '10px' }}>
              Giá tiền:
            </label>
            {/*   <input
              type='text'
              disabled
              value={value['sotien'] ? formatMoney(value['sotien']) : '0'}
              style={{
                fontSize: '16px',
                display: 'block',
                textAlign: 'center',
                margin: '0 auto',
                border: '1px solid #c6c1c1'
              }}
            /> */}
            <SliderCustom min={priceMinInit} max={priceMaxInit} />

            {/*  <InputLabel id='demo-simple-select-label' style={{ fontSize: '16px' }}>
              Từ {price[0] && formatMoney(price[0])} đến {price[1] && formatMoney(price[1])}{' '}
            </InputLabel> */}
          </div>
        </div>
        <div className='mt-9 w-full'>
          <div className='mx-auto w-1/3'>
            <ButtonCusTom label='Lọc' length='long' type='button' onClick={handleOk} />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Filter

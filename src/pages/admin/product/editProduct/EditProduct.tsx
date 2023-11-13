import React, { useEffect, useState } from 'react'
import { Form, Input, InputNumber } from 'antd'
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik'
import ImageUploadField from 'component/imageUploadField/ImageUploadField'
import { createProductSchema } from 'validaton/product.valid'
import ButtonCusTom from 'component/button'
import Swal from 'sweetalert2'
import { RootState, useAppDispatch } from 'store'
import { CreateProduct, Product } from 'types/product.type'
import { useSelector } from 'react-redux'
import { getCategoryList } from 'api/category.api'
import { getProductList, showIdProduct } from 'api/product.api'
import { useParams } from 'react-router-dom'

const EditProduct: React.FC = () => {
  const categoryList = useSelector((state: RootState) => state.category.categoryList)
  const edittingProduct = useSelector((state: RootState) => state.product.edittingProduct)
  const [showProduct, setShowProduct] = useState<Product | null>(edittingProduct)
  /* const initialValues: any = {
    name: '',
    price: 0,
    priceReduced: 0,
    quantity: 1,
    gender: 0,
    status: 0,
    categoryId: 0,
    description: '',
    image1: null,
    image2: null,
    image3: null,
    image4: null
  } */
  const [images, setImages] = useState<any>([])
  const dispatch = useAppDispatch()
  useEffect(() => {
    const promise = dispatch(getCategoryList())

    return () => {
      promise.abort()
    }
  }, [dispatch])

  const { id } = useParams()
  useEffect(() => {
    if (id !== undefined) {
      const idAsNumber: number = parseInt(id)
      const promise = dispatch(showIdProduct(idAsNumber))

      return () => {
        promise.abort()
      }
    }
  }, [dispatch, id])
  useEffect(() => {
    if (edittingProduct) {
      setShowProduct(edittingProduct)
    }
  }, [edittingProduct])
  return (
    <Formik
      initialValues={
        edittingProduct || {
          name: '',
          price: 0,
          priceReduced: 0,
          quantity: 1,
          gender: 0,
          status: 0,
          categoryId: 0,
          description: '',
          image1: null,
          image2: null,
          image3: null,
          image4: null
        }
      }
      enableReinitialize={true}
      validationSchema={createProductSchema}
      onSubmit={async (values: any) => {
        values.image1 = images[0]
        values.image2 = images[1]
        values.image3 = images[2]
        values.image4 = images[3]
        values.price = parseFloat(values.price)
        if (values.priceReduced === 0) {
          values.priceReduced = values.price
        }
        values.priceReduced = parseFloat(values.priceReduced)
        values.quantity = parseInt(values.quantity)
        values.gender = parseInt(values.gender)
        values.status = parseInt(values.status)
        if (values.categoryId === 0) {
          values.categoryId = categoryList[0].id
        } else {
          values.categoryId = parseInt(values.categoryId)
        }
        if (values.image1 == null || values.image2 == null || values.image3 == null || values.image4 == null) {
          Swal.fire({
            text: 'image is required',
            icon: 'warning'
          })
          return
        }
        console.log(values)
        console.log('Submitted values:', values)
      }}
    >
      {(formikProps) => (
        <FormikForm>
          <div className='flex items-center justify-start'>
            <div>
              <Form.Item name='name' label='Name' required>
                <Field name='name'>{({ field }: any) => <Input {...field} />}</Field>
                <ErrorMessage name='name' component='div' className='ant-form-explain' />
              </Form.Item>

              <Form.Item name='price' label='Price' required>
                <Field name='price'>
                  {({ field }: any) => (
                    <div className='flex items-center justify-start'>
                      <input type='number' {...field} className='ant-input css-dev-only-do-not-override-xu9wm8 w-40' />
                      <label className='m-0 w-20' htmlFor='VNĐ'>
                        VNĐ
                      </label>
                    </div>
                  )}
                </Field>
                <ErrorMessage name='price' component='div' className='ant-form-explain' />
              </Form.Item>
              <Form.Item name='priceReduced' label='Price Reduced'>
                <Field name='priceReduced'>
                  {({ field }: any) => (
                    <div className='flex items-center justify-start'>
                      <input type='number' {...field} className='ant-input css-dev-only-do-not-override-xu9wm8 w-40' />
                      <label className='m-0 w-20' htmlFor='VNĐ'>
                        VNĐ
                      </label>
                    </div>
                  )}
                </Field>
                <ErrorMessage name='priceReduced' component='div' className='ant-form-explain' />
              </Form.Item>
              <Form.Item name='quantity' label='Quantity' required>
                <Field name='quantity'>
                  {({ field }: any) => (
                    <input type='number' {...field} className='ant-input css-dev-only-do-not-override-xu9wm8 w-40' />
                  )}
                </Field>
                <ErrorMessage name='quantity' component='div' className='ant-form-explain' />
              </Form.Item>
            </div>
            <div className='pl-16'>
              <Form.Item name='gender' label='Gender' required>
                <Field name='gender' as='select'>
                  {({ field }: any) => (
                    <select {...field}>
                      <option value={0}>Male</option>
                      <option value={1}>Female</option>
                      <option value={2}>Both</option>
                    </select>
                  )}
                </Field>
              </Form.Item>
              <Form.Item name='status' label='Status' required>
                <Field as='select' name='status'>
                  {({ field }: any) => (
                    <select {...field}>
                      <option value={0}>Hidden</option>
                      <option value={1}>Visible</option>
                    </select>
                  )}
                </Field>
              </Form.Item>
              <Form.Item name='categoryId' label='Category' required>
                <Field as='select' name='categoryId'>
                  {({ field }: any) => (
                    <select {...field}>
                      {categoryList.map((item, index) => {
                        return <option value={item.id}>{item.name}</option>
                      })}
                    </select>
                  )}
                </Field>
              </Form.Item>
            </div>
          </div>
          <div className='w-9/12'>
            <Form.Item name='description' label='Description'>
              <Field name='description'>{({ field }: any) => <Input.TextArea {...field} rows={4} />}</Field>
              <ErrorMessage name='description' component='div' className='ant-form-explain' />
            </Form.Item>
            <Form.Item name='image' label='image (4 photos required)' required>
              <ImageUploadField setImages={setImages} images={images} />
              <ErrorMessage name='image' component='div' className='ant-form-explain' />
            </Form.Item>
          </div>
          <Form.Item>
            <ButtonCusTom label='Add Product' length='long' type='submit' onClick={undefined} />
          </Form.Item>
        </FormikForm>
      )}
    </Formik>
  )
}

export default EditProduct

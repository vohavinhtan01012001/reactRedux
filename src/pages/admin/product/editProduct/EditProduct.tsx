import React, { useEffect, useState } from 'react'
import { Form, Input, InputNumber } from 'antd'
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik'
import ImageUploadField from 'component/imageUploadField/ImageUploadField'
import { createProductSchema } from 'validator/product.valid'
import ButtonCusTom from 'component/button'
import { RootState, useAppDispatch } from 'store'
import { Product } from 'types/product.type'
import { useSelector } from 'react-redux'
import { getCategoryList } from 'api/category.api'
import { useNavigate, useParams } from 'react-router-dom'
import { showIdProduct, updateProduct } from 'api/product.api'
import Loading from 'component/loading/Loading'

const EditProduct: React.FC = () => {
  const categoryList = useSelector((state: RootState) => state.category.categoryList)
  const edittingProduct = useSelector((state: RootState) => state.product.edittingProduct)
  const loading = useSelector((state: RootState) => state.product.loading)
  const [images, setImages] = useState<any>()
  const [images2, setImages2] = useState<any>()
  const [images3, setImages3] = useState<any>()
  const [images4, setImages4] = useState<any>()
  const dispatch = useAppDispatch()
  useEffect(() => {
    const promise = dispatch(getCategoryList())

    return () => {
      promise.abort()
    }
  }, [dispatch])
  const history = useNavigate()
  const { id } = useParams()
  useEffect(() => {
    if (id !== undefined) {
      const idAsNumber: number = parseInt(id)
      dispatch(showIdProduct(idAsNumber)).then((action: any) => {
        if (action.error) {
          history('/404')
        }
      })
    }
  }, [dispatch, id])
  console.log(edittingProduct)
  return (
    <>
      {loading && <Loading />}
      <div className='mx-auto my-8 w-5/6 rounded-2xl bg-white p-10 shadow-lg'>
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
            const { image, ...remainingValues } = values
            remainingValues.image1 = images ? images[0] : undefined
            remainingValues.image2 = images2 ? images2[0] : undefined
            remainingValues.image3 = images3 ? images3[0] : undefined
            remainingValues.image4 = images4 ? images4[0] : undefined
            remainingValues.price = parseFloat(remainingValues.price)
            if (remainingValues.priceReduced === 0) {
              remainingValues.priceReduced = remainingValues.price
            }
            remainingValues.priceReduced = parseFloat(remainingValues.priceReduced)
            remainingValues.quantity = parseInt(remainingValues.quantity)
            remainingValues.gender = parseInt(remainingValues.gender)
            remainingValues.status = parseInt(remainingValues.status)
            remainingValues.categoryId = parseInt(remainingValues.categoryId)
            /*  if (values.image1 == null || values.image2 == null || values.image3 == null || values.image4 == null) {
              Swal.fire({
                text: 'image is required',
                icon: 'warning'
              })
              return
            } */
            if (id !== undefined) {
              const idAsNumber: number = parseInt(id)
              await dispatch(updateProduct({ product: remainingValues, productId: idAsNumber })).then((action: any) => {
                if (action.payload.status.statusCode === 1) {
                  history('/admin/product')
                }
              })
            }
            console.log(id)
            console.log('Submitted values:', remainingValues)
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
                          <input
                            type='number'
                            {...field}
                            className='ant-input css-dev-only-do-not-override-xu9wm8 w-40'
                          />
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
                          <input
                            type='number'
                            {...field}
                            className='ant-input css-dev-only-do-not-override-xu9wm8 w-40'
                          />
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
                        <input
                          type='number'
                          {...field}
                          className='ant-input css-dev-only-do-not-override-xu9wm8 w-40'
                        />
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
                  <Field name='description'>
                    {({ field }: any) => <Input.TextArea {...field} rows={4} className='z-10' />}
                  </Field>
                  <ErrorMessage name='description' component='div' className='ant-form-explain' />
                </Form.Item>
                <div className='flex items-center py-8'>
                  <Form.Item name='image1' label='image1' required>
                    <ImageUploadField des='edit' setImages={setImages} images={images} />
                    <ErrorMessage name='image1' component='div' className='ant-form-explain' />
                  </Form.Item>
                  <img src={edittingProduct?.image} alt='image1' className='w-20' />
                </div>
                <div className='flex items-center py-8'>
                  <Form.Item name='image2' label='image2' required>
                    <ImageUploadField des='edit' setImages={setImages2} images={images2} />
                    <ErrorMessage name='image2' component='div' className='ant-form-explain' />
                  </Form.Item>
                  <img src={edittingProduct?.image2} alt='image2' className='w-20' />
                </div>
                <div className='flex items-center py-8'>
                  <Form.Item name='image3' label='image3' required>
                    <ImageUploadField des='edit' setImages={setImages3} images={images3} />
                    <ErrorMessage name='image3' component='div' className='ant-form-explain' />
                  </Form.Item>
                  <img src={edittingProduct?.image3} alt='image3' className='w-20' />
                </div>
                <div className='flex items-center py-8'>
                  <Form.Item name='image4' label='image4' required>
                    <ImageUploadField des='edit' setImages={setImages4} images={images4} />
                    <ErrorMessage name='image4' component='div' className='ant-form-explain' />
                  </Form.Item>
                  <img src={edittingProduct?.image4} alt='image4' className='w-20' />
                </div>
              </div>
              <Form.Item>
                <ButtonCusTom label='Update' length='long' type='submit' onClick={undefined} />
              </Form.Item>
            </FormikForm>
          )}
        </Formik>
      </div>
    </>
  )
}

export default EditProduct

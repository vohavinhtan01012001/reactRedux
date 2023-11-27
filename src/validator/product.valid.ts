import * as Yup from 'yup'

export const createProductSchema = Yup.object({
  name: Yup.string().min(3).max(30).required(),
  price: Yup.number().min(0).required(),
  /*  priceReduced: Yup.number().min(0).max(Yup.ref('price'), 'Price Reduced must be less than or equal to Price'), */
  quantity: Yup.number().min(0).required()
  /*  image: Yup.array()
    .required('Please upload all four product images')
    .test('maxImages', 'You can only upload up to 4 images', (value) => value.length <= 4) */
})

export const updateProductSchema = Yup.object({
  id: Yup.number(),
  name: Yup.string().min(3).max(30).required(),
  price: Yup.number().min(0).required(),
  /*  priceReduced: Yup.number().min(0).max(Yup.ref('price'), 'Price Reduced must be less than or equal to Price'), */
  quantity: Yup.number().min(0).required()
  /*  image: Yup.array()
    .required('Please upload all four product images')
    .test('maxImages', 'You can only upload up to 4 images', (value) => value.length <= 4) */
})

import * as Yup from 'yup'

export const createCategorySchema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string()
})

export const updateCategorySchema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string()
})

import * as Yup from 'yup'

export const createPromotionSchema = Yup.object({
  title: Yup.string().required().min(3).max(50),
  discount: Yup.number().required().min(0).max(100),
  // startDate: Yup.date().required().min(Yup.ref('endDate')),
  // endDate: Yup.date().required().max(Yup.ref('startDate')),
  status: Yup.number().oneOf([0, 1]).required()
})


export const updatePromotionSchema = Yup.object({
  title: Yup.string().required().min(3).max(50),
  discount: Yup.number().required().min(0).max(100),
  // startDate: Yup.date().required().min(Yup.ref('endDate')),
  // endDate: Yup.date().required().max(Yup.ref('startDate')),
  status: Yup.number().oneOf([0, 1]).required()
})
export interface Promotion {
  id: number
  title: string
  discount: number
  startDate: string
  endDate: string
  status: number
}

export interface CreatePromotion {
  title: string
  discount: number
  startDate: string | null
  endDate: string | null
  status: number
}

export interface UpdateStatusPromotion {
  status: any
  promotionId: number
}

export interface UpdatePromotion {
  title: string
  discount: number
  startDate: string
  endDate: string
  status: number
}

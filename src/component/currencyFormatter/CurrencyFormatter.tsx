import React from 'react'

function CurrencyFormatter(value: any) {
  const formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' VND'
  return <span>{formattedValue}</span>
}

export default CurrencyFormatter

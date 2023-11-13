import React from 'react'

function CurrencyFormatter(value: any) {
  // Định dạng giá trị thành tiền tệ VND và thêm " VND" sau giá trị
  const formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' VND'

  return <span>{formattedValue}</span>
}

export default CurrencyFormatter

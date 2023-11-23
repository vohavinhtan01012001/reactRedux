import React from 'react'
import moment from 'moment'

interface FormattedDateProps {
  date: Date | string | number | null | undefined
}

const DateFormatter: React.FC<FormattedDateProps> = ({ date }) => {
  if (!date) {
    return <span>Invalid Date</span>
  }

  const formattedDate = moment(date).format('YYYY-MM-DD HH:mm:YY') // Định dạng ngày tháng sử dụng Moment.js

  return <span>{formattedDate}</span>
}

export default DateFormatter

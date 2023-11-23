import React, { useCallback, useEffect, useState } from 'react'
import { DatePicker, Space } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/en' // Import locale if needed
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import moment from 'moment'

const { RangePicker } = DatePicker

interface PropsDatetime {
  setDatetime: React.Dispatch<React.SetStateAction<[string, string]>>
  datetime: [string, string]
}

const DateTimeInput: React.FC<PropsDatetime> = ({ setDatetime, datetime }) => {
  const handleOnChange = useCallback(
    (dates: [dayjs.Dayjs, dayjs.Dayjs], dateStrings: [string, string]) => {
      /* console.log('Selected Range: ', dates)
      console.log('Formatted Selected Range: ', dateStrings) */

      const formattedDates: [string, string] = [dates[0]?.toISOString(), dates[1]?.toISOString()]
      console.log('Formatted Selected Range: ', formattedDates)
      setDatetime(formattedDates)
    },
    [setDatetime]
  )
  console.log(datetime)
  return (
    <Space direction='vertical' size={12}>
      <RangePicker
        showTime
        value={[dayjs(datetime[0], 'YYYY-MM-DD HH:mm:YY'), dayjs(datetime[1], 'YYYY-MM-DD HH:mm:YY')]}
        onChange={(dates, dateStrings) =>
          handleOnChange(dates as [dayjs.Dayjs, dayjs.Dayjs], dateStrings as [string, string])
        }
      />
    </Space>
  )
}

export default DateTimeInput

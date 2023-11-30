import React from 'react'
import { Input, Space } from 'antd'
import { SearchProps } from 'antd/es/input'
import styles from './searchAdmin.module.scss'
import { searchProduct } from 'api/admin/product.api'
import { useAppDispatch } from 'store'

const { Search } = Input
interface SearchAdminProps {
  onSearch: (searchTerm: string) => void
  placeholder: string
}
const SearchAdmin: React.FC<SearchAdminProps> = ({ onSearch, placeholder }) => {
  return (
    <Space direction='vertical'>
      <Search placeholder={placeholder} onSearch={onSearch} enterButton className={styles['button-input']} />
    </Space>
  )
}

export default SearchAdmin

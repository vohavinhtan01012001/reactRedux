import React, { ChangeEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faSearch } from '@fortawesome/free-solid-svg-icons'
import './searchClient.scss'

interface SearchClientProps {
  onSearch: (searchTerm: string) => void
  placeholder: string
}

const SearchClient: React.FC<SearchClientProps> = ({ onSearch, placeholder }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value
    onSearch(searchTerm) // Call the onSearch function with the searchTerm
  }

  return (
    <div className='search-client'>
      <div className='search-box'>
        <button className='btn-search'>
          <FontAwesomeIcon icon={faSearch} /* className='text-white focus:text-gray-500' */ />
        </button>
        <input
          type='text'
          className='input-search'
          placeholder={placeholder}
          onChange={handleInputChange} // Use the intermediary function handleInputChange
        />
      </div>
    </div>
  )
}

export default SearchClient

import React, { useState } from 'react'
interface ImageUploadFieldProps {
  setImages: React.Dispatch<React.SetStateAction<File[]>>
  images: File[]
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({ setImages, images }) => {
  const handleImageChange = (e: any) => {
    const files = e.target.files

    if (files.length > 0) {
      const selectedImages: any = Array.from(files).slice(0, 4) // Lấy tối đa 4 hình ảnh
      setImages(selectedImages)
    }
  }

  return (
    <div>
      <input
        type='file'
        accept='image/*'
        multiple
        onChange={handleImageChange}
        className='block w-full border-0 text-sm
        text-slate-500 file:mr-4 file:rounded-md file:border-0
        file:bg-pink-50 file:px-4 file:py-2
        file:text-sm file:font-semibold
        file:text-pink-700 hover:file:bg-pink-100'
      />
      <div className='flex'>
        {images.map((image, index) => (
          <img
            key={index}
            src={URL.createObjectURL(image)}
            alt={`Image ${index}`}
            width='100'
            height='100'
            className='px-2'
          />
        ))}
      </div>
    </div>
  )
}

export default ImageUploadField

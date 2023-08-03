import React from 'react'

const Story = ({img, name}) => {
  return (
    <div className=''>
        <img className="h-14 w-14 rounded-full p-[1.5px] cursor-pointer object-contain transform hover-scale-110 transition duration-200 ease-out border-2 border-red-500" src={img} alt="avatar" />
        <p className='text-xs w-14 truncate text-center'>{name}</p>
    </div>
  )
}

export default Story
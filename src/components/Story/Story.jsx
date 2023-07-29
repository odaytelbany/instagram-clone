import React from 'react'

const Story = ({img, name}) => {
  return (
    <div className=''>
        <img style={{backgroundImage: "linear-gradient(45deg, #ff0062, #ff7300, #ff0062)"}} className="h-14 w-14 rounded-full p-[2px] cursor-pointer object-contain transform hover-scale-110 transition duration-200 ease-out" src={img} alt="" />
        <p className='text-xs w-14 truncate text-center'>{name}</p>
    </div>
  )
}

export default Story
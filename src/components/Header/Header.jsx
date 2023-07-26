import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div>
      <div className='flex justify-between max-w-6xl'>
        {/* left  */}
        <div className='relative w-24 h-24 hidden lg:inline-grid'>
          <Image 
            src="https://links.papareact.com/ocw"
            fill={true}
            objectFit='contain'
          />
        </div>

        <div className='relative w-10 h-10 lg:hidden'>
          <Image 
            src="https://links.papareact.com/jjm"
            fill={true}
            objectFit='contain'
          />
        </div>

        {/* middle  */}

        {/* right  */}
      </div>
    </div>
  )
}

export default Header
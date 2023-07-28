import Image from 'next/image'
import React from 'react'
import Icon from "/public/1f914.png"
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import {HomeIcon} from "@heroicons/react/solid";

const Header = () => {
  return (
    <div className='border-b shadow-sm sticky top-0 bg-white z-50'>
      <div className="flex justify-between items-center max-w-6xl lg:mx-auto">
        <div className="relative w-24 h-10 hidden lg:inline-grid cursor-pointer">
          <Image
            src="https://links.papareact.com/ocw"
            fill={true} 
            objectFit="contain"
            />
        </div>

        <div className="relative w-10 h-10 lg:hidden flex-shrink-0 cursor-pointer">
          <Image
            src="https://links.papareact.com/jjm"
            fill={true}
            objectFit="contain"
          />
        </div>

        {/* middle  */}

        <div className='max-w-screen-sm'>
          <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute flex justify-center items-center inset-y-0 pl-3">
              <SearchIcon className="w-5 h-5 text-grey-500" />
            </div>
            <input
              className="block w-full sm:text-sm bg-gray-50 border-gray-300 focus:border-black focus:ring-black rounded-md pl-10"
              placeholder="Search"
            />
          </div>
        </div>

        
        {/* right  */}
        <div className='flex items-center justify-end space-x-4'>
          <HomeIcon className='navBtn'/>
          <div className='relative'>
            <PaperAirplaneIcon className='navBtn rotate-45'/>
            <div className='w-5 h-5 absolute -top-1 -right-2 text-xs text-white bg-red-500 rounded-full flex items-center justify-center animate-pulse'>3</div>
          </div>
          <PlusCircleIcon className='navBtn'/>
          <UserGroupIcon className='navBtn'/>
          <HeartIcon className='navBtn'/>
          <Image src={Icon} className='h-10 w-10 cursor-pointer rounded-full'/>
        </div>
      </div>
    </div>
  );
};

export default Header
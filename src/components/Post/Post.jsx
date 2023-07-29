import React from 'react'
import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    PaperAirplaneIcon,
    HeartIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid';


const Post = ({username,avatar, img, caption,}) => {
  return (
    <div className='bg-white my-7 rounded-sm'>
        {/* header */}

        <div className='flex items-center p-4'>
            <img src={avatar} alt="" className='w-12 h-12 rounded-full mr-3 object-contain p-1'/>
            <p className='font-bold flex-1'>{username}</p>
            <DotsHorizontalIcon className='h-5'/>
        </div>

        {/* img */}
        <div>
            <img src={img} alt="" className='w-full object-cover'/>
        </div>
        {/* buttons */}
        <div className='flex justify-between px-4 mt-4 items-center'>
            <div className='flex space-x-4'>
                <HeartIcon className='btn'/>
                <ChatIcon className='btn'/>
                <PaperAirplaneIcon className='btn'/>
            </div>
            <BookmarkIcon className='btn'/>
        </div>
    </div>
  )
}

export default Post
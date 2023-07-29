import React from 'react'
import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    PaperAirplaneIcon,
    HeartIcon,
    EmojiHappyIcon
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid';


const Post = ({username,avatar, img, caption,}) => {
  return (
    <div className='bg-white my-7 rounded-sm shadow-md'>
        {/* header */}
        <div className='flex items-center p-4'>
            <img src={avatar} alt="" className='cursor-pointer w-12 h-12 rounded-full mr-2 object-contain p-1'/>
            <p className='font-bold flex-1'>{username}</p>
            <DotsHorizontalIcon className='h-5'/>
        </div>

        {/* img */}
        <div>
            <img src={img} alt="" className='w-full object-cover'/>
        </div>
        {/* buttons */}
        <div className='flex justify-between px-4 mt-4 items-center'>
            <div className='flex space-x-4 items-center'>
                <HeartIcon className='btn'/>
                <ChatIcon className='btn'/>
                <PaperAirplaneIcon className='btn rotate-[65deg]'/>
            </div>
            <BookmarkIcon className='btn'/>
        </div>
        {/* caption */}
        <div className="p-5">
            {caption}
        </div>
        {/* comments */}
        <form className='flex items-center p-4'>
            <EmojiHappyIcon className='h-7'/>
            <input type="text" className='flex-1 outline-none focus:ring-0 border-none' placeholder='Add a comment'/>
            <button className='font-semibold text-blue-400'>Post</button>
        </form>
    </div>
  )
}

export default Post
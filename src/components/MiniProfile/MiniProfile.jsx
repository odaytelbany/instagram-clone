"use client"
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

const MiniProfile = () => {
  const {data: session} = useSession();
  return (
    <div className='ml-10 flex items-center w-full mt-8'>
        <img className="rounded-full h-16 w-16 p-1 border mr-3" src={session?.user?.image} alt="avatar" />
        <div className='flex-1'>
            <h2 className='font-bold'>{session?.user?.username}</h2>
            <h3 className='text-sm text-gray-500'>welcome to instagram</h3>
        </div>
        <button onClick={signOut} className='text-sm font-semibold cursor-pointer text-blue-400'>Sign Out</button>
    </div>
  )
}

export default MiniProfile
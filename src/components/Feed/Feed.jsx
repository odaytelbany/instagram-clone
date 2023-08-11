"use client"
import React from 'react'
import Stories from '../Stories/Stories'
import Posts from '../Posts/Posts'
import MiniProfile from '../MiniProfile/MiniProfile'
import Suggestions from '../Suggestions/Suggestions'
import SignInBtn from '../SignInBtn/SignInBtn'
import { useSession } from 'next-auth/react'

const Feed = () => {
  const {data: session} = useSession();
  return (
    <main className={`lg:px-24 grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-5xl mx-auto ${!session && "!grid-cols-1 !max-w-3xl"}`}>
        <section className='col-span-2'>
            {/* <SignInBtn /> */}
            <Stories />
            <Posts />
        </section>

        {session && 
        <section className='hidden xl:inline md:col-span-1'>
          <div className=''>
            <MiniProfile />
            <Suggestions />
          </div>
        </section>
        }
    </main>
  )
}

export default Feed
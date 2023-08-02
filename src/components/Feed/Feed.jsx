import React from 'react'
import Stories from '../Stories/Stories'
import Posts from '../Posts/Posts'
import MiniProfile from '../MiniProfile/MiniProfile'
import Suggestions from '../Suggestions/Suggestions'
import SignInBtn from '../SignInBtn/SignInBtn'

const Feed = () => {
  return (
    <main className='lg:px-24 grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto'>
        <section className='col-span-2'>
            <Stories />
            <Posts />
        </section>

        <section className='hidden xl:inline md:col-span-1'>
          <div className=''>
            <MiniProfile />
            <Suggestions />
          </div>
        </section>
    </main>
  )
}

export default Feed
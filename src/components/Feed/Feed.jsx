import React from 'react'
import Stories from '../Stories/Stories'
import Posts from '../Posts/Posts'

const Feed = () => {
  return (
    <main className='lg:px-12 grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto'>
        <section className='col-span-2'>
            <Stories />
            <Posts />
        </section>

        <section>
            {/* profile */}
            {/* suggestions */}
        </section>
    </main>
  )
}

export default Feed
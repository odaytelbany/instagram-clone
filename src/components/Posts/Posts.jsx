import React from 'react'
import Post from '../Post/Post'

const Posts = () => {
    const posts = [
        {
            id: 1,
            username: "odaytelbany",
            avatar: "https://avatars.githubusercontent.com/u/100791118?v=4",
            img: "https://images.unsplash.com/photo-1640957507202-6e5ad7cd3365?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=425&q=80",
            caption: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi vitae necessitatibus iure accusamus dolore ad dicta et id magnam numquam quas unde consequatur eaque, fugiat magni a. Ratione, error alias!"
        },
        {
            id: 2,
            username: "Aliali",
            avatar: "https://avatars.githubusercontent.com/u/100791118?v=4",
            img: "https://play-lh.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3=w240-h480-rw",
            caption: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi vitae necessitatibus iure accusamus dolore ad dicta et id magnam numquam quas unde consequatur eaque, fugiat magni a. Ratione, error alias!"
        }
    ]

  return (
    <div>
        {
            posts.map((post) => (
                <Post key={post.id} {...post}/>
            ))
        }        
    </div>
  )
}

export default Posts
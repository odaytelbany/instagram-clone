"use client"
import Post from '@/components/Post/Post';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase';

const SinglePost = ({params}) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
            snapshot => {
                setPosts(snapshot.docs);
            }        
        )

        return unsubscribe;
    }, [db])
    
  return (
    <div className='scroll-px-40 md:max-w-lg lg:max-w-3xl xl:max-w-5xl mx-auto relative'>
        {
            posts?.map((post) => {
                if (post.id === params.id){
                    return <Post key={post.id} id={post.id} {...post.data()}/>
                }
            })
        }        
    </div>
  )
}

export default SinglePost
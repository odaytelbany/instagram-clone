"use client"
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase';
import Post from '@/components/Post/Post';

const page = () => {
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
        <h1>Save posts</h1>
        {
            posts?.map((post) => {
                if (post.data().saved){
                    return <Post key={post.id} id={post.id} {...post.data()}/>
                }
            })
        }  
    </div>
  )
}

export default page
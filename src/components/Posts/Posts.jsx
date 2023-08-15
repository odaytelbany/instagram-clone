import React, { useEffect, useState } from 'react'
import Post from '../Post/Post'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../../firebase';

const Posts = () => {
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
    <div>
        {
            posts?.map((post) => {
                console.log(post.data())
                return <Post key={post.id} id={post.id} {...post.data()}/>
            })
        }        
    </div>
  )
}

export default Posts
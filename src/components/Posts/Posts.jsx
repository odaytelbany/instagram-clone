import React, { useEffect, useState } from 'react'
import Post from '../Post/Post'
import { Firestore, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../../firebase';
import Link from 'next/link';
// import { useRecoilState } from 'recoil';
// import { postsState } from '@/atoms/postsAtom';
const Posts = () => {
    // const [posts, setPosts] = useRecoilState(postsState);
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
                return (
                    <Link href={`/${post.id}`}>
                        <Post key={post.id} id={post.id} {...post.data()}/>
                    </Link>
                )
            })
        }        
    </div>
  )
}

export default Posts
import React, { useEffect, useState } from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  PaperAirplaneIcon,
  HeartIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { db } from "../../../firebase";
import Moment from "react-moment";


const Post = ({ id, username, profileImg, image, caption }) => {
    const {data: session} = useSession();
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);

    const sendComment = async (e) => {
        e.preventDefault();

        const commentToSend = comment;
        setComment('');

        await addDoc(collection(db, 'posts', id, 'comments'), {
            comment: commentToSend,
            username: session.user.username,
            userImage: session.user.image,
            timestamp: serverTimestamp()
        })
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')),
            snapshot => {
                setComments(snapshot.docs);
            }
        )

        return unsubscribe;
    },[db, id])

    const likePost = async (e) => {
      !hasLiked ? 
      setDoc(doc(db, 'posts', id, 'likes', session.user.uid),{
        username: session.user.username
      }) : 
      deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid))
    }

    useEffect(() => {
      const unsubscribe = onSnapshot(collection(db, 'posts', id, 'likes'),
          snapshot => {
              setLikes(snapshot.docs);
          }
      )

      return unsubscribe;
  },[db, id])

  useEffect(() => {
    setHasLiked(likes.findIndex(like => like.id === session?.user?.uid) !== -1)
  }, [likes])
           
  console.log(likes)
  return (
    image && (
      <div className="bg-white my-7 rounded-sm shadow-md">
        {/* header */}
        <div className="flex items-center p-4">
          <img
            src={profileImg}
            alt="avatar"
            className="cursor-pointer w-12 h-12 rounded-full mr-2 object-contain p-1"
          />
          <p className="font-bold flex-1">{username}</p>
          <DotsHorizontalIcon className="h-5" />
        </div>

        {/* img */}
        <div>
          <img src={image} alt="" className="w-full object-cover" />
        </div>
        {/* buttons */}
        <div className="flex justify-between px-4 mt-4 items-center">
          <div className="flex space-x-4 items-center">
            {
              !hasLiked ? <HeartIcon className="btn" onClick={likePost}/> : <HeartIconFilled className="btn text-red-500" onClick={likePost}/>
            }
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn rotate-90" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
        {/* caption */}
        <div className="p-5 overflow-x-scroll scrollbar-thumb-black scrollbar-thin">
          {likes.length > 0 && <p className="font-semibold mb-1">{likes?.length} Likes</p>}
          <span className="font-bold mr-1">{session.user.username}</span>
          {caption}
        </div>
        {/* comments */}

        {
           comments && 
           <div>
                {
                    comments.map((comment) => (
                        <div className="flex items-center ml-8 mb-3 overflow-x-scroll scrollbar-thumb-black scrollbar-thin  ">
                            <img className="h-6 rounded-full" src={comment.data().userImage} alt="" /> {" "}
                            <p className="flex flex-1 items-center ml-2">
                                <span className="font-bold mr-2">{comment.data().username}</span>
                                <p className="text-sm">{comment.data().comment}</p>
                            </p>

                            <Moment fromNow interval={1000} className="pr-5 text-xs">
                                {comment?.data().timestamp?.toDate()}
                            </Moment>
                        </div>
                    ))
                }
           </div>
        }

        {/* comments form  */}
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            className="flex-1 outline-none focus:ring-0 border-none"
            placeholder="Add a comment"
          />
          <button onClick={sendComment} disabled={!comment.trim()} type="submit" className="font-semibold text-blue-400">
            Post
          </button>
        </form>
      </div>
    )
  );
};

export default Post;

import React, { useEffect, useState } from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  PaperAirplaneIcon,
  HeartIcon,
  EmojiHappyIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { db } from "../../../firebase";
import EmojiPicker from "emoji-picker-react";
import Comment from "../Comment/Comment";

const Post = ({ id, uid, username, profileImg, image, caption }) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [postDropMenu, setPostDropMenu] = useState(false);
  const [moreComments, setMoreComments] = useState(2);
  const [openEmoji, setOpenEmoji] = useState(false);

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");
    setOpenEmoji(false);

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      uid: session.user.uid,
      timestamp: serverTimestamp(),
    });
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );

    return unsubscribe;
  }, [db, id]);

  const likePost = async (e) => {
    !hasLiked
      ? await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
          username: session.user.username,
        })
      : await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
  };

  const deletePost = async (e) => {
    if (uid == session?.user?.uid) {
      await deleteDoc(doc(db, "posts", id));
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot) => {
        setLikes(snapshot.docs);
      }
    );

    return unsubscribe;
  }, [db, id]);

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);

  // For the Emoji picker
  const emojiClickHandler = (e) => {
    // setComment(prev => prev + emojiObject);
    console.log(e.emoji);
    setComment((prev) => prev + e.emoji);
  };

  return (
    image && (
      <div className="relative bg-white my-7 rounded-sm shadow-md">
        {/* header */}
        <div className="flex items-center p-4">
          <img
            src={profileImg}
            alt="avatar"
            className="cursor-pointer w-12 h-12 rounded-full mr-2 object-contain p-1"
          />
          <p className="font-bold flex-1">{username}</p>
          <div
            onClick={() => setPostDropMenu((prev) => !prev)}
            className=" hover:bg-gray-200 cursor-pointer rounded-full p-1 transition-all delay-100 ease-in"
          >
            <DotsHorizontalIcon className="h-5" />
          </div>
        </div>

        {/* img */}
        <div>
          <img src={image} alt="" className="w-full object-cover" />
        </div>
        {/* buttons */}
        {session && (
          <div className="flex justify-between px-4 mt-4 items-center">
            <div className="flex space-x-4 items-center">
              {!hasLiked ? (
                <HeartIcon className="btn" onClick={likePost} />
              ) : (
                <HeartIconFilled
                  className="btn text-red-500"
                  onClick={likePost}
                />
              )}
              <ChatIcon className="btn" />
              <PaperAirplaneIcon className="btn rotate-90" />
            </div>
            <BookmarkIcon className="btn" />
          </div>
        )}
        {/* caption */}
        <div className="p-5 overflow-x-scroll scrollbar-thumb-black scrollbar-thin">
          {likes.length > 0 && (
            <p className="font-semibold mb-1">{likes?.length} Likes</p>
          )}
          <span className="font-bold mr-1">{username}</span>
          {caption}
        </div>
        {/* comments */}

        {comments && (
          <div className="flex flex-col">
            {comments.slice(0, moreComments).map((comment) => (
              <Comment key={comment.id} comment={comment} postId={id}/>
            ))}

            <button className="mx-auto content-center">
              {comments.length > 2 && moreComments !== -1 && (
                <PlusCircleIcon
                  onClick={() => setMoreComments(-1)}
                  className="h-6 hover:scale-125 ease-out transition-all delay-75 text-center"
                />
              )}
            </button>
          </div>
        )}

        {/* comments form  */}
        {session && (
          <form className="flex items-center p-4 relative">
            <EmojiHappyIcon
              className="h-7 hover:text-gray-400 cursor-pointer"
              onClick={() => setOpenEmoji((prev) => !prev)}
            />
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              type="text"
              className="flex-1 outline-none focus:ring-0 border-none"
              placeholder="Add a comment"
            />
            <button
              onClick={sendComment}
              disabled={!comment.trim()}
              type="submit"
              className="font-semibold text-blue-400"
            >
              Post
            </button>
          </form>
        )}
        {openEmoji && (
          <div className="absolute bottom-16 left-4">
            <EmojiPicker
              onEmojiClick={emojiClickHandler}
              lazyLoadEmojis={true}
            />
          </div>
        )}

        {/* drop menu  */}
        {postDropMenu && (
          <ul className="absolute top-16 right-5 bg-white w-1/4 flex flex-col drop-shadow-2xl shadow-2xl rounded-sm">
            {session?.user?.uid === uid && (
              <li
                onClick={deletePost}
                className="text-center text-red-500 hover:bg-slate-50 transition-all delay-50 cursor-pointer border-b-2 border-gray-200"
              >
                Delete
              </li>
            )}
            <li className="text-center hover:bg-slate-50 transition-all delay-50 cursor-pointer border-gray-200">
              Shere
            </li>
          </ul>
        )}
      </div>
    )
  );
};

export default Post;

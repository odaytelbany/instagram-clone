"use client"
import React, { useEffect, useRef, useState } from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  PaperAirplaneIcon,
  HeartIcon,
  EmojiHappyIcon,
  PlusCircleIcon,
  TrashIcon,
  XIcon,
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
import { db, storage } from "../../../firebase";
import EmojiPicker from "emoji-picker-react";
import Comment from "../Comment/Comment";
import { deleteObject, getMetadata, ref } from "firebase/storage";
import ReactPlayer from "react-player";
import Link from "next/link";
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  InstapaperShareButton,
  InstapaperIcon,
  TwitterIcon,
  TwitterShareButton,
  LinkedinIcon,
  LinkedinShareButton,
} from "react-share";

const Post = ({ id, uid, username, profileImg, image, caption }) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [postDropMenu, setPostDropMenu] = useState(false);
  const [moreComments, setMoreComments] = useState(2);
  const [openEmoji, setOpenEmoji] = useState(false);
  const [fileType, setFiletype] = useState("");
  const [share, setShare] = useState(false);

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

  // Delete Post
  const fileRef = ref(storage, image);
  const deletePost = async (e) => {
    if (uid == session?.user?.uid) {
      await deleteDoc(doc(db, "posts", id));
      await deleteObject(fileRef);
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
    setComment((prev) => prev + e.emoji);
  };

  // Get the file type
  useEffect(() => {
    async function getData() {
      await getMetadata(fileRef)
        .then((metadata) => {
          setFiletype(metadata.contentType.split("/")[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getData();
  }, [image]);

  const shareUrl = `http://localhost:3000/${id}`;
  const copyRef = useRef();
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
        <Link href={`/${id}`} className="relative">
          {fileType === "video" ? (
            // <video src={image} controls="controls"/>
            <div className="relative">
              <ReactPlayer
                url={image}
                controls={true}
                className=""
                width={"100%"}
                height={"100%"}
                // config={{
                //   youtube: {
                //     playerVars: { showinfo: 1 }
                //   },
                //   facebook: {
                //     appId: '12345'
                //   }
                // }}
              />
            </div>
          ) : fileType === "image" ? (
            <div>
              <img src={image} alt="" className="w-full object-cover" />
            </div>
          ) : (
            ""
          )}
        </Link>

        {/* buttons */}
        {session && (
          <div className="flex justify-between px-4 mt-4 items-center relative">
            <div className="flex space-x-4 items-center">
              {!hasLiked ? (
                <HeartIcon className="btn" onClick={likePost} />
              ) : (
                <HeartIconFilled
                  className="btn text-red-500"
                  onClick={likePost}
                />
              )}
              <Link href={`/${id}`}>
                <ChatIcon className="btn" />
              </Link>
              <PaperAirplaneIcon
                className="btn rotate-90"
                onClick={() => setShare((prev) => !prev)}
              />
            </div>
            <BookmarkIcon className="btn" />

            {/* share  */}
            {share && (
              <div className="p-3 rounded bg-white shadow-xl drop-shadow-xl w-[98%] absolute z-40 bottom-12 mx-auto left-[1%] overflow-hidden">
                <div className="share-header flex">
                  <h1 className="flex-1 text-lg font-semibold">Share</h1>
                  <XIcon className="btn" onClick={() => setShare(false)}/>
                </div>
                <div className="icons mx-auto w-fit mt-4">
                  <FacebookShareButton
                    url={shareUrl}
                    quote={"Title or jo bhi aapko likhna ho"}
                    hashtag={"#portfolio..."}
                    className="mr-2 btn"
                  >
                    <FacebookIcon size={50} round={true} />
                  </FacebookShareButton>

                  <FacebookMessengerShareButton
                    url={shareUrl}
                    quote={"Title or jo bhi aapko likhna ho"}
                    hashtag={"#portfolio..."}
                    className="mr-2 btn"
                  >
                    <FacebookMessengerIcon size={50} round={true} />
                  </FacebookMessengerShareButton>

                  <InstapaperShareButton
                    url={shareUrl}
                    quote={"Title or jo bhi aapko likhna ho"}
                    hashtag={"#portfolio..."}
                    className="mr-2 btn"
                  >
                    <InstapaperIcon size={50} round={true} />
                  </InstapaperShareButton>

                  <WhatsappShareButton
                    url={shareUrl}
                    quote={"Title or jo bhi aapko likhna ho"}
                    hashtag={"#portfolio..."}
                    className="mr-2 btn"
                  >
                    <WhatsappIcon size={50} round={true} />
                  </WhatsappShareButton>

                  <TelegramShareButton
                    url={shareUrl}
                    quote={"Title or jo bhi aapko likhna ho"}
                    hashtag={"#portfolio..."}
                    className="mr-2 btn"
                  >
                    <TelegramIcon size={50} round={true} />
                  </TelegramShareButton>

                  <TwitterShareButton
                    url={shareUrl}
                    quote={"Title or jo bhi aapko likhna ho"}
                    hashtag={"#portfolio..."}
                    className="mr-2 btn"
                  >
                    <TwitterIcon size={50} round={true} />
                  </TwitterShareButton>

                  <LinkedinShareButton
                    url={shareUrl}
                    quote={"Title or jo bhi aapko likhna ho"}
                    hashtag={"#portfolio..."}
                    className="mr-2 btn"
                  >
                    <LinkedinIcon size={50} round={true} />
                  </LinkedinShareButton>
                </div>
                <div className="share-copy rounded-lg border-2 border-gray-200 p-2 bg-gray-100 mx-auto flex mt-4 w-4/5 justify-between items-center">
                  <input className="flex-1 bg-transparent h-fit p-0 border-none rounded-lg" type="text" value={`http://localhost:3000/${id}`} ref={copyRef}/>
                  <button className="bg-red-500 hover:bg-red-300 transition-all ease-in delay-75 text-white rounded-3xl px-3 py-2 ml-2" onClick={() => navigator.clipboard.writeText(`http://localhost:3000/${id}`)}>Copy</button>
                </div>
              </div>
            )}
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
              <Comment key={comment.id} comment={comment} postId={id} />
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

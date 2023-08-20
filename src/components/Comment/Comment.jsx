"use client";
import React, { useState } from "react";
import Moment from "react-moment";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";

const Comment = ({ postId, comment }) => {
  const [commentDropMenu, setCommentDropMenu] = useState(false);
  const { data: session } = useSession();

  //delete comment
  const deleteComment = async () => {
    await deleteDoc(doc(db, "posts", postId, "comments", comment.id));
  };

  return (
    <div className="relative">
      <div className="relative flex items-center ml-8 mb-3 overflow-x-scroll scrollbar-thumb-black scrollbar-thin  ">
        <img
          className="h-6 rounded-full"
          src={comment.data().userImage}
          alt=""
        />{" "}
        <div className="flex flex-1 items-center ml-2">
          <span className="font-bold mr-2">{comment.data().username}</span>
          <p className="text-sm">{comment.data().comment}</p>
        </div>
        <Moment fromNow interval={1000} className="mr-2 text-xs">
          {comment?.data().timestamp?.toDate()}
        </Moment>
        <div
          onClick={() => setCommentDropMenu((prev) => !prev)}
          className="mr-4 rounded-full hover:bg-gray-200 transition-all ease-in delay-100 p-1"
        >
          <DotsHorizontalIcon className="h-4" />
        </div>
      </div>

      {commentDropMenu && (
          <ul className="absolute top-7 right-5 bg-white w-1/4 flex flex-col drop-shadow-xl shadow-xl rounded-sm z-50">
            {session?.user?.uid === comment.data().uid && (
              <li
                onClick={deleteComment}
                className="text-center text-red-500 hover:bg-slate-50 transition-all delay-50 cursor-pointer border-b-2 border-gray-200"
              >
                Delete
              </li>
            )}
            <li className="text-center hover:bg-slate-50 transition-all delay-50 cursor-pointer border-gray-200">
              Rport
            </li>
          </ul>
        )}
    </div>
  );
};

export default Comment;

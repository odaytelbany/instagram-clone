"use client"
import React, { Suspense } from "react";
import Stories from "../Stories/Stories";
import Posts from "../Posts/Posts";
import MiniProfile from "../MiniProfile/MiniProfile";
import Suggestions from "../Suggestions/Suggestions";
import { useSession } from "next-auth/react";
import Loading from "@/app/loading";

const Feed = () => {
  const { data: session } = useSession();
  return (
    <main
      className={`lg:px-24 grid grid-cols-1 md:grid-cols-2 md:max-w-lg lg:max-w-3xl xl:grid-cols-3 xl:max-w-5xl mx-auto ${
        !session && "!grid-cols-1 !max-w-3xl"
      }`}
    >
      <section className="col-span-2">
        <Stories />
        <Posts />
      </section>

      {session && (
        <Suspense fallback={Loading}>
          <section className="hidden xl:inline md:col-span-1">
            <div className="">
              <MiniProfile />
              <Suggestions />
            </div>
          </section>
        </Suspense>
      )}
    </main>
  );
};

export default Feed
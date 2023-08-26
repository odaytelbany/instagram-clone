"use client";
import React from "react";
import { ColorRing } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="text-center">
      <ColorRing
        visible={true}
        height="60"
        width="60"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#e15b64", "#f47e60"]}
      />
      {/* <h2 className="text-red-600">Loading...</h2> */}
    </div>
  );
};

export default Loading;

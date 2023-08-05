'use client';
import React from 'react';
import { signIn } from 'next-auth/react';

const SignInBtn = ({ name }) => {
  return (
    <button
      onClick={() => signIn(name.toLowerCase(), {callbackUrl: "/"})}
      className="flex items-center gap-4 shadow-xl rounded-lg pl-3"
    >
      <span className="bg-blue-500 text-white px-4 py-3">
        Sign in with {name}
      </span>
    </button>
  );
};

export default SignInBtn;

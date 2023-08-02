"use client"
import React from 'react'
import { signIn } from 'next-auth/react'

const SignInBtn = () => {
  return (
    <button onClick={() => signIn("google")} className='flex items-center gap-4 shadow-xl rounded-lg pl-3'>
        <span className='bg-blue-500 text-white px-4 py-3'>
            Sign in with Google
        </span>
    </button>
  )
}

export default SignInBtn
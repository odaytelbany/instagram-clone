'use client';

import React, { use } from 'react';
import { getProviders } from 'next-auth/react';
import SignInBtn from '../../components/SignInBtn/SignInBtn';

function getData() {
  const providers =  getProviders();

  return providers;
}

export default function SignIn() {
  const providers = use(getData());

  return (
    <div className='flex flex-col justify-center items-center'>
      <img src='https://links.papareact.com/ocw' className='w-40 mt-12'/>
      <p className='md:w-2/5 text-center mb-16 mt-4'>The best photos, videos and stories application with the new reels feature, created by meta</p>
      {Object.values(providers).map(provider => {
        return <SignInBtn name={provider.name} key={provider.id} />;
      })}
    </div>
  );
}

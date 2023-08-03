'use client';

import React, { use } from 'react';
import { getProviders } from 'next-auth/react';
import SignInBtn from '../../components/SignInBtn/SignInBtn';

async function getData() {
  const providers = await getProviders();

  return providers;
}

export default function SignIn() {
  const providers = use(getData());

  return (
    <>
      {Object.values(providers).map(provider => {
        return <SignInBtn name={provider.name} key={provider.id} />;
      })}
    </>
  );
}

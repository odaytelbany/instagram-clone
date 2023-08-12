"use client"
import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker';
import Story from '../Story/Story';
import { useSession } from 'next-auth/react';

const Stories = () => {
  const [profiles, setProfiles] = useState([]);
  const {data: session} = useSession();

  useEffect(() => { 
    const suggestions = [...Array(20)].map((_, i) => (
      {
        userId: i,
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatarLegacy(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past(),
      }
    ));
    setProfiles(suggestions);
  }, []);

  return (
    profiles?.at(0)?.avatar && (<div className='flex space-x-2 p-4 bg-white mt-8 border border-gray-200 overflow-x-scroll rounded-sm scrollbar-thin scrollbar-thumb-black'>
      {session && <Story img={session?.user?.image} name={session?.user?.username}/>}
      {
        profiles.map(profile => (
          <Story key={profile.userId} img={profile.avatar} name={profile.username} />
        ))
      }
    </div>)
  )
}

export default Stories
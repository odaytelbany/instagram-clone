"use client"
import Modal from '@/components/Modal/Modal';
import Feed from '../components/Feed/Feed';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Modal />
      <Feed />
    </div>
  );
}

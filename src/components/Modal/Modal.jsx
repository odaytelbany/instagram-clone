import { modalState } from '@/atoms/modalAtom';
import React from 'react'
import { useRecoilState } from 'recoil'

const Modal = () => {
    const [open, setOpen] = useRecoilState(modalState);
  return (
    <div>
        <h1>I am a modal</h1>
        {open && <p>The model is open</p>}
    </div>
  )
}

export default Modal
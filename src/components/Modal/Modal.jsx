import { modalState } from '@/atoms/modalAtom';
import React from 'react'
import { useRecoilState } from 'recoil'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CameraIcon } from '@heroicons/react/outline';

const Modal = () => {
    const [open, setOpen] = useRecoilState(modalState);
    const filePickerRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div onClick={() => filePickerRef.current.click()} className='cursor-pointer mx-auto flex justify-center items-center bg-red-100 rounded-full h-12 w-12'>
                      <CameraIcon className='h-6 w-6 text-red-600' aria-hidden="true"/>
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-center">
                      <Dialog.Title as="h3" className="mt-2 text-base font-semibold leading-6 text-gray-900">
                        Upload a photo
                      </Dialog.Title>
                      <div>
                        <input type="file" hidden ref={filePickerRef}/>
                      </div>
                      <div className='mt-2'>
                        <input type='text' className='border-none focus:ring-0 w-full text-center border border-1' placeholder='Please Enter a Caption...'/>
                      </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 text-sm font-semibold text-white shadow-sm hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                    onClick={() => setOpen(false)}
                  >
                    Upload Post
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal
import { modalState } from '@/atoms/modalAtom';
import React from 'react'
import { useRecoilState } from 'recoil'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CameraIcon, CollectionIcon } from '@heroicons/react/outline';
import {db, storage} from '../../../firebase';
import { useSession } from 'next-auth/react';
import { addDoc, collection, doc, serverTimestamp, updateDoc,  } from 'firebase/firestore';
import { ref, getDownloadURL, uploadString } from 'firebase/storage';

const Modal = () => {
    const [open, setOpen] = useRecoilState(modalState);
    const filePickerRef = useRef(null);
    const captionRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const {data: session} = useSession();

    // Read image and add it to the post 
    const addImageToPost = (e) => {
      const reader = new FileReader();
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
      reader.onload = (readerEvent) => {
        setSelectedFile(readerEvent.target.result);
      };
    };
    
    // Close post upload pop up 
    const close = () => {
      setOpen(false);
      setTimeout(() => {
        setSelectedFile(null);
      }, 1000)
    }

    // Upload the post to firestore 
    const uploadPost = async () => {
      if (loading) return;

      setLoading(true);

      const docRef = await addDoc(collection(db, 'posts'), {
        username: session?.user?.username,
        uid: session?.user?.uid,
        caption: captionRef.current.value,
        profileImg: session.user.image,
        timestamp: serverTimestamp(),
      })
      const imageRef = ref(storage, `posts/${docRef.id}/image`)

      await uploadString(imageRef, selectedFile, "data_url").then(
        async (snapshot) => {
          const downloadURL = await getDownloadURL(imageRef);
          await updateDoc(doc(db, 'posts', docRef.id), {
            image: downloadURL
          })
        }
      )

      setOpen(false);
      setLoading(false);
      setSelectedFile(null);
    }

    return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed z-10" onClose={close}>
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
                    {selectedFile ? (
                      <img
                        src={selectedFile}
                        className="w-full object-contain cursor-pointer"
                        onClick={() => setSelectedFile(null)}
                      />
                    ) : (
                      <div
                        onClick={() => filePickerRef.current.click()}
                        className="cursor-pointer mx-auto flex justify-center items-center bg-red-100 rounded-full h-12 w-12"
                      >
                        <CameraIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                    )}

                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-center">
                      <Dialog.Title
                        as="h3"
                        className="mt-2 text-base font-semibold leading-6 text-gray-900"
                      >
                        Upload a photo
                      </Dialog.Title>
                      <div>
                        <input
                          type="file"
                          hidden
                          ref={filePickerRef}
                          onChange={addImageToPost}
                        />
                      </div>
                      <div className="mt-2">
                        <input
                          type="text"
                          className="border-none focus:ring-0 w-full text-center border border-1"
                          placeholder="Please Enter a Caption..."
                          ref={captionRef}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      disabled={!selectedFile}
                      className="inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 text-sm font-semibold text-white shadow-sm hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                      onClick={uploadPost}
                    >
                      {loading ? "Uploading..." : "Upload Post"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
}

export default Modal
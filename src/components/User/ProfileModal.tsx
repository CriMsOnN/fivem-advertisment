import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";

interface Props {
  onClose: Function;
  onSuccess: Function;
  onError: Function;
}

const ProfileModal = ({ onClose, onSuccess, onError }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [media, setMedia] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("file", media);
    data.append("upload_preset", "qqomkcks");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    if (res.ok) {
      const newData = await res.json();
      const newres = await fetch(`/api/image/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: newData.url }),
      });

      if (newres.ok) {
        onSuccess(newData.url);
      } else {
        console.log("something went wrong!");
      }
    }
  };

  const handleOnChange = (event) => {
    setMedia(event.target.files[0]);
  };

  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };
  return (
    // <Transition appear show={isOpen} as={Fragment}>
    //   <Dialog
    //     as="div"
    //     className="fixed inset-0 z-10 overflow-y-auto"
    //     onClose={closeModal}
    //   >
    //     <div className="min-h-screen px-4 text-center">
    //       <Transition.Child
    //         as={Fragment}
    //         enter="ease-out duration-300"
    //         enterFrom="opacity-0"
    //         enterTo="opacity-100"
    //         leave="ease-in duration-200"
    //         leaveFrom="opacity-100"
    //         leaveTo="opacity-0"
    //       >
    //         <Dialog.Overlay className="fixed inset-0" />
    //       </Transition.Child>

    //       <span
    //         className="inline-block h-screen align-middle"
    //         aria-hidden="true"
    //       >
    //         &#8203;
    //       </span>
    //       <Transition.Child
    //         as={Fragment}
    //         enter="ease-out duration-300"
    //         enterFrom="opacity-0 scale-95"
    //         enterTo="opacity-100 scale-100"
    //         leave="ease-in duration-200"
    //         leaveFrom="opacity-100 scale-100"
    //         leaveTo="opacity-0 scale-95"
    //       >
    //         <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
    //           <Dialog.Title
    //             as="h3"
    //             className="mb-8 text-3xl text-center text-gray-800 font-poppins"
    //           >
    //             Profile Photo
    //           </Dialog.Title>
    //         </div>
    //         <form onSubmit={handleSubmit}>
    //           <input type="file" accept="image/*" onChange={handleOnChange} />
    //           <button type="submit">Upload</button>
    //         </form>
    //       </Transition.Child>
    //     </div>
    //   </Dialog>
    // </Transition>
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="mb-8 text-3xl text-center text-gray-800 font-poppins"
              >
                Upload Image
              </Dialog.Title>
              <form onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleOnChange} />
                <button type="submit">Upload</button>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProfileModal;

{
  /* <motion.div
                    animate={{
                      scale: [1, 1, 1],
                      rotate: [0, 360, 360, 0],
                      borderRadius: ["50%", "50%"],
                    }}
                    className="flex justify-center items-center"
                  >
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="text-center py-3 px-3 rounded-full bg-green-500 text-white hover:bg-green-300 focus:outline-none my-1"
                    >
                      Logging you in..
                    </button>
                  </motion.div> */
}

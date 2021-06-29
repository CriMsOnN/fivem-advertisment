import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/client";
import { motion } from "framer-motion";

interface Props {
  opened: boolean;
  onClose: Function;
  onSuccess: Function;
  onError: Function;
}

interface IFormInputs {
  username: string;
  password: string;
}

const schema = z.object({
  username: z
    .string()
    .min(5, { message: "Must be 5 or more characters long " }),
  password: z
    .string()
    .min(5, { message: "Must be 5-30 characters long" })
    .max(30, { message: "Must be 5-30 characters long" }),
});

const Login = ({ opened, onClose, onSuccess, onError }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    setIsLoading(true);
    const results = await signIn("credentials", {
      redirect: false,
      username: data.username,
      password: data.password,
    });
    if (results.error !== null) {
      onError(results.error);
      setIsLoading(false);
    } else {
      closeModal();
      setIsLoading(false);
      onSuccess();
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };

  return (
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
                Sign In
              </Dialog.Title>
              <form onSubmit={handleSubmit(onSubmit)}>
                {errors.username && (
                  <p className="text-sm text-red-900">
                    {errors.username?.message}
                  </p>
                )}
                <input
                  type="text"
                  placeholder="Username"
                  className="block border border-gray-400 w-full p-3 rounded mb-4"
                  {...register("username")}
                />
                {errors.password && (
                  <p className="text-sm text-red-900">
                    {errors.password?.message}
                  </p>
                )}
                <input
                  type="password"
                  placeholder="Password"
                  className="block border border-gray-400 w-full p-3 rounded mb-4"
                  {...register("password")}
                />
                {isLoading && (
                  <motion.div
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
                  </motion.div>
                )}
                {!isLoading && (
                  <button
                    type="submit"
                    className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-300 focus:outline-none my-1"
                  >
                    Sign In
                  </button>
                )}
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Login;

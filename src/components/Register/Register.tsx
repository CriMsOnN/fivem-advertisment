import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { ToastProvider, useToasts } from "react-toast-notifications";
import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface IFormInputs {
  username: string;
  password: string;
  cPassword: string;
  email: string;
  firstname: string;
  lastname: string;
}

interface Props {
  opened: boolean;
  onClose: Function;
  onSuccess: Function;
  onError: Function;
}
const schema = z.object({
  username: z.string().min(5, { message: "Must be 5 or more characters long" }),
  password: z
    .string()
    .min(5, { message: "Must be between 5 and 30 characters long" })
    .max(30, { message: "Must be lower than 30 characters" }),
  cPassword: z
    .string()
    .min(5, { message: "Must be between 5 and 30 characters long" })
    .max(30, { message: "Must be lower than 30 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  firstname: z.string().nonempty(),
  lastname: z.string().nonempty(),
});

const Register = ({ opened, onClose, onSuccess, onError }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const { addToast } = useToasts();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    if (data.password !== data.cPassword) {
      return addToast("Password and confirm password does not match.", {
        appearance: "error",
        autoDismiss: true,
      });
    }
    const response = await fetch(`/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      onError();
    } else {
      onSuccess();
      closeModal();
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
        className="fixed inset-0 z-10 overflow-y-auto font-poppins"
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
                Sign Up
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
                {errors.email && (
                  <p className="text-sm text-red-900">
                    {errors.email?.message}
                  </p>
                )}
                <input
                  type="text"
                  placeholder="Email"
                  className="block border border-gray-400 w-full p-3 rounded mb-4"
                  {...register("email")}
                />
                {errors.firstname && (
                  <p className="text-sm text-red-900">
                    {errors.firstname?.message}
                  </p>
                )}
                <input
                  type="text"
                  placeholder="Firstname"
                  className="block border border-gray-400 w-full p-3 rounded mb-4"
                  {...register("firstname")}
                />
                {errors.lastname && (
                  <p className="text-sm text-red-900">
                    {errors.lastname?.message}
                  </p>
                )}
                <input
                  type="text"
                  placeholder="Lastname"
                  className="block border border-gray-400 w-full p-3 rounded mb-4"
                  {...register("lastname")}
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

                {errors.cPassword && (
                  <p className="text-sm text-red-900">
                    {errors.cPassword?.message}
                  </p>
                )}
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="block border border-gray-400 w-full p-3 rounded mb-4"
                  {...register("cPassword")}
                />
                <button
                  type="submit"
                  className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-300 focus:outline-none my-1"
                >
                  Create Account
                </button>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Register;

import Image from "next/image";
import { getSession, useSession } from "next-auth/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import ProfileModal from "./ProfileModal";
import React, { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import ProfileServers from "./ProfileServers";

interface Props {
  firstname: string;
  lastname: string;
  email: string;
  image: string;
  servers: string[];
}

const Profile = ({
  firstname,
  lastname,
  email,
  image: image_url,
  servers,
}: Props) => {
  const [isOpened, setIsOpened] = useState(false);
  const [image, setImage] = useState(image_url);
  const [session, isLoading] = useSession();
  const [hasUsername, setHasUsername] = useState("");
  const { addToast } = useToasts();
  const [isInput, setIsInput] = useState(false);

  const onClose = () => {};

  const handleSuccess = (str) => {
    setImage(str);
  };

  useEffect(() => {
    if (!isLoading) {
      setHasUsername(session.username as string);
    }
  }, [isLoading]);

  const handleSubmit = async (event) => {
    if (hasUsername === "") {
      event.preventDefault();
      return addToast("You cant have an empty username", {
        appearance: "error",
        autoDismiss: true,
      });
    } else if (hasUsername === session.username) {
      event.preventDefault();
      setIsInput(!isInput);
      return;
    }
    const res = await fetch(`/api/user/changeusername`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hasUsername),
    });

    if (res.ok) {
      addToast("Username changed!", {
        appearance: "success",
        autoDismiss: true,
      });
      getSession();

      setIsInput(!isInput);
    }
  };

  const handleOnChange = (event) => {
    setHasUsername(event.target.value);
  };

  const handleError = (str) => {};
  return (
    <div className="bg-gray-100">
      <div className="w-full text-white bg-gray-800">
        <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-6">
          <div className="p-4 flex flex-row items-center justify-between">
            <a
              href="#"
              className="text-lg font-bold tracking-widest uppercase rounded-lg focus:outline-none focus:shadow-outline"
            >
              Profile
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2">
          <div className="w-full md:w-3/12 md:mx-2">
            <div className="bg-white p-3 border-t-4 border-green-400">
              <div className="flex justify-center items-center overflow-hidden">
                {image !== null && (
                  <Image src={image} width={300} height={300} quality="100" />
                )}
              </div>
              <div className="flex justify-center items-center">
                <button
                  onClick={() => setIsOpened(!isOpened)}
                  className="focus:outline-none focus:ring-2 focus:ring-blue-500 px-2 py-2 mt-2 bg-indigo-500 text-white rounded-lg shadow-md font-poppins font-bold transition duration-300 hover:bg-opacity-80"
                >
                  Change photo
                </button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-9/12 mx-2 h-64">
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span className="text-green-500">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">About</span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-1 text-sm space-y-5 divide-y-2 ">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Firstname</div>
                    <div className="px-4 py-2">{firstname}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Lastname</div>
                    <div className="px-4 py-2">{lastname}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Email</div>
                    <div className="px-4 py-2">{email}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Username</div>
                    <div className="px-4 py-2 flex items-center space-x-2">
                      <span>{!isInput && hasUsername}</span>
                      <div className="group px-2 py-2">
                        {!isInput && (
                          <span className="has-tooltip">
                            <span className="tooltip rounded-lg shadow-lg p-1 bg-gray-600 text-gray-100 -mt-8">
                              You can change your username!
                            </span>
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="text-indigo-500 cursor-pointer group-hover:text-indigo-600"
                              onClick={() => setIsInput(!isInput)}
                            />
                          </span>
                        )}
                        {isInput && (
                          <div>
                            <form
                              onSubmit={handleSubmit}
                              className="flex items-center space-x-2"
                            >
                              <div className="">
                                <input
                                  type="text"
                                  placeholder="Username"
                                  value={hasUsername}
                                  className="bg-gray-200 border border-blue-500 rounded-lg text-center focus:outline-none"
                                  onChange={handleOnChange}
                                />
                              </div>
                              <div className="">
                                <button
                                  type="submit"
                                  className="px-2 py-1 bg-blue-500 rounded font-poppins text-base text-white hover:bg-opacity-80 active:outline-none hover:shadow-md active:ring-3 active:ring-blue-900 active:ring-rounded"
                                >
                                  Save
                                </button>
                              </div>
                            </form>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProfileServers servers={servers} />
      </div>
      {isOpened && (
        <ProfileModal
          onClose={onClose}
          onSuccess={handleSuccess}
          onError={() => handleError("Invalid credentials")}
        />
      )}
    </div>
  );
};

export default Profile;

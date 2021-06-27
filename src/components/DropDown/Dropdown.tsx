import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserNinja,
  faServer,
  faCog,
  faSignOutAlt,
  faDatabase,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import { faWpforms } from "@fortawesome/free-brands-svg-icons";

import { signOut, useSession } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  opened: boolean;
  onClose: Function;
}

const Dropdown = () => {
  const [session] = useSession();
  const router = useRouter();
  return (
    <>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="z-50 absolute font-roboto right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => router.push("/user/profile")}
                  className={`${
                    active ? "bg-indigo-500 text-white" : "text-gray-900"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm font-normal`}
                >
                  <FontAwesomeIcon icon={faUserNinja} className="mr-2" />
                  Profile
                </div>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/stream/apply"
                  className={`${
                    active ? "bg-indigo-500 text-white" : "text-gray-900"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm font-normal`}
                >
                  <FontAwesomeIcon icon={faClipboard} className="mr-2" />
                  Apply for Streamer
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/server/apply"
                  className={`${
                    active ? "bg-indigo-500 text-white" : "text-gray-900"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm font-normal`}
                >
                  <FontAwesomeIcon icon={faClipboard} className="mr-2" />
                  Advertise your server
                </a>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-indigo-500 text-white" : "text-gray-900"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  <FontAwesomeIcon icon={faServer} className="mr-2" />
                  Your Servers
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-indigo-500 text-white" : "text-gray-900"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  <FontAwesomeIcon icon={faCog} className="mr-2" />
                  Settings
                </button>
              )}
            </Menu.Item>
            {session && session.role === "Superadmin" && (
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-indigo-500 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    <FontAwesomeIcon icon={faDatabase} className="mr-2" />
                    Dashboard
                  </button>
                )}
              </Menu.Item>
            )}
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => signOut().then((result) => router.push("/"))}
                  className={`${
                    active ? "bg-indigo-500 text-white" : "text-gray-900"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </>
  );
};

export default Dropdown;

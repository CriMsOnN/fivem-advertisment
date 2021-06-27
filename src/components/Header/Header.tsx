import Nav from "~/ui/NavLink";
import {
  faHome,
  faListAlt,
  faInfoCircle,
  faHandHoldingUsd,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/client";
import React, { Fragment, useState } from "react";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { useToasts } from "react-toast-notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Transition } from "@headlessui/react";
import Dropdown from "../DropDown/Dropdown";

const Header = () => {
  const { addToast } = useToasts();
  const [session] = useSession();
  const [isOpenedRegistered, setOpenedRegistered] = useState(false);
  const [isOpenedLogin, setOpenedLogin] = useState(false);

  console.log(session);
  const handleRegisterClose = () => {
    return setOpenedRegistered(!isOpenedRegistered);
  };

  const handleLoginClose = () => {
    return setOpenedLogin(!isOpenedLogin);
  };

  const handleSuccess = (str) => {
    addToast(str, {
      appearance: "success",
      autoDismiss: true,
    });
  };

  const handleError = (str) => {
    addToast(str, {
      appearance: "error",
      autoDismiss: true,
    });
  };
  return (
    <div className="shadow-md">
      <div className="container mx-auto flex justify-between items-center ">
        <div className="text-gray-600 font-bold text-3xl cursor-pointer font-roboto flex justify-center items-center py-3">
          <a
            href="/"
            className="text-gray-600 font-roboto hover:text-gray-500 transition tracking-widest leading-loose"
          >
            GREEK FIVEM
          </a>
        </div>

        <div className="mr-2 flex space-x-1">
          <Nav icon={faHome} label="HOME" link="/" />
          <Nav icon={faListAlt} label="FEATURES" link="/features" />
          <Nav icon={faHandHoldingUsd} label="PRICING" link="/pricing" />
          <Nav icon={faInfoCircle} label="ABOUT" link="/about" />
        </div>

        <div className="mr-2 flex space-x-4 font-bold font-poppins">
          {!session && (
            <button
              onClick={() => setOpenedLogin(!isOpenedLogin)}
              className="tracking-widest px-4 py-1 bg-gray-900 font-medium text-white rounded-md hover:bg-opacity-80 transition duration-200"
            >
              Sign in
            </button>
          )}
          {session && (
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center items-center space-x-2 w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-90 hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <span>Welcome, {session.username!}</span>
                  <FontAwesomeIcon icon={faArrowDown} />
                </Menu.Button>
              </div>
              <Dropdown />
            </Menu>
          )}
          {!session && (
            <button
              onClick={() => setOpenedRegistered(!isOpenedRegistered)}
              className="tracking-widest px-4 py-1 bg-blue-300 font-medium text-white rounded-md hover:bg-opacity-80 transition duration-200"
            >
              Sign up
            </button>
          )}
        </div>
      </div>
      {isOpenedRegistered && (
        <Register
          opened={true}
          onClose={handleRegisterClose}
          onSuccess={() =>
            handleSuccess(
              "You have successfully registered! Go ahead and login"
            )
          }
          onError={() => {
            handleError("User already exists");
          }}
        />
      )}
      {isOpenedLogin && (
        <Login
          opened={true}
          onClose={handleLoginClose}
          onSuccess={() => handleSuccess("You have successfully signed in!")}
          onError={() => handleError("Invalid credentials")}
        />
      )}
    </div>
  );
};

export default Header;

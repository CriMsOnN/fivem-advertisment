import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { useSession } from "next-auth/client";

const ToggleDark = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (window.localStorage.theme === "dark") {
      root.classList.add("dark");
      setEnabled(true);
    }
  }, []);

  const handleChange = () => {
    const root = window.document.documentElement;
    if (window.localStorage.theme === "dark") {
      root.classList.remove("dark");
      window.localStorage.theme = "light";
      setEnabled(false);
    } else {
      window.localStorage.theme = "dark";
      root.classList.add("dark");
      setEnabled(true);
    }
  };

  useEffect(() => {}, [enabled]);
  return (
    <div className="py-5">
      <Switch
        checked={enabled}
        onChange={handleChange}
        className={`${enabled ? "bg-teal-900" : "bg-teal-700"}
            bg-gray-900 dark:bg-gray-100 relative inline-flex flex-shrink-0 h-[20px] w-[60px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        {/* {enabled ? "☀️" : "🌙"} */}
        {enabled && (
          <div className="flex items-center justify-center text-xs absolute">
            <span className="">☀️</span>
          </div>
        )}
        {!enabled && (
          <div className="flex items-center justify-center text-xs absolute right-2">
            <span className="">🌙</span>
          </div>
        )}
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? "translate-x-9" : "translate-x-0"}
              pointer-events-none inline-block h-[15px] w-[20px] rounded-full bg-gray-100 dark:bg-gray-900 shadow-lg transform ring-0 transition ease-in-out duration-200`}
        />
      </Switch>
    </div>
  );
};

export default ToggleDark;

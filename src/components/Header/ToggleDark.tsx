import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";

const ToggleDark = () => {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const root = window.document.documentElement;
    if (enabled) {
      window.localStorage.theme = "dark";
      root.classList.add("dark");
    } else {
      window.localStorage.theme = "light";
      root.classList.remove("dark");
    }
  }, [enabled]);

  return (
    <div className="py-16">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? "bg-teal-900" : "bg-teal-700"}
            bg-gray-900 dark:bg-gray-100 relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        {/* {enabled ? "☀️" : "🌙"} */}
        {enabled && (
          <div className="flex items-center justify-center mt-1 text-xl absolute">
            <span className="">☀️</span>
          </div>
        )}
        {!enabled && (
          <div className="flex items-center justify-center mt-1 text-xl absolute right-2">
            <span className="">🌙</span>
          </div>
        )}
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? "translate-x-9" : "translate-x-0"}
              pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-gray-100 dark:bg-gray-900 shadow-lg transform ring-0 transition ease-in-out duration-200`}
        />
      </Switch>
    </div>
  );
};

export default ToggleDark;

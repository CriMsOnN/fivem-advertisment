import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  icon: IconDefinition;
  label: string;
  link: string;
}

const NavLink = ({ link, icon, label }: Props) => {
  const router = useRouter();
  return (
    <div onClick={() => router.push(link)} className="group">
      <div
        className={`cursor-pointer space-x-1 flex justify-center items-center px-2 py-3 rounded transition duration-200 ${
          router.pathname === link
            ? "text-gray-800 dark:text-gray-400"
            : "text-gray-400 dark:text-gray-200"
        }`}
      >
        <FontAwesomeIcon
          icon={icon}
          className="w-6 h-6 p-1 text-3xl text-gray-500 dark:text-gray-100 dark:group-hover:text-gray-100 group-hover:text-gray-800 rounded-full "
        />
        <span className="font-poppins font-medium group-hover:text-gray-800">
          {label}
        </span>
      </div>
    </div>
  );
};

export default NavLink;

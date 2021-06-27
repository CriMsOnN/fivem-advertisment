import { PrismaClient } from "@prisma/client";
import Container from "~/components/Container/Container";
import Header from "~/components/Header/Header";
import Link from "next/link";
import { useSession } from "next-auth/client";
import Streamers from "~/components/Streamers/Streamers";
export default function Home() {
  return (
    <div>
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 mt-10">
        <div className="flex items-center justify-center w-12 bg-yellow-400">
          <svg
            className="w-6 h-6 text-white fill-current"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
          </svg>
        </div>

        <div className="px-4 py-2 -mx-3">
          <div className="mx-3">
            <span className="font-semibold text-yellow-400 dark:text-yellow-300">
              Warning
            </span>
            <p className="text-sm text-gray-600 dark:text-gray-200">
              Site is under development
            </p>
          </div>
        </div>
      </div>
      <Container />
      {/* <Streamers /> */}
    </div>
  );
}

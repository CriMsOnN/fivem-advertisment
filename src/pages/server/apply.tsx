import { getSession } from "next-auth/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastProvider, useToasts } from "react-toast-notifications";

interface IFormInputs {
  server_name: string;
  server_ip: string;
  server_discord: string;
  bio: string;
}

const schema = z.object({
  server_name: z
    .string()
    .min(5, { message: "Must be 5 or more characters long!" }),
  server_ip: z
    .string()
    .min(4, { message: "Must be 5 or more characters long" }),
  server_discord: z
    .string()
    .min(5, { message: "Must be 5 or more characters long" }),
  bio: z
    .string()
    .min(5, { message: "Must be 5 ore more characters longs" })
    .max(400, { message: "Characters limit is 400" }),
});

export async function getServerSideProps(ctx) {
  const session = await getSession({ req: ctx.req });
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  } else {
    return {
      props: {},
    };
  }
}
const ApplyServer = () => {
  const [characters, setCharacters] = useState(400);
  const { addToast } = useToasts();
  const [media, setMedia] = useState(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: zodResolver(schema),
  });

  const handleTextArea = (e) => {
    setCharacters(400 - e.target.textLength);
  };

  const handleImageChange = (event) => {
    setMedia(event.target.files[0]);
  };

  const onSubmit = async (data: IFormInputs) => {
    const imageData = new FormData();
    imageData.append("file", media);
    imageData.append("upload_preset", "qqomkcks");
    const imageUpload = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
      {
        method: "POST",
        body: imageData,
      }
    );
    if (imageUpload.ok) {
      const imageData = await imageUpload.json();
      const newImage = imageData.url;
      const newData = { ...data, image: newImage };
      const response = await fetch(`/api/server/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      const resData = await response.json();

      if (response.ok) {
        addToast(
          "Your application has been send. Please remember this might take up to 24 hours. Thanks for your time",
          {
            appearance: "info",
            autoDismiss: true,
          }
        );
        setTimeout(() => {
          router.push("/");
        }, 4000);
      } else {
        addToast(resData.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
  };

  return (
    <div className="w-full bg-grey-500">
      <div className="container mx-auto py-8">
        <div className="w-full flex justify-center items-center mt-5 mb-5 font-poppins font-bold flex-col text-gray-600 dark:text-gray-100">
          <span>Complete the form!</span>
          <span className="text-sm font-normal text-gray-400">
            Please remember this process can take up to 24 hours before we
            accept it or decline it.
          </span>
        </div>

        <div className="w-96 mx-auto bg-white rounded shadow">
          <div className="mx-5 py-4 px-8 text-gray-600 text-xl font-bold border-b border-grey-500">
            Server Application
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-4 px-8">
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-bold mb-2">
                  Server Name
                </label>
                <input
                  className=" border rounded w-full py-2 px-3 text-gray-600"
                  type="text"
                  placeholder="Enter Server Name"
                  {...register("server_name")}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-bold mb-2">
                  Server IP
                </label>
                <input
                  className=" border rounded w-full py-2 px-3 text-gray-600"
                  type="text"
                  placeholder="Enter Server IP"
                  {...register("server_ip")}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-bold mb-2">
                  Server Discord
                </label>
                <input
                  className=" border rounded w-full py-2 px-3 text-gray-600"
                  type="text"
                  placeholder="Enter Discord Invite Link"
                  {...register("server_discord")}
                />
              </div>

              <div className="mb-4 flex flex-col">
                <label className="block text-gray-600 text-sm font-bold mb-2">
                  Tell us whats good on your server
                </label>
                <textarea
                  maxLength={400}
                  onChange={handleTextArea}
                  style={{ resize: "none" }}
                  {...register("bio")}
                  className="w-80 h-32 active:outline-none active:ring-2 active:ring-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-md border-2 border-blue-200"
                ></textarea>
                <label className="text-xs text-right text-gray-600">
                  Characters: {characters}/400
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-bold mb-2">
                  Upload a picture of your server
                </label>
                <div className="flex items-center justify-center bg-grey-lighter">
                  <label className="w-80 flex flex-col items-center px-2 py-4 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="mt-2 text-base leading-normal">
                      Select a file
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>
              <div className="mb-4 flex items-center justify-center">
                <button
                  type="submit"
                  className="mb-2 mx-16 rounded-full py-1 px-24 bg-gradient-to-r from-blue-400 to-blue-800 text-gray-100 font-bold font-poppins "
                >
                  Apply
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyServer;

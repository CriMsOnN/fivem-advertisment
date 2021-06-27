import Image from "next/image";

const Container = () => {
  return (
    <section className="text-gray-600 dark:bg-gray-900 body-font w-full bg-gray-100 bg-opacity-30 mt-10">
      <div className="flex">
        <div className="flex flex-col justify-center items-center w-2/4 text-black dark:text-gray-100 space-y-5">
          <span className="text-3xl font-bold font-roboto">
            Do you have a server you want to advertise?
          </span>
          <span className="text-3xl font-bold font-roboto">
            Are you a RolePlay streamer?
          </span>
          <span className="text-xl font-medium text-gray-500">
            <li>We provide you a way to advertise your server</li>
            <li>Advertise your stream</li>
          </span>
          <button className="leading-loose tracking-widest px-5 py-3 bg-[#4fc2fb] hover:bg-opacity-80 text-white font-bold rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-500">
            SIGN UP FOR FREE
          </button>
        </div>
        <div>
          <Image src="/hero.png" width={570} height={600} quality="100" />
        </div>
      </div>
    </section>
  );
};

export default Container;

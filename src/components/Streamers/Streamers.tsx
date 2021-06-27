import Image from "next/image";
import { TwitchEmbed, TwitchPlayer } from "react-twitch-embed";

const Streamers = () => {
  return (
    <div className="w-full">
      <div className="container mx-auto flex justify-center items-center mt-10">
        <span className="px-2 py-3 bg-blue-500 rounded-lg text-base font-medium text-opacity-80 text-white">
          Promote your stream
        </span>
      </div>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-4 gap-1 mt-5">
          <div className="border-2 border-blue-500">
            {/* <iframe
              loading="lazy"
              src="https://player.twitch.tv/?channel=symfuhny&amp;parent=localhost&amp;muted=true"
              width="400"
              height="300"
              scrolling="no"
              allowFullScreen={true}
            ></iframe> */}
            <TwitchPlayer
              channel="cr1msonnn"
              id="cr1msonnn1"
              theme="dark"
              muted={true}
              width={400}
              height={300}
              autoplay={true}
              hideControls={true}
              className="border-2 border-indigo-500"
            />
          </div>
          <div className="border-2 border-blue-500">
            <TwitchPlayer
              channel="cr1msonnn"
              id="cr1msonnn2"
              theme="dark"
              muted={true}
              width={400}
              height={300}
              autoplay={true}
              hideControls={true}
              className="border-2 border-indigo-500"
            />
          </div>
          <div className="border-2 border-blue-500">
            <TwitchPlayer
              channel="cr1msonnn"
              id="cr1msonnn3"
              theme="dark"
              muted={true}
              width={400}
              height={300}
              autoplay={true}
              hideControls={true}
              className="border-2 border-indigo-500"
            />
          </div>
          <div className="border-2 border-blue-500">
            <TwitchPlayer
              channel="cr1msonnn"
              id="cr1msonnn4"
              theme="dark"
              muted={true}
              width={400}
              height={300}
              autoplay={true}
              hideControls={true}
              className="border-2 border-indigo-500"
            />
          </div>
          <div className="border-2 border-blue-500">
            <TwitchPlayer
              channel="cr1msonnn"
              id="cr1msonnn5"
              theme="dark"
              muted={true}
              width={400}
              height={300}
              autoplay={true}
              hideControls={true}
              className="border-2 border-indigo-500"
            />
          </div>
          <div className="border-2 border-blue-500">
            <TwitchPlayer
              channel="cr1msonnn"
              id="cr1msonnn6"
              theme="dark"
              muted={true}
              width={400}
              height={300}
              autoplay={true}
              hideControls={true}
              className="border-2 border-indigo-500"
            />
          </div>
          <div className="border-2 border-blue-500">
            <TwitchPlayer
              channel="cr1msonnn"
              id="cr1msonnn7"
              theme="dark"
              muted={true}
              width={400}
              height={300}
              autoplay={true}
              hideControls={true}
              className="border-2 border-indigo-500"
            />
          </div>
          <div className="border-2 border-blue-500">
            <TwitchPlayer
              channel="cr1msonnn"
              id="cr1msonnn8"
              theme="dark"
              muted={true}
              width={400}
              height={300}
              autoplay={true}
              hideControls={true}
              className="border-2 border-indigo-500"
            />
          </div>
          <div className="border-2 border-blue-500">
            <TwitchPlayer
              channel="cr1msonnn"
              id="cr1msonnn9"
              theme="dark"
              muted={true}
              width={400}
              height={300}
              autoplay={true}
              hideControls={true}
              className="border-2 border-indigo-500"
            />
          </div>
          <div className="border-2 border-blue-500">
            <TwitchPlayer
              channel="cr1msonnn"
              id="cr1msonnn10"
              theme="dark"
              muted={true}
              width={400}
              height={300}
              autoplay={true}
              hideControls={true}
              className="border-2 border-indigo-500"
            />
          </div>
          <div className="border-2 border-blue-500">
            <TwitchPlayer
              channel="cr1msonnn"
              id="cr1msonnn11"
              theme="dark"
              muted={true}
              width={400}
              height={300}
              autoplay={true}
              hideControls={true}
              className="border-2 border-indigo-500"
            />
          </div>
          <div className="border-2 border-blue-500">
            <TwitchPlayer
              channel="cr1msonnn"
              id="cr1msonnn12"
              theme="dark"
              muted={true}
              width={400}
              height={300}
              autoplay={true}
              hideControls={true}
              className="border-2 border-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Streamers;

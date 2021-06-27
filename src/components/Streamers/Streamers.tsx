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
            <iframe
              loading="lazy"
              src="https://player.twitch.tv/?channel=symfuhny&amp;parent=localhost&amp;muted=true"
              width="400"
              height="300"
              scrolling="no"
              allowFullScreen={true}
            ></iframe>
          </div>
          <div className="">
            <iframe
              loading="lazy"
              src="https://player.twitch.tv/?channel=recrent&amp;parent=localhost&amp;muted=true"
              width="400"
              height="300"
              scrolling="no"
            ></iframe>
          </div>
          <div className="">
            <iframe
              loading="lazy"
              src="https://player.twitch.tv/?channel=slaki&amp;parent=localhost&amp;muted=true"
              width="400"
              height="300"
              scrolling="no"
            ></iframe>
          </div>
          <div className="">
            <iframe
              loading="lazy"
              src="https://player.twitch.tv/?channel=justknight&amp;parent=localhost&amp;muted=true"
              width="400"
              height="300"
              scrolling="no"
            ></iframe>
          </div>
          <div className="">
            <iframe
              loading="lazy"
              src="https://player.twitch.tv/?channel=mugi&amp;parent=localhost&amp;muted=true"
              width="400"
              height="300"
              scrolling="no"
            ></iframe>
          </div>
          <div className="flex justify-center items-center">
            <iframe
              loading="lazy"
              src="https://player.twitch.tv/?channel=eryctriceps&amp;parent=localhost&amp;muted=true"
              width="400"
              height="300"
              scrolling="no"
            ></iframe>
          </div>
          <div className="">
            <iframe
              loading="lazy"
              src="https://player.twitch.tv/?channel=eryctriceps&amp;parent=localhost&amp;muted=true"
              width="400"
              height="300"
              scrolling="no"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Streamers;

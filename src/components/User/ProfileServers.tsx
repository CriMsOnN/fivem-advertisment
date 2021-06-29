import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  servers: Array<Object>[];
}

const ProfileServers = ({ servers }) => {
  return (
    <div className="px-2 py-2 bg-gray-800  rounded text-gray-100 flex items-center flex-col">
      <div className="flex justify-center items-center space-x-4">
        <span>Your Servers</span>
        <span className="px-3 py-1 rounded-full bg-blue-500 flex items-center">
          {servers && servers.length}
        </span>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-5">
        {servers &&
          servers.map((server) => (
            <div
              className="flex flex-col justify-center items-center border-2 px-1 w-[500px] py-5 border-blue-500"
              key={server.id}
            >
              <div>
                <img
                  src={server.image}
                  className="w-[120px] h-[120px] rounded-full"
                />
              </div>
              <div className="space-y-2 mt-5">
                <div className="flex flex-col justify-center items-center border-b-2 border-blue-500">
                  <span className="">BIO</span>
                  <span className="text-center text-sm text-gray-400 font-roboto font-light italic">
                    {server.bio}
                  </span>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <span className="font-bold font-poppins text-gray-100 uppercase leading-8 tracking-widest">
                    Server IP
                  </span>
                  <span className="font-roboto font-medium text-gray-300 trackng-widest">
                    {server.ip}
                  </span>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <span className="font-bold font-poppins text-gray-100 uppercase leading-8 tracking-widest">
                    server Name
                  </span>
                  <span className="font-roboto font-medium text-gray-300 tracking-widest">
                    {server.name}
                  </span>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <span className="font-bold font-poppins text-gray-100 uppercase leading-8 tracking-widest">
                    Discord
                  </span>
                  <span className="font-roboto font-medium text-gray-300 tracking-widest">
                    {server.discord}
                  </span>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <span className="font-bold font-poppins text-gray-100 uppercase leading-8 tracking-widest">
                    Status
                  </span>
                  <span
                    className={`font-roboto font-medium  tracking-widest ${
                      server.status === "Pending"
                        ? "text-red-700"
                        : "text-green-500"
                    } `}
                  >
                    {server.status}
                  </span>
                </div>
                <div className="flex justify-center items-center">
                  <button className="px-10 py-2 bg-indigo-500">
                    Edit <FontAwesomeIcon icon={faEdit} />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProfileServers;

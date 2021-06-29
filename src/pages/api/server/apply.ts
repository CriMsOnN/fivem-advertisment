import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import prisma from "~/lib/prisma";

interface serversData {
  server_name: string;
  server_ip: string;
  server_discord: string;
  bio: string;
  image: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: "Method not allowed!" });
    return;
  }
  console.log("hello");

  const session = await getSession({ req });
  if (!session) {
    res.status(403).json({ message: "Unauthorized" });
    return;
  }
  console.log(req.body);
  const serverData: serversData = req.body;
  const userID = session.userID as string;

  const findServer = await prisma.servers.findFirst({
    where: {
      name: serverData.server_name,
    },
  });

  if (findServer) {
    res.status(404).json({ message: "Server already exists" });
    return;
  }

  const createServer = await prisma.servers.create({
    data: {
      name: serverData.server_name,
      ip: serverData.server_ip,
      discord: serverData.server_discord,
      image: serverData.image,
      bio: serverData.bio,
      userID,
    },
  });

  return res.status(200).json({ message: "Server created" });
};

export default handler;

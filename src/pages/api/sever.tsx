import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // const prisma = new PrismaClient();
  // const server = await prisma.servers.create({
  //   data: {
  //     name: "test",
  //     ip: "test",
  //     discord: "test",
  //     image: "test",
  //     userID: "33dc2331-f484-4638-b8ab-af01a1b99773",
  //   },
  // });
  //   const user = await prisma.user.update({
  //     where: {
  //       id: "33dc2331-f484-4638-b8ab-af01a1b99773",
  //     },
  //     data: {
  //       servers: {
  //         connect: {},
  //       },
  //     },
  //   });
};

export default handler;

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import prisma from "~/lib/prisma";
import withAuth from "~/lib/withAuth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: "Method not allowed!" });
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (user) {
    await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        image: req.body.url,
      },
    });

    res.status(200).json({ url: req.body.url });
  }
};

export default withAuth(handler, [
  "User",
  "Streamer",
  "Moderator",
  "Admin",
  "Superadmin",
]);

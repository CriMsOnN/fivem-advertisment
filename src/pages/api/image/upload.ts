import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import prisma from "~/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: "Method not allowed!" });
    return;
  }

  if (!session) {
    res.status(403).json({ message: "Unauthorized!" });
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  console.log(req.body.url);
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

export default handler;

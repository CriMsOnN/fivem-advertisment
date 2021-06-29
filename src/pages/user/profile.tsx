import { getSession, useSession } from "next-auth/client";
import Profile from "~/components/User/Profile";
import prisma from "~/lib/prisma";

interface Props {
  firstname: string;
  lastname: string;
  email: string;
  image: string;
  servers: string[];
}

const ProfilePage = ({ firstname, lastname, email, image, servers }: Props) => {
  return (
    <div>
      <Profile
        firstname={firstname}
        lastname={lastname}
        email={email}
        image={image}
        servers={servers}
      />
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const session = await getSession({ req: ctx.req });
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  const user = await prisma.user.findFirst({
    where: {
      username: session.username,
    },
    include: {
      servers: true,
    },
  });

  if (user) {
    return {
      props: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        username: user.username,
        image: user.image,
        servers: user.servers,
      },
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
}

export default ProfilePage;

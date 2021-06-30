-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Streamer', 'Moderator', 'Admin', 'Superadmin');

-- CreateTable
CREATE TABLE "Servers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "discord" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT E'Pending',
    "image" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "userID" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT E'https://res.cloudinary.com/dmwx4empc/image/upload/v1624821458/fivemgreece/no-image_ta0kby.png',
    "role" "Role" NOT NULL DEFAULT E'User',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Streamers" (
    "id" TEXT NOT NULL,
    "channel_name" TEXT NOT NULL,
    "channel_label" TEXT NOT NULL,
    "onFirstPage" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Servers" ADD FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

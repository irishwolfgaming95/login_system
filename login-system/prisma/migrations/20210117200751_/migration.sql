-- CreateTable
CREATE TABLE "User" (
    "email" TEXT,
"id" SERIAL,
    "username" TEXT NOT NULL DEFAULT E'username',
    "hashedpassword" TEXT NOT NULL DEFAULT E'password',
    "name" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");

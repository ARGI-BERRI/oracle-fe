-- CreateTable
CREATE TABLE "Config" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "displayName" TEXT,
    "rememberPast" BOOLEAN NOT NULL DEFAULT false,
    "receiveFunnyFate" BOOLEAN NOT NULL DEFAULT false,
    "useMarkdown" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Config_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Config_email_key" ON "Config"("email");

import { PrismaClient } from "@prisma/client";

const main = async ({ breed }: { breed: string }) => {
  const prisma = new PrismaClient();

  const petBreed = await prisma.petBreed.create({
    data: {
      name: breed,
    },
  });

  console.log(JSON.stringify(petBreed));
};

main({
  breed: process.argv[2] as string,
}).catch(console.error);

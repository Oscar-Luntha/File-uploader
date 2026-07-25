import { prisma } from "./lib/prisma.js";

async function main() {
  await prisma.$connect();
  console.log("Connected to the database");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

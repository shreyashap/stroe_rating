import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  await prisma.rating.deleteMany();
  await prisma.store.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("Password@123", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Alice Admin",
      email: "admin@example.com",
      address: "Admin Street",
      password: passwordHash,
      role: "ADMIN",
    },
  });

  const owner = await prisma.user.create({
    data: {
      name: "Oscar Owner",
      email: "owner@example.com",
      address: "Owner Lane",
      password: passwordHash,
      role: "STORE_OWNER",
    },
  });

  const user1 = await prisma.user.create({
    data: {
      name: "Nina Normal",
      email: "nina@example.com",
      address: "User Road",
      password: passwordHash,
      role: "NORMAL",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Bob Normal",
      email: "bob@example.com",
      address: "Second Street",
      password: passwordHash,
      role: "NORMAL",
    },
  });

  const store = await prisma.store.create({
    data: {
      name: "Oscar's Cafe",
      email: "cafe@example.com",
      address: "Main Market",
      ownerId: owner.id,
    },
  });

  await prisma.rating.createMany({
    data: [
      { value: 4, userId: user1.id, storeId: store.id },
      { value: 5, userId: user2.id, storeId: store.id },
    ],
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

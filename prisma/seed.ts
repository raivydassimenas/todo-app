import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: "Alice",
        email: "alice@mail.com",
        slug: "alice"
      },
      {
        name: "Bob",
        email: "bob@mail.com",
        slug: "bob"
      },
    ]
  });

  const alice = await prisma.user.findUnique({  where: { slug: "alice" } });

  if (alice) {
    await prisma.todo.create({
        data: {
            title: "Buy milk",
            slug: "buy-milk",
            content: "Buy milk at the store",
            user: {
            connect: { id: alice.id }
            }
        }
    })
  }
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


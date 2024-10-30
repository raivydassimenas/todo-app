// import { PrismaClient } from '@prisma/client/edge'
// import { withAccelerate } from '@prisma/extension-accelerate'

// import { PrismaClient } from '@prisma/client' // edge'

// const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

// export const prisma = globalForPrisma.prisma || new PrismaClient() //.$extends(withAccelerate())

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

// import { Pool } from "pg";
// import { PrismaPg } from "@prisma/adapter-pg";
// import { PrismaClient } from "@prisma/client";

// const connectionString = `${process.env.DATABASE_URL}`;

// const pool = new Pool({ connectionString });
// const adapter = new PrismaPg(pool);
// export const prisma = new PrismaClient({ adapter });

import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

export const prisma = new PrismaClient().$extends(withAccelerate());
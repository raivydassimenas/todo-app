// import NextAuth, { type DefaultSession } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { prisma } from "@/prisma";
// import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { hash, compare } from "bcryptjs";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

// declare module "next-auth" {
//   interface Session {
//     user: {
//       address: string;
//     } & DefaultSession["user"];
//   }
// };

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     Credentials({
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const user = await prisma.user.findFirst({
//           where: {
//             email: credentials.email as string,
//           },
//         });

//         if (!user) {
//           throw new Error("No user found");
//         }

//         const comp = await bcrypt.compare(credentials.password as string, (user as any).password);
//         if (comp) {
//           // Remove the password from the user object before returning
//           return user;
//         } else {
//           throw new Error("Password does not match");
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//   },
// });

export const handlers = {
  GET: async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    res.json(user);
  },
  POST: async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json(user);
  },
};

// export async function createUser(email: string, password: string) {
//   // Check if user already exists
//   const existingUser = await prisma.user.findUnique({
//     where: { email },
//   });

//   if (existingUser) {
//     throw new Error("User already exists");
//   }

//   // Hash the password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Create the user
//   const user = await prisma.user.create({
//     data: {
//       email,
//       password:hashedPassword, // Changed from password: hashedPassword
//     },
//   });

//   // Return the user without the password
//   const { password: _, ...userWithoutPassword } = user;
//   return userWithoutPassword;
// }
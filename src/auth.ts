import NextAuth from "next-auth";
import { authConfig } from "./app/api/auth/[...nextauth]/route";

// Extend the default session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
  }

  interface JWT {
    id: string;
    name?: string | null;
    email?: string | null;
  }
}

const { handlers, auth } = NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    async session({ session, token }) {
      if (session.user && token.sub) {
        // Create a new user object with the correct types
        const sessionUser = {
          ...session.user,
          id: token.sub,
          name: token.name || null,
          email: token.email || null,
        };
        // Assign back to session.user with type assertion
        session.user = sessionUser as any;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.name = user.name || null;
        token.email = user.email || null;
      }
      return token;
    },
  },
});

export { handlers, auth };

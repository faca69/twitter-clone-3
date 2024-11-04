import { getUserByUsername } from "@/services/users.service";
import { DefaultSession, getServerSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
    } & DefaultSession["user"];
  }
}

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        console.log(credentials);

        if (!credentials) return null;

        const { username, password } = credentials;

        const user = await getUserByUsername(username);
        if (!user) return null;

        if (bcrypt.compareSync(password, user.password)) {
          return {
            id: user.id,
            name: user.name,
            email: user.username,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      return {
        ...session,
        user: {
          name: session.user?.name,
          username: session.user?.email,
          id: token.sub,
        },
      };
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: "say_lalisa_love_me_lalisa_love_me_hey",
};

export const getNextServerSession = () => getServerSession(options);

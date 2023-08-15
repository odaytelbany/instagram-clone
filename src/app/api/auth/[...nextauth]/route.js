import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  providers: [
    GoogleProvider(
       {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
       }
    )
  ],
  pages: {
    signIn: '/auth'
  }, 
  callbacks: {
    session({ session, user, token }) {
      session.user.username = session.user.name.split(" ").join("").toLowerCase();
      session.user.uid = token?.sub
      return session;
    },
  }
}


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
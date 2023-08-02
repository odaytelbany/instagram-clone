import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GoogleProvider(
       {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
       }
    )
  ],
  
  theme: {
    logo: "https://links.papareact.com/ocw",
    brandColor: "#F13287",
    colorScheme: "auto"
  },
  // pages: {
  //   signIn: '/auth/signin'
  // }
})

export { handler as GET, handler as POST }
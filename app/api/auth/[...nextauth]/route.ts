import NextAuth , {type DefaultSession }from "next-auth"
import {prismaClient} from "@/app/utils/db"

import GoogleProvider from "next-auth/providers/google";
declare module "next-auth" {
  interface Session {
      user: {
          id: string
      } & DefaultSession["user"]
  }
}



 const handler= NextAuth( {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "" ,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
      })
   
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks:{
    async signIn(params){
      if(!params.user.email){
        return false;
      }
      try{
        const existingUser=await prismaClient.user.findFirst({
          where:{
            email:params.user.email
          }
        })
        if(existingUser){
          return true;
        }
        await prismaClient.user.create({
          data:{
            email:params.user.email,
            type:"google"
          }
        })
        return true;


      }
      catch(err){
        return false;

      }
    },
  
  async session({session}){
    console.log("session in",session);
    const dbUser=await prismaClient.user.findUnique({
      where:{
        email:session?.user?.email ?? ""
      }
    });
    if(!dbUser){
      return session;
    }
    session.user.id=dbUser.id
    
    return session;

  }
}

})


export { handler as GET, handler as POST }
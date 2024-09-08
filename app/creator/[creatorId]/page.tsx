"use client"

import StreamView from "@/components/StreamView"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const page=({params}:{
    params:{
        creatorId:string
    }
   
})=>{
    const session=useSession();
    const router=useRouter();
    if(!session.data?.user.id){
        typeof window !== "undefined" && window.localStorage.setItem('creatorId', params.creatorId);
        return router.push("/")

        
    }
    
    return <StreamView creatorId={params.creatorId}/>
}
export default page;
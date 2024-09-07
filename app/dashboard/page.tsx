"use client"
import StreamView from "@/components/StreamView";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";


export default function Component() {
    const session=useSession();
    const router=useRouter();
    if(!session.data?.user.id){
        return router.push('/');
    }

    

    return <StreamView/>
}


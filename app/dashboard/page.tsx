"use client"
import StreamView from "@/components/StreamView";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";


export default function Component() {
    const session=useSession();
    const router=useRouter();
    const storedCreatorId = typeof window !== "undefined"?window.localStorage.getItem('creatorId'):null;
    if(!session.data?.user.id){
        return router.push('/');
    }

    

    return <StreamView creatorId={storedCreatorId?storedCreatorId:session.data.user.id}/>
}


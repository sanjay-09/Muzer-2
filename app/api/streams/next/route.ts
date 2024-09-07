import { prismaClient } from "@/app/utils/db";
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";

export const GET=async()=>{
    try{
        const session=await getServerSession();
        const user=await prismaClient.user.findUnique({
            where:{
                email:session?.user?.email ?? ""
            }
        })
        if(!user){
            return NextResponse.json({
                message:'User unauthenticated'
            },{
                status:401
            })
        }
        const mostUpvotedStream=await prismaClient.stream.findFirst({
            where:{
                userId:user.id,
                played:false
            },
            orderBy:{
                upvotes:{
                    _count:'desc'
                }
            }
        })
        const p1=prismaClient.currentStream.upsert({
            where:{
                userId:user.id
            },
            update:{
                streamId:mostUpvotedStream?.id
            },
            create:{
                userId:user.id,
                streamId:mostUpvotedStream?.id!
            }
        })
        const p2=prismaClient.stream.update({
            where:{
                id:mostUpvotedStream?.id
            },
            data:{
                played:true
            }
        })
        await Promise.all([p1,p2]);
        return NextResponse.json({
            stream:mostUpvotedStream
        },{
            status:200
        })
        
       


    }
    catch(err){
        console.log(err);
        return NextResponse.json({
           message:'error'
        },{
            status:500
        })


    }
}

import { prismaClient } from '@/app/utils/db';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import * as z from 'zod';
const upVoteSchema=z.object({
    streamId:z.string()
});
export const POST=async(req:NextRequest)=>{
    try{
        const data=await upVoteSchema.parse(await req.json());
        const session=await getServerSession();
        const user=await prismaClient.user.findUnique({
            where:{
                email:session?.user.email ?? ""
                
            }
        })
        if(!user){
            return NextResponse.json({
                message:'User unauthenticated'
            },{
                status:500
                
            })
        }
        await prismaClient.upvote.create({
            data:{
                userId:user.id,
                streamId:data.streamId
            }
        })
        return NextResponse.json({
            message:'upvoted on the stream'

        },{
            status:200
        })


    }
    catch(err){
        return NextResponse.json({
            message:'Not able to upvote'
        },{
            status:500
        })

    }
}
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod"
//@ts-ignore
import youtubesearchapi from 'youtube-search-api'
import { prismaClient } from "@/app/utils/db";
import { getServerSession } from "next-auth";
const streamSchema=z.object({
    creatorId:z.string(),
    url:z.string()

})
const YTRegez=/^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;

export const POST=async(req:NextRequest)=>{
 
   try{
    const result=streamSchema.parse(await req.json());
    const isYtUrl=await result.url.match(YTRegez);
    if(!isYtUrl){
        return NextResponse.json({
            message:'URL Error'

        },{
            status:500
        })
    }
    const extractedId=result.url.split("?v=")[1];
    const data=await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${extractedId}&key=${process.env.NEXT_API_KEY}`);
    const dataResponse=await data.json();
    let thumbnails=dataResponse.items[0].snippet.thumbnails;
   


    await prismaClient.stream.create({
        data:{
            userId:result.creatorId,
            title:dataResponse.items[0].snippet.title,
            smallImg:thumbnails.high.url,
            largeImg:thumbnails.standard.url,
            extractedId:extractedId,
            url:result.url
        }
    })

    return NextResponse.json({
        data:"created the stream"
    },{
        status:200
    })

   }
   catch(err){
    console.log(err);
    
    return NextResponse.json({
        data:err
    },{
        status:500
    })

    
   }
   
}
export const GET=async(req:NextRequest)=>{
     try{
        const {searchParams}=new URL(req.url);
     const creatorId=searchParams.get('creatorId');
     const session=await getServerSession();
     const isUser=await prismaClient.user.findUnique({
        where:{
            email:session?.user.email ?? ""
        }
     })
     if(!isUser){
        return NextResponse.json({
           message:'user unauthenticated'
        },{
            status:502
            
        })
     }
     const [streams,active]=[await prismaClient.stream.findMany({
        where:{
            userId:creatorId ?? "",
            played:false
           
        },
        include:{
           _count:{
            select:{
                upvotes:true
                
            }
           },
           upvotes:{
            where:{
                userId:isUser.id
            }
           },
           

        },
        
       
     }),await prismaClient.currentStream.findFirst({
        where:{
            userId:creatorId!
        },
        include:{
            stream:{
                select:{
                    id:true,
                    title:true,
                    largeImg:true,
                    extractedId:true
                  
                }
            }
        }
     })]
     
     const finalData=streams.map(({upvotes,_count,...rest})=>{
        return {
            upvotes:_count.upvotes,
            isVoted:upvotes.length>0?true:false,
            ...rest
        }

     })
     console.log(finalData);
     return NextResponse.json({
        data:finalData,
        active:active?.stream
     },{
        status:200
     })
     }
     catch(err){
        return NextResponse.json({
            error:err
        },{
            status:500
        })
     }
}
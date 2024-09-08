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
    const data=await youtubesearchapi.GetVideoDetails(extractedId);
    let thumbnails=data.thumbnail.thumbnails;
    thumbnails=thumbnails.sort((a:{width:number},b:{width:number})=>{
        return a.width-b.width

    });


    await prismaClient.stream.create({
        data:{
            userId:result.creatorId,
            title:data.title,
            smallImg:thumbnails.length>1?thumbnails[thumbnails.length-2].url:thumbnails[thumbnails.length-1].url,
            largeImg:thumbnails[thumbnails.length-1].url,
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
        data:"error"
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
"use client"
import { ArrowBigUp,ArrowBigDown } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import AppBar from '@/components/AppBar';
import { useEffect, useState } from 'react';
import { SongType } from '@/app/types.t';

const refreshTimer=10*1000;

export default function StreamView() {
    const [songs,setSongs]=useState<SongType[]>([]);
    const [youtubeUrl,setYoutubeUrl]=useState(null);
    const refereshFeeds=async()=>{
        console.log('a');
        const data=await fetch('/api/streams?creatorId=8bb9db2b-2899-40b8-bacf-8864ed655b55');
        if(!data.ok){
            console.log("we");
            return;
        }
        const response=await data.json();
        const songsData=response.data.sort((a:{upvotes:number},b:{upvotes:number})=>{
            return a.upvotes-b.upvotes
        })
        setSongs(songsData);

    }
    useEffect(()=>{
        setInterval(()=>{
            console.log('b');
            refereshFeeds();
            
        },refreshTimer);
    },[]);

    const addToTheQueue=async()=>{
        const data=await fetch('/api/streams',{
            method:'POST',
            body:JSON.stringify({
                creatorId:'8bb9db2b-2899-40b8-bacf-8864ed655b55',
                url:youtubeUrl
            })
           

        })
        if(!data.ok){
            return;
        }
    }
  return (
    <div className="flex flex-col gap-8 max-w-3xl mx-auto px-4 py-8">
        <AppBar/>
      <div className="bg-[#f0f8ff] rounded-lg shadow-sm p-4 flex items-center gap-4">
        <Input
          type="text"
          placeholder="Add a song to the queue"
          className="flex-1 bg-[#e6f2ff] rounded-md px-4 py-2 text-sm"
          onChange={(e:any)=>{
            setYoutubeUrl(e.target.value);

          }}
        />
        <Button size="sm" className="bg-[#4CAF50] text-white hover:bg-[#45a049]" onClick={()=>{

        }}>
          Add
        </Button>
      </div>
      <div className="bg-[#f0f8ff] rounded-lg shadow-sm p-4 flex items-center gap-4">
        <img
          src="https://placehold.co/200x200"
          alt="Song thumbnail"
          width={200}
          height={200}
          className="rounded-md object-cover"
          style={{ aspectRatio: "200/200", objectFit: "cover" }}
        />
        <div className="flex-1 grid gap-1">
          <div className="font-medium">Song Title</div>
          <div className="text-[#6c757d] text-sm">Artist Name - Album Name</div>
        </div>
       
      </div>
      <div className="bg-[#f0f8ff] rounded-lg shadow-sm p-4">
        <div className="font-medium mb-4 text-black">Upcoming Songs</div>
        <div className="grid gap-4">
          <div className="bg-[#e6f2ff] rounded-lg p-4 flex items-center gap-4">
            {
                songs.map((song)=>{
                    return (
                        <>
                        <img
              src={song.largeImg}
              alt="Song thumbnail"
              width={200}
              height={200}
              className="rounded-md object-cover"
              style={{ aspectRatio: "200/200", objectFit: "cover" }}
            />
            <div className="flex-1 grid gap-1">
              <div className="font-medium text-black">{song.title}</div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost" className="text-[#4CAF50]">
                <ArrowBigUp className="w-5 h-5" />
              </Button>
              <div className="text-sm text-[#6c757d]">{song.upvotes}</div>
              <Button size="icon" variant="ghost" className="text-[#4CAF50]">
                <ArrowBigDown className="w-5 h-5" />
              </Button>
            </div>

                        </>
                    )
                })
            }
          </div>
        
        </div>
      </div>
    </div>
  )
}


"use client"
import { ArrowBigUp,ArrowBigDown } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import AppBar from '@/components/AppBar';
import { useEffect, useRef, useState } from 'react';
import { SongType } from '@/app/types.t';
import Songs from './Songs';
//@ts-ignore
import YouTubePlayer  from "youtube-player"

const refreshTimer=10*1000;

export default function StreamView({creatorId}:{creatorId:string}) {
    const [songs,setSongs]=useState<SongType[]>([]);
    const [youtubeUrl,setYoutubeUrl]=useState("");
    const [loading,setLoading]=useState(false);
    const [activeStream,setActiveStream]=useState<SongType>();
    console.log(activeStream);
    console.log("creatorId",creatorId)
    const video=useRef<HTMLDivElement>();
    const refereshFeeds=async()=>{
       
        const data=await fetch(`/api/streams?creatorId=${creatorId}`);
        if(!data.ok){
            console.log("we");
            return;
        }
        const response=await data.json();
        const songsData=response.data.sort((a:{upvotes:number},b:{upvotes:number})=>{
            return b.upvotes-a.upvotes
        })
        setSongs(songsData);
       if(response.active){
        setActiveStream(video=>{
          if(video?.id===response.active.id){
            return video;
          }
          return response.active;
        });
       }

    }
    useEffect(()=>{
       const interval= setInterval(()=>{
           
            refereshFeeds();
            
        },refreshTimer);
        return () => clearInterval(interval)
    },[creatorId]);

    const addToTheQueue=async()=>{
        setLoading(true);
        const data=await fetch('/api/streams',{
            method:'POST',
            body:JSON.stringify({
                creatorId:creatorId,
                url:youtubeUrl
            })
           

        })
        setYoutubeUrl("");
        setLoading(false);
     
        if(!data.ok){
            return;
        }
        
    }
    const vote=async(id:string,type:string)=>{
      try{
        const songsData=[...songs];
      const index=songsData.findIndex((song:SongType)=>{
        return song.id===id
      })
      if(type==='upvote'){
        songsData[index].upvotes++;
      }
      else{
        songsData[index].upvotes--;

      }
    
      setSongs(songsData.sort((a,b)=>{
        return b.upvotes-a.upvotes
      }));
      await fetch(`/api/streams/${type==='upvote'?'UpVote':'downVote'}`,{
        method:"POST",
        body:JSON.stringify({
          streamId:id

        })
      })
      }
      catch(err){
        console.log(err);
      }


    }
    const playNext=async()=>{
      console.log('play');
      const data=await fetch('/api/streams/next');
      if(!data.ok){
        return;
      }
      const responsedata=await data.json();
      setActiveStream(responsedata.stream);
     const updated=songs.filter((song)=>{
      return song.id!=responsedata.stream.id

      })
      setSongs(updated);

    }
    useEffect(()=>{
      if(!video.current || !activeStream){
        return;
      }
     

const player = YouTubePlayer(video.current);
console.log('in',video.current,activeStream.title,activeStream?.extractedId);

// 'loadVideoById' is queued until the player is ready to receive API calls.
player.loadVideoById(''+activeStream?.extractedId);


// 'playVideo' is queue until the player is ready to received API calls and after 'loadVideoById' has been called.
player.playVideo();
const eventHandler = (event: { data: number }) => {
  if (event.data === 0) {
      playNext()
  }
}
player.on('stateChange', eventHandler)
return () => {
  player.destroy()
}


  
 
 



      
    },[activeStream,video])
  return (
    <div className="flex flex-col gap-8 max-w-3xl mx-auto px-4 py-8">
        <AppBar/>
      <div className="bg-[#f0f8ff] rounded-lg shadow-sm p-4 flex items-center gap-4">
        <Input
          type="text"
          placeholder="Add a song to the queue"
          className="flex-1 bg-[#e6f2ff] rounded-md px-4 py-2 text-sm text-black"
          value={youtubeUrl}
          onChange={(e:any)=>{
            setYoutubeUrl(e.target.value);

          }}
        />
       {
        loading? <Button size="sm" className="bg-[#4CAF50] text-white hover:bg-[#45a049]">
          Adding to the Queue......
        </Button>: <Button size="sm" className="bg-[#4CAF50] text-white hover:bg-[#45a049]" onClick={()=>{
          addToTheQueue()

        }}>
          Add
        </Button>
        
        
       }
      
       
      </div>
      <Button size="sm" className="bg-[#4CAF50] text-white hover:bg-[#45a049]" onClick={()=>{
          
          navigator.clipboard.writeText(`http://localhost:3000/creator/${creatorId}`);

        }}>
          Share
        </Button>
     { 
     //@ts-ignore
      
      activeStream &&  <div ref={video} className='w-full'>
        
        </div>
       
      
     }
      <Button size="sm" className="bg-[#4CAF50] text-white hover:bg-[#45a049]" onClick={()=>{
        playNext();
          
         

        }}>
          Play Next
        </Button>

      <div className="bg-[#f0f8ff] rounded-lg shadow-sm p-4">
        <div className="font-medium mb-4 text-black">Upcoming Songs</div>
        <div className="grid gap-4">
          <div className="bg-[#e6f2ff] rounded-lg p-4 flex flex-col items-center gap-4">
            {
                songs.map((song)=>{
                    return <Songs song={song} vote={vote}/>
                })
            }
          </div>
          
        
        </div>
      </div>
    </div>
  )
}


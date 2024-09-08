"use client"
import { ArrowBigUp, ArrowBigDown } from "lucide-react";
import { Button } from "./ui/button";
import { SongType } from "@/app/types.t";

const Songs: React.FC<{
  song: SongType;
  vote: (id: string, type: string) => void;
}> =  ({ song, vote }) => {
  return (
    <div className="flex">
      <div className="flex gap-3 pl-0">
        <img
          src={song.smallImg}
          alt="Song thumbnail"
          width={200}
          height={200}
          className="rounded-md max-w-[200px]"
          style={{ aspectRatio: "200/200", objectFit: "cover" }}
        />
        <div className="flex-1 grid gap-1">
          <div className="font-medium text-black ">{song.title}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
       {
        song.isVoted?<Button
        size="icon"
        variant="ghost"
        className="text-[#4CAF50]"
        onClick={() => vote(song.id, "downvote")}
      >
        <ArrowBigDown className="w-5 h-5" />
      </Button>:<Button
        size="icon"
        variant="ghost"
        className="text-[#4CAF50]"
        onClick={() => vote(song.id, "upvote")}
      >
        <ArrowBigUp className="w-5 h-5" />

      </Button>
       }
       <Button>{song.upvotes}</Button>
       
      </div>
    </div>
  );
};
export default Songs;

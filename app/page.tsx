import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlayCircle, Heart, Rss } from "lucide-react"
import AppBar from "@/components/AppBar"
import Redirect from "@/components/Redirect"
import { MusicIcon, PlayCircleIcon, RadioIcon, ThumbsUpIcon } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
     <AppBar/>
     <Redirect/>
    
      <main className="flex-1 flex flex-col">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-green-800">
                  Your Music, Live and Interactive
                </h1>
                <p className="mx-auto max-w-[700px] text-green-700 md:text-xl">
                  Stream millions of songs, upvote live music, and shape the playlist in real-time. Experience music like never before.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-green-600 text-white hover:bg-green-700">SignIn To Explore the world of music</Button>
                
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-green-800">
              Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
              <div className="flex flex-col items-center space-y-3 text-center max-w-[300px]">
                <PlayCircleIcon className="w-12 h-12 text-green-600" />
                <h3 className="text-xl font-bold text-green-700">Unlimited Streaming</h3>
                <p className="text-green-600">Listen to your favorite tracks anytime, anywhere.</p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center max-w-[300px]">
                <RadioIcon className="w-12 h-12 text-green-600" />
                <h3 className="text-xl font-bold text-green-700">Live Streaming of Music</h3>
                <p className="text-green-600">Experience live music streams and interact with other listeners.</p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center max-w-[300px]">
                <ThumbsUpIcon className="w-12 h-12 text-green-600" />
                <h3 className="text-xl font-bold text-green-700">Upvote Your Favorites</h3>
                <p className="text-green-600">Shape the playlist by upvoting the next song you want to hear.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-10 text-center lg:text-left">
              <div className="space-y-4 lg:w-1/2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-800">
                  Join the MeloStream Community
                </h2>
                <p className="max-w-[600px] mx-auto lg:mx-0 text-green-700 md:text-xl/relaxed">
                  Be part of a vibrant community of music lovers. Share your taste, discover new artists, and influence what plays next.
                </p>
                
              </div>
              
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 w-full shrink-0 px-4 md:px-6 border-t border-green-300">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-green-700 text-center sm:text-left">© 2023 Sanjay Singh. All rights reserved.</p>
          <nav className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
            <Link className="text-xs hover:underline underline-offset-4 text-green-700" href="#">
              Terms of Service
            </Link>
            <Link className="text-xs hover:underline underline-offset-4 text-green-700" href="#">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
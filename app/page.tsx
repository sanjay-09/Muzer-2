import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlayCircle, Heart, Rss } from "lucide-react"
import AppBar from "@/components/AppBar"
import Redirect from "@/components/Redirect"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
     <AppBar/>
     <Redirect/>
      <main className="flex-1 flex flex-col items-center">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center">
          <div className="container px-4 md:px-6 text-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Music that moves you.
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                Millions of tracks, podcasts, and playlists. No credit card needed.
              </p>
              <Button className="bg-green-500 text-black hover:bg-green-400" size="lg">
                GET MUZER FREE
              </Button>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-12">Why Muzer?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center">
                <PlayCircle className="h-12 w-12 mb-4 text-green-500" />
                <h3 className="text-xl font-bold mb-2">Play your favorites.</h3>
                <p className="text-gray-400">Listen to the songs you love, and discover new music and podcasts.</p>
              </div>
              <div className="flex flex-col items-center">
                <Heart className="h-12 w-12 mb-4 text-green-500" />
                <h3 className="text-xl font-bold mb-2">Playlists made easy.</h3>
                <p className="text-gray-400">We'll help you make playlists. Or enjoy playlists made by music experts.</p>
              </div>
              <div className="flex flex-col items-center">
                <Rss className="h-12 w-12 mb-4 text-green-500" />
                <h3 className="text-xl font-bold mb-2">Make it yours.</h3>
                <p className="text-gray-400">Tell us what you like, and we'll recommend music for you.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="playlists" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-12">Today's biggest hits</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="group">
                  <div className="relative overflow-hidden rounded-md">
                    <img
                      src={`/placeholder.svg?height=300&width=300`}
                      alt={`Playlist ${i}`}
                      className="object-cover w-full aspect-square transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button className="bg-green-500 text-black hover:bg-green-400 rounded-full p-3">
                        <PlayCircle className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold">Muzer Top Hits</h3>
                  <p className="text-sm text-gray-400">The hottest tracks on Muzer right now</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-700 to-blue-500">
          <div className="container px-4 md:px-6 text-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get Muzer Premium Free for 1 Month</h2>
              <p className="mx-auto max-w-[600px] text-gray-200 md:text-xl">
                Just ₹119/month after. Cancel anytime.
              </p>
              <div className="space-x-4">
                <Button className="bg-black text-white hover:bg-gray-900">GET STARTED</Button>
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                  SEE OTHER PLANS
                </Button>
              </div>
              <p className="text-xs text-gray-200 max-w-[600px] mx-auto">
                Terms and conditions apply. 1 month free not available for users who have already tried Premium.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-black border-t border-gray-800">
        <div className="container px-4 md:px-6 flex flex-col items-center">
          <div className="flex flex-col items-center gap-4 mb-4">
            <Link className="flex items-center justify-center" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-500"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14.5c0 1 .7 2 1.5 2 1.5 0 2.5-2 2.5-4 0-2.5-1-4-2.5-4-.8 0-1.5 1-1.5 2" />
                <path d="M12 12v4" />
                <path d="M16 14.5c0 1-.7 2-1.5 2-1.5 0-2.5-2-2.5-4 0-2.5 1-4 2.5-4 .8 0 1.5 1 1.5 2" />
              </svg>
              <span className="ml-2 text-lg font-semibold">Muzer</span>
            </Link>
            <nav className="flex gap-4 sm:gap-6">
              <Link className="text-xs hover:underline underline-offset-4" href="#">
                Legal
              </Link>
              <Link className="text-xs hover:underline underline-offset-4" href="#">
                Privacy Center
              </Link>
              <Link className="text-xs hover:underline underline-offset-4" href="#">
                Privacy Policy
              </Link>
              <Link className="text-xs hover:underline underline-offset-4" href="#">
                Cookies
              </Link>
            </nav>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
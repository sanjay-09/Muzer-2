"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";
const AppBar=()=>{
    const session=useSession();

    return(
        <header className="px-4 lg:px-6 h-16 flex items-center justify-center border-b border-gray-800">
        <div className="w-full max-w-6xl flex items-center justify-between">
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
            <span className="ml-2 text-2xl font-bold">Muzer</span>
          </Link>
          <nav className="flex items-center gap-4 sm:gap-6">
          
            <div className="h-8 w-px bg-gray-800 mx-2" />
         
          {
            session?.data?.user ?   <Button className="bg-white text-black hover:bg-gray-100" onClick={()=>{
                signOut()
            }}>SignOut</Button> :  <Button className="bg-white text-black hover:bg-gray-100" onClick={()=>{
                signIn()
            }}>SignIn</Button>
          }
          </nav>
        </div>
      </header>
    )
}
export default AppBar;
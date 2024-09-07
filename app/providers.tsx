"use client"
import { SessionProvider } from "next-auth/react"
type providers={
    children:React.ReactNode
}
const Providers:React.FC<providers>=({children})=>{

    return(
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
export default Providers;
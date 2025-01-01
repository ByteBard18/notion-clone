'use client'

import { LiveblocksProvider } from "@liveblocks/react/suspense"

function LiveBlockProvider({children} : {
    children: React.ReactNode
}) {
    if(!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLISHABLE_KEY){
        throw new Error("Liveblocks API KEY not available")
    }

    {/**Add auth-endpoint as well */}
    return (
    <LiveblocksProvider throttle={16} authEndpoint={"/auth-endpoint"}>{children}</LiveblocksProvider>
  )
}
export default LiveBlockProvider
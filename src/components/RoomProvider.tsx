'use client'

import { ClientSideSuspense, RoomProvider as RoomProviderWrapper } from "@liveblocks/react/suspense"
import LoadingScreen from "./LoadingScreen";
import LiveCursorProvider from "./LiveCursorProvider";

function RoomProvider({roomId, children} : {
    roomId: string;
    children: React.ReactNode
}) {
    
    return (
        <RoomProviderWrapper id={roomId} initialPresence={{
            cursor: null
        }}>
            <ClientSideSuspense fallback={<LoadingScreen />}>
                <LiveCursorProvider>
                    {children}
                </LiveCursorProvider>
            </ClientSideSuspense>
        </RoomProviderWrapper>
    )
}
export default RoomProvider
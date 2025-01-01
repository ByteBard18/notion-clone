'use client'

import RoomProvider from "@/components/RoomProvider";
import { useEffect, useState } from 'react';

// Correctly typing the DocLayout component
interface DocLayoutProps {
    params: Promise<{ id: string }>;  // Explicitly typing 'params'
    children: React.ReactNode;
}

function DocLayout({ params, children }: DocLayoutProps) {
    const [roomId, setRoomId] = useState<string | null>(null);

    useEffect(() => {
        const fetchParams = async () => {
            try {
                const resolvedParams = await params;  // Await the promise
                setRoomId(resolvedParams.id);  // Set the roomId once resolved
            } catch (error) {
                console.error("Failed to resolve params:", error);
            }
        };

        fetchParams();
    }, [params]);

    if (roomId === null) {
        return <div>Loading...</div>;  // Show loading state while resolving params
    }

    return <RoomProvider roomId={roomId}>{children}</RoomProvider>;
}

export default DocLayout;

'use client'

import { useEffect, useState } from 'react';
import Document from "@/components/Document";

interface PageLayoutProps {
    params: Promise<{id: string}>
}

function DocumentPage({ params }: PageLayoutProps) {
    const [roomId, setRoomId] = useState<string | null>(null);

    // Using useEffect to resolve the params dynamically
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

    // Loading state until roomId is set
    if (!roomId) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-row max-w-6xl flex-1 p-4">
            <Document id={roomId} />
        </div>
    );
}

export default DocumentPage;

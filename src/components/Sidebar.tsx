'use client';

import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import NewDocumentButton from "./NewDocumentButton";
import { MenuIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useCollection } from 'react-firebase-hooks/firestore';
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import SidebarOption from "./SidebarOption";

function Sidebar() {
    type RoomDocument = {
        createdAt: string;
        role: string;
        roomId: string;
        userId: string;
    };

    const { user } = useUser();
    
    const [groupedData, setGroupedData] = useState<{
        owner: RoomDocument[],
        shared: RoomDocument[]
    }>({
        owner: [],
        shared: []
    });

    const [data, loading, error] = useCollection(
        user && (
            query(collectionGroup(db, "rooms"), where("userId", "==", user.emailAddresses[0].toString()))
        )
    );

    useEffect(() => {
        if (!data) return;

        const grouped = data.docs.reduce<{
            owner: RoomDocument[],
            shared: RoomDocument[]
        }>((acc, curr) => {
            const roomData = curr.data() as RoomDocument;

            // Create the new object with `id` and `roomData`
            const roomWithId = { id: curr.id, ...roomData };

            if (roomData.role === "owner") {
                acc.owner.push(roomWithId);
            } else {
                acc.shared.push(roomWithId);
            }

            return acc;
        }, {
            owner: [],
            shared: []
        });

        setGroupedData(grouped); // Update the state with the grouped data
    }, [data]);

    const renderOwnerDocs = () => {
        if (groupedData.owner.length === 0) {
            return <h2 className="text-2xl font-bold text-white">No Documents</h2>;
        }
        return (
            <>
                <h2 className="text-2xl font-bold text-white">My Documents</h2>
                {groupedData.owner.map((doc) => (
                    // <p key={doc.roomId}>{doc.roomId}</p>
                    <SidebarOption href={`/doc/${doc.roomId}`} id={doc.roomId} key={doc.roomId}/>
                ))}
            </>
        );
    };

    const renderSharedDocs = () => {
        if(groupedData.shared.length === 0){
            return <h2 className="text-2xl font-bold text-white">No Shared Docs</h2>
        }
        return (
            <>
                <h2 className="text-2xl font-bold text-white">Shared Documents</h2>
                {groupedData.shared.map((doc) => (
                    <SidebarOption href={`/doc/${doc.roomId}`} id={doc.roomId} key={doc.roomId}/>
                ))}
            </>
        )
    }

    const menuOptions = (
        <>
            {renderOwnerDocs()}

            {/* Add similar for Shared Docs if needed */}
            {renderSharedDocs()}
        </>
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            {/* For small screens */}
            <div className="flex flex-col sm:hidden bg-gray-200">
                <Sheet>
                    <SheetTrigger>
                        <MenuIcon />
                    </SheetTrigger>

                    <SheetContent side="left" className="flex flex-col space-y-4 p-4 bg-gray-800">
                        <SheetHeader>
                            {/* <h3 className="text-lg font-semibold text-white">Menu</h3> */}
                            <NewDocumentButton />
                        </SheetHeader>
                        {menuOptions}
                    </SheetContent>
                </Sheet>
            </div>

            {/* For medium/large screens */}
            <div className="hidden sm:flex flex-col space-y-4 p-6 bg-gray-800 text-white w-64 h-screen">
                <div className="flex justify-center mb-8">
                    {/* <h2 className="text-2xl font-semibold">Sidebar</h2> */}
                    <NewDocumentButton />
                </div>
                {menuOptions}
            </div>
        </>
    );
}

export default Sidebar;

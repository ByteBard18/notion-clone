'use client'

import { doc, updateDoc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore"
import { db } from "../../firebase";
import { Input } from "./ui/input";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { Button } from "./ui/button";
import Editor from "./Editor";
import useOwner from "@/lib/useOwner";
import DeleteDocument from "./DeleteDocument";
import InviteUser from "./InviteUser";

function Document({ id }: { id: string }) {
    const [data] = useDocumentData(doc(db, "documents", id));
    const [title, setTitle] = useState("")
    const [isUpdating, startTransition] = useTransition()

    const isOwner = useOwner();

    useEffect(() => {
        if (data) {
            setTitle(data.title)
        }
    }, [data])

    const handleTitleUpdate = (e: FormEvent) => {
        e.preventDefault()

        if (title.trim()) {
            startTransition(async () => {
                await updateDoc(doc(db, "documents", id), {
                    title: title
                })
            })
        }
    }

    if (!data) return
    return (
        <div>
            <div>
                <div className="flex flex-1 mx-auto max-w-6xl w-screen">
                    <form onSubmit={handleTitleUpdate} className="flex flex-1 p-4 space-x-2">
                        {/**Update title */}
                        <Input value={title} onChange={(e) => {
                            setTitle(e.target.value)
                        }} className="truncate" />
                        <Button disabled={isUpdating} type="submit">{isUpdating ? "Updating..." : "Update"}</Button>

                        {/**IF */}
                        {/**isOwner && inviteUser, DeleteDocument */}
                        {/**Invite User */}
                        {isOwner && (
                            <InviteUser />
                        )}
                        {/**Delete Document */}
                        {isOwner && (
                            <DeleteDocument />
                        )}

                    </form>
                </div>
            </div>
            <div>
                {/**ManageUsers */}

                {/**Avatars */}
            </div>

            <hr className="pb-10" />

            {/**Collaborative Editor */}
            <Editor />
        </div>
    )
}
export default Document
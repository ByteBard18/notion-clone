'use client'

import { useTransition } from "react"
import { Button } from "./ui/button"
import { createNewDocument } from "../../actions/actions";
import { useRouter } from "next/navigation"

function NewDocumentButton() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    
    const handleCreateNewDocument = ()=>{
        startTransition(async ()=>{
            const docId = await createNewDocument();
            router.push(`/doc/${docId}`)
        })
    }
    
    return (
        <Button onClick={handleCreateNewDocument} className="bg-gray-100 text-black hover:bg-gray-200 p-2" disabled={isPending}>
            {isPending ? "Creating..." : "New Document"}
        </Button>
    )
}
export default NewDocumentButton
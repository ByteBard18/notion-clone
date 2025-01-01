'use client'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { useState, useTransition } from "react"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "sonner"
import { deleteDocument } from "../../actions/actions"


function DeleteDocument() {
    const [isOpen, setIsOpen] = useState(false)
    const [isDeleting, startDeletion] = useTransition()
    const pathname = usePathname()
    const router = useRouter()

    const handleDeleteDocument = () => {
        startDeletion(async ()=>{
            const roomId = pathname.split("/").pop();
            if(!roomId){
                return;
            }
            const { success } = await deleteDocument(roomId);

            if(success) {
                setIsOpen(false);
                router.replace("/");
                toast.success("Document Deleted Successfully")
            }
            else{
                toast.error("Failed to delete the document")
            }
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant={"destructive"}>
                <DialogTrigger>Delete</DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your document
                        and remove data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <DialogClose className="space-x-2">
                        <Button variant={"destructive"} onClick={handleDeleteDocument} disabled={isDeleting}>
                            {isDeleting ? "Deleting..." : "Delete"}
                        </Button>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default DeleteDocument
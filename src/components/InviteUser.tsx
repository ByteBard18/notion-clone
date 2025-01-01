'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { FormEvent, useState, useTransition } from "react"
import { usePathname } from "next/navigation"
import { toast } from "sonner"
import { Input } from "./ui/input"
import { sendInvite } from "../../actions/actions"


function InviteUser() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const [email, setEmail] = useState("")
    const [isInviting, startInvitation] = useTransition()
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleInvitation = async (e: FormEvent) => {
        e.preventDefault()

        const roomId = pathname.split("/").pop()
        if (!roomId) return

        if(emailRegex.test(email)) {
            startInvitation(async () => {
                const { success } = await sendInvite(roomId, email);
    
                if (success) {
                    setIsOpen(false)
                    setEmail("")
                    toast.success("User added successfully to the room.")
                }
                else {
                    toast.error("Failed to add user to the room!")
                }
            })
        }
        else{
            toast.error("Enter a valid Email Id!")
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant={"outline"}>
                <DialogTrigger>Invite</DialogTrigger>
            </Button>
            <DialogContent className="flex flex-1 p-10">
                <DialogHeader>
                    <DialogTitle>Invite a user to collaborate!</DialogTitle>
                    <DialogDescription>
                        Enter the email of the user you want to invite.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <form onSubmit={handleInvitation} className="space-y-2">
                        <Input type="email" value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }} />
                        <Button type="submit" variant={"secondary"} disabled={isInviting}>
                            {isInviting ? "Inviting..." : "Invite"}
                        </Button>
                    </form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default InviteUser
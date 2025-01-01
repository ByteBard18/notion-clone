'use client'

import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { doc } from "firebase/firestore";
import { usePathname } from "next/navigation";
import Link from "next/link";

function SidebarOption({ href, id }: {
    href: string;
    id: string;
}) {
    const [data] = useDocumentData(doc(db, "documents", id));
    const pathname = usePathname();
    const isActive = href.includes(pathname) && pathname !== "/"

    if (!data) return
    return (
        <Link href={href} className={`relative border p-2 rounded-md hover:bg-gray-100 hover:text-black ${isActive ? "bg-gray-300 font-bold text-white border-black" : "border-gray-400"}`}>
            <p className="truncate">{data.title}</p>
        </Link>
    )
}
export default SidebarOption
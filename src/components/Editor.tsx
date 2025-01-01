import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { MoonIcon, SunIcon } from "lucide-react"
import { useRoom } from "@liveblocks/react"
import { LiveblocksYjsProvider } from '@liveblocks/yjs'
import * as Y from 'yjs'
import BlockNote from "./BlockNote"

function Editor() {
    const room = useRoom()
    const [doc, setDoc] = useState<Y.Doc>()
    const [provider, setProvider] = useState<LiveblocksYjsProvider>();
    const [isDark, setDarkMode] = useState(false)

    useEffect(()=>{
        const yDoc = new Y.Doc();
        const yProvider = new LiveblocksYjsProvider(room, yDoc);

        setDoc(yDoc);
        setProvider(yProvider);

        return ()=>{
            yDoc?.destroy();
            yProvider?.destroy()
        }
    }, [room])

    if(!doc || !provider) {
        return null;
    }

    const style = `hover:text-white ${
        isDark 
            ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700"
            : "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700" 
    }`
    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 justify-end mb-10">
                {/**Translate */}
                {/**ChatGPT */}
                {/**Dark Mode */}
                <Button className={style} onClick={()=>{
                    setDarkMode(!isDark)
                }}>
                    {isDark ? <MoonIcon /> : <SunIcon />}
                </Button>
            </div>
            {/**BlockNote */}
            <BlockNote doc={doc} provider={provider} isDarkMode={isDark} />
        </div>
    )
}
export default Editor
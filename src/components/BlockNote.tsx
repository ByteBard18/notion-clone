import * as Y from 'yjs'
import { useCreateBlockNote } from "@blocknote/react"
import { BlockNoteEditor } from "@blocknote/core"
import { BlockNoteView } from "@blocknote/shadcn"
import "@blocknote/core/style.css"
import "@blocknote/shadcn/style.css"
import { useSelf } from '@liveblocks/react'
import { LiveblocksYjsProvider } from "@liveblocks/yjs";

type BlockNoteProps = {
    doc: Y.Doc;
    provider: LiveblocksYjsProvider;
    isDarkMode: boolean
}

function BlockNote({doc, provider, isDarkMode} : BlockNoteProps) {
    const userInfo = useSelf((me)=>{
        return me.info;
    })

    const editor: BlockNoteEditor = useCreateBlockNote({
        collaboration: {
            provider,
            fragment: doc.getXmlFragment("document-store"),
            user: {
                name: userInfo?.name ?? "Unknown User",
                color: ''
            }
        }
    })

    return (
    <div className='relative max-w-6xl mx-auto'>
        <BlockNoteView 
            editor={editor}
            theme={isDarkMode ? "dark" : "light"}
            className='min-h-screen'
        />
    </div>
  )
}
export default BlockNote
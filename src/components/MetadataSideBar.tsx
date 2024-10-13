import { SidebarAppSDK } from "@contentful/app-sdk";
import { List, ListItem, Note } from "@contentful/f36-components";
import { useEffect, useState } from "react";

interface MetadataSidebar {
    sdk: SidebarAppSDK;
}

export const MetadataSidebar = ({ sdk }: MetadataSidebar) => {

    const [charCount, setCharCount] = useState(0)
    const [author, setAuthor] = useState("")

    useEffect(() => {
        sdk.window.startAutoResizer()
        const metaValue = sdk.entry.fields.meta.getValue()
        setCharCount(metaValue.wordCount)
        setAuthor(metaValue.author)
    }, [sdk])

    return (
        <div className='h-full flex flex-col gap-2 content-center items-center'>
            <h1 className='font-semibold text-emerald-900 text-xl text-center'>Metadata</h1>
            <Note className="w-full">
                <List className="w-full">
                    <ListItem><span className="font-bold">Word Count:</span> {charCount}</ListItem>
                    <ListItem><span className="font-bold">Author:</span> {author}</ListItem>
                </List>
            </Note>
        </div>
    );
}
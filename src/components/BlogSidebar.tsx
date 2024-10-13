import { List, Note, ListItem } from "@contentful/f36-components";
import { readingTime } from "../utils/readingTime";
import { useFieldUpdate } from "../utils/useFieldUpdate";
import { SidebarAppSDK } from "@contentful/app-sdk";

const BODY_FIELD_ID = 'body';
const TITLE_FIELD_ID = 'title';
const WORDS_PER_MINUTE = 200;

interface BlogSidebarProps {
  sdk: SidebarAppSDK;
}

export const BlogSidebar = ({ sdk }: BlogSidebarProps) => {

  // With the field ID we can reference individual fields from an entry
  const bodyField = sdk.entry.fields[BODY_FIELD_ID];
  const titleField = sdk.entry.fields[TITLE_FIELD_ID];

  // Listen for onChange events and update the value
  const blogText = useFieldUpdate(bodyField)
  const title = useFieldUpdate(titleField)
  const stats = readingTime(blogText || '', WORDS_PER_MINUTE);

  return (
    <div className='h-full flex flex-col gap-2 content-center items-center'>
      <h1 className='font-semibold text-emerald-900 text-xl text-center'>Blog Post</h1>
      <Note style={{ marginBottom: '12px' }}>
        Metrics for your blog post:
        <List style={{ marginTop: '12px' }}>
          <ListItem>Word count: {stats.words}</ListItem>
          <ListItem>Reading time: {stats.text}</ListItem>

        </List>
      </Note>
    </div>
  );
}
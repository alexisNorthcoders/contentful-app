import { List, ListItem, Note } from '@contentful/f36-components';
import { SidebarAppSDK } from '@contentful/app-sdk';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import { readingTime } from '../utils/readingTime';
import { useFieldUpdate } from '../utils/useFieldUpdate';

const BODY_FIELD_ID = 'body';
const TITLE_FIELD_ID = 'title';
const WORDS_PER_MINUTE = 200;

const Sidebar = () => {
  const sdk = useSDK<SidebarAppSDK>();
  /*
     To use the cma, inject it as follows.
     If it is not needed, you can remove the next line.
  */
  // const cma = useCMA();
    // With the field ID we can reference individual fields from an entry
    const bodyField = sdk.entry.fields[BODY_FIELD_ID];
    const titleField = sdk.entry.fields[TITLE_FIELD_ID];

         // Listen for onChange events and update the value
     const blogText = useFieldUpdate(bodyField)
     const title = useFieldUpdate(titleField)

  const stats = readingTime(blogText || '', WORDS_PER_MINUTE);

  return (
    <div className='h-full flex flex-col gap-2 content-center items-center'>
      <h1 className='font-semibold text-emerald-900 text-xl text-center'>{title}</h1>
      <Note style={{ marginBottom: '12px' }}>
        Metrics for your blog post:
        <List style={{ marginTop: '12px' }}>
          <ListItem>Word count: {stats.words}</ListItem>
          <ListItem>Reading time: {stats.text}</ListItem>
          
        </List>
      </Note>
      </div>
  );
};

export default Sidebar;
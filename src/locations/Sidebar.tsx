import { List, ListItem, Note } from '@contentful/f36-components';
import { SidebarAppSDK } from '@contentful/app-sdk';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import { readingTime } from '../utils/readingTime';
import { useFieldUpdate } from '../utils/useFieldUpdate';
import { BlogSidebar } from '../components/BlogSidebar';

const BLOG_CONTENT_TYPE_ID = 'blogPost';
const METADATA_CONTENT_TYPE_ID = 'metadata';

const Sidebar = () => {
  const sdk = useSDK<SidebarAppSDK>();
  const contentType = sdk.entry.getSys().contentType.sys.id;
  
  switch (contentType) {
    case BLOG_CONTENT_TYPE_ID: // Assuming 'blog' is the content type ID for blogs
      return <BlogSidebar sdk={sdk}/>;
    case METADATA_CONTENT_TYPE_ID:
      return (<Note>Test METADATA SIDEBAR</Note>);
    default:
      return <h1>Default Sidebar</h1>;
  }
};

export default Sidebar;
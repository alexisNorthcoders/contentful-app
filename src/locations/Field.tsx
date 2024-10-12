import { List, ListItem, Note, TextInput } from '@contentful/f36-components';
import { FieldAppSDK } from '@contentful/app-sdk';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import { useEffect, useState } from 'react';
import { fetchData } from '../utils/fetchData';

const Field = () => {

  const sdk = useSDK<FieldAppSDK>();
  const [titleCharCount, setTitleCharCount] = useState(0)

    useEffect(()=>{
    sdk.window.startAutoResizer()
    const referencePostField = sdk.entry.fields.post.getValue()
    fetchData(sdk,referencePostField.sys.id)
    .then((data)=>
     { console.log(data)
      setTitleCharCount(data.fields.title['en-US'].length)
    })
    
    
  },[sdk])

if (sdk.field.type === 'Text'){
  return (
    <div className='flex flex-col gap-2'>
     <TextInput value={sdk.field.getValue()} onChange={(e)=>sdk.field.setValue(e.target.value)}/>
     <Note className='h-fit w-fit'> This is the {sdk.field.name} field</Note>
     </div>
   )
}
else {
  
  return <div className='h-fit'>
  <Note>
<List>
  <ListItem>Title length: {titleCharCount} </ListItem>
</List>
   </Note>
   </div>
}
 

};

export default Field;

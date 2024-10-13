import { List, ListItem, Note, TextInput } from '@contentful/f36-components';
import { FieldAppSDK } from '@contentful/app-sdk';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import { useEffect, useState } from 'react';
import { fetchData } from '../utils/fetchData';

const LOCALE = 'en-US'
const Field = () => {

  const sdk = useSDK<FieldAppSDK>();
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [location, setLocation] = useState("")

  useEffect(() => {
    sdk.window.startAutoResizer()
    if (sdk.field.type === 'Object') {
      const referencePostField = sdk.entry.fields.post.getValue()
      fetchData(sdk, referencePostField.sys.id)
        .then((post) => {
          
          const title = post.fields.title[LOCALE]
          setTitle(title)
          fetchData(sdk, post.fields.author[LOCALE].sys.id).then((author)=>{
            const authorName = author.fields.name[LOCALE]
            setAuthor(authorName)
            setLocation(JSON.stringify(author.fields.location[LOCALE]))
            sdk.field.setValue({wordCount: title.length, author: authorName})
          })
          
        })
    }

  }, [sdk])

  if (sdk.field.type === 'Symbol') {
    return (
      <div className='flex flex-col gap-2'>
        <TextInput value={sdk.field.getValue()} onChange={(e) => sdk.field.setValue(e.target.value)} />
        <Note className='h-fit w-fit'> This is the {sdk.field.name} field</Note>
      </div>
    )
  }
  else {

    return <div className='h-fit'>
    <div>{JSON.stringify(sdk.field.getValue())}</div>
      <Note>
        <List>
          <ListItem>Title length: {title.length} </ListItem>
          <ListItem>Author: {author} </ListItem>
          <ListItem>Location: {location} </ListItem>
        </List>
      </Note>
    </div>
  }


};

export default Field;

import React, {useState} from 'react';
import { Form, FormControl, TextInput, Button, AssetCard, MenuItem } from '@contentful/f36-components';
import { FieldAppSDK } from '@contentful/app-sdk';
import { useFieldValue, useSDK } from '@contentful/react-apps-toolkit';
import { Article } from './Dialog';

const Field = () => {
 const sdk = useSDK<FieldAppSDK>();
 const [articleSearch, setArticleSearch] = useState<string>('');
 const [articleData, setArticleData] = useFieldValue<Article | null>()
  const openDialog = async () => {
   const article = await sdk.dialogs.openCurrentApp({
     width: 700,
     parameters: {
       articleId: articleSearch
     },
     title: "Article Search",
     allowHeightOverflow:true,
     shouldCloseOnEscapePress: true,
     shouldCloseOnOverlayClick: true
   })
   if(article){
    setArticleData(article);
  }
 }

 return (
   <>
     <Form onSubmit={()=>openDialog()}>
       <FormControl>
       <FormControl.Label isRequired>Article Topic - cooking/coding/football</FormControl.Label>

       <TextInput type='text' onChange={(e) => setArticleSearch(e.target.value)} isRequired/>
       </FormControl>
       <FormControl>
       <Button type='submit' variant='primary'>Search</Button>
       </FormControl>
     </Form>
     {
       articleData && (
         <AssetCard
             type='image'
             title={articleData.title}
             src={articleData.article_img_url}
             actions={[<>
              <MenuItem key="remove"onClick={()=>setArticleData(null)}>Remove</MenuItem>
              </>]}
           />
       )
     }
     </>
 )
};

export default Field;
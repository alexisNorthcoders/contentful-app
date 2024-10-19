import React, { useEffect, useState } from 'react';
import { EntityList, Paragraph, Spinner, Stack } from '@contentful/f36-components';
import { DialogAppSDK } from '@contentful/app-sdk';
import { /* useCMA, */ useAutoResizer, useSDK } from '@contentful/react-apps-toolkit';

export interface Article {
  author: string;
  title: string;
  article_id: number;
  comment_count: number;
  article_img_url: string;
  created_at: string;
  topic: string;
}



const Dialog = () => {
  const sdk = useSDK<DialogAppSDK>();
  useAutoResizer();
  /*
     To use the cma, inject it as follows.
     If it is not needed, you can remove the next line.
  */
  // const cma = useCMA();
  const [article, setArticle] = useState<Article[] | undefined>();

  const fetchData = async (search: string) => {
    const response = await fetch(`https://alexisraspberry.duckdns.org/api/articles`)
    const data = await response.json();
    console.log(data)
    setArticle(data.articles.filter((article:Article)=> article.topic.includes(`${search}`)));
  }
  const { apiKey } = sdk.parameters.installation;

  useEffect(() => {
    // @ts-expect-error
    fetchData(sdk.parameters.invocation.articleId)
  }, [sdk.parameters.invocation])

  if (!article) {
    return <Spinner size="large" />
  }
  return (
    <Stack fullWidth>
      <EntityList style={{
        width: '100%'
      }}>
        {
          article.map((item, i) => {
            return (<EntityList.Item
              key={i}
              title={item.title}
              thumbnailUrl={item.article_img_url}
              onClick={() => sdk.close({
                title: item.title,
                article_img_url: item.article_img_url
              })}
            />)
          })
        }
      </EntityList>
    </Stack>
  );
};

export default Dialog;

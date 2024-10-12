import { FieldAppSDK } from "@contentful/app-sdk"

export const fetchData = async (sdk:FieldAppSDK,sysId:string) =>{
   
    const data = await sdk.cma.entry.get({entryId: sysId})
    return data
  }
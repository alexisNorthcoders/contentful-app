import { SidebarAppSDK } from "@contentful/app-sdk";

interface MetadataSidebar {
  sdk: SidebarAppSDK;
}

export const MetadataSidebar = ({sdk}: MetadataSidebar)  => {

   return (
    <div className='h-full flex flex-col gap-2 content-center items-center'>
      <h1 className='font-semibold text-emerald-900 text-xl text-center'>Metadata</h1>
    </div>
  );
}
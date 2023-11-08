import React from 'react';

import getListingsById from '@/app/actions/getListingsById';
import BlogId from '@/components/blog/BlogId';

interface IParams {
  blogId: string;
}

export default async function page({ params }: { params: IParams }) {
  const blog = await getListingsById(params);

  return (
    <div>
      <div>
        <BlogId 
            blogId={blog?.id}
            name={blog?.name}
            description={blog?.description}
            imageSrc={blog?.imageSrc}
        />
      </div>
    </div>
  );
}

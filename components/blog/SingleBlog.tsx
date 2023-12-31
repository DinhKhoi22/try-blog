'use client';

import { SafeBlogs, SafeUser } from '@/types';

import Image from 'next/image';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { BsFillPencilFill } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface BlogProps {
  key: string;
  data: SafeBlogs;
  currentUser?: SafeUser | null;
}

export default function SingleBlog({ key, data, currentUser }: BlogProps) {
  const router = useRouter();

  const onDelete = () => {
    axios
      .delete(`/api/blogs/${data.id}`)
      .then(() => {
        router.refresh();
      })
      .catch((error) => {
        throw new Error(error);
      })
      .finally(() => {
        router.push('/');
      });
  };

  return (
    <div className="w-[1100px] border-2 p-4 bg-gradient-to-r from-red-200 mb-6">
      <div>
        <div className="flex gap-2 justify-between items-center text-white">
          <div className="border-4 border-slate-900">
            <Image src={data.imageSrc} width={400} height={300} alt="Blog Image" />
          </div>

          <div className="w-[530px] flex flex-col gap-4 leading-[1.5]">
            <h1>{data.name}</h1>
            <div>{data.description}</div>
          </div>
        </div>

        {data.userId === currentUser?.id && (
          <div className="flex items-center gap-6 mt-4">
            <RiDeleteBin5Line onClick={onDelete} className="text-red-600 cursor-pointer text-[1.5rem]" />
            <BsFillPencilFill
              onClick={() => router.push(`/blogs/${data.id}`)}
              className=" cursor-pointer text-[1.2rem]"
            />
          </div>
        )}
      </div>
    </div>
  );
}

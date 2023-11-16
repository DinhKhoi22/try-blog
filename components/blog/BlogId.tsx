'use client';

import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import ImageUpload from '../input/ImageUpload';
import Input from '../input/Input';

import { FC } from 'react';

interface BlogIdProps {
  name?: string;
  description?: string;
  imageSrc?: any;
  blogId?: string;
}

interface InitialStateBlogs {
  name: string;
  description: string;
  imageSrc: string;
}

const initialState: InitialStateBlogs = {
  name: '',
  description: '',
  imageSrc: '',
};

const BlogId: FC<BlogIdProps> = ({ name, description, imageSrc, blogId }: BlogIdProps) => {
  const router = useRouter();
  const [state, setState] = useState(initialState);
  const [onActive, setOnActive] = useState(false);

  const setCustomValue = (id: any, value: any) => {
    setState((prevValue) => ({
      ...prevValue,
      [id]: value,
    }));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const onDelete = (event: FormEvent) => {
    event.preventDefault();
    axios
      .delete(`/api/blogs/${blogId}`)
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

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    axios
      .put(`/api/blogs/${blogId}`, state)
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
    <div className="w-[500px] mx-auto py-16 bg-blue-200 px-12 flex flex-col gap-4 mt-24">
      <div className="flex flex-col border-b-2 ">
        <span>{name}</span>
      </div>
      <div>
        <span>{description}</span>
      </div>
      <div>
        <Image src={imageSrc} alt="Blog Image" width={400} height={400} />
      </div>
      <div className="flex justify-center gap-12">
        <button onClick={() => setOnActive(!onActive)} className="uppercase">
          edit
        </button>
        <button className="uppercase" onClick={onDelete}>
          Delete
        </button>
      </div>

      {onActive && (
        <form onSubmit={onSubmit}>
          <div>
            <ImageUpload value={state.imageSrc} onChange={(value) => setCustomValue('imageSrc', value)} />
          </div>
          <div className="flex flex-col justify-center h-[250px] w-[350px] mx-auto gap-2">
            <Input placeholder="Name" id="name" type="text" value={state.name} name="name" onChange={handleChange} />
            <Input
              placeholder="Description"
              id="description"
              type="text"
              value={state.description}
              name="description"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className='w-full p-4'>Submit</button>
        </form>
      )}
    </div>
  );
};

export default BlogId;

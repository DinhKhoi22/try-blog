'use client';

import ImageUpload from '@/components/input/ImageUpload';
import Input from '@/components/input/Input';

import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

interface InitialProps {
  name?: string;
  imageSrc: string;
  description: string;
}

const initialState: InitialProps = {
  name: '',
  imageSrc: '',
  description: '',
};

export default function CreatePage() {
  const [state, setState] = useState(initialState);
  const router = useRouter();

  const setCustomValue = (id: any, value: any) => {
    setState((prevValue) => ({
      ...prevValue,
      [id]: value,
    }));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    axios
      .post('api/blogs', state)
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        throw new Error(error);
      });
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="w-[600px] h-[700px] mx-auto py-24">
      <div>
        <ImageUpload value={state.imageSrc} onChange={(value) => setCustomValue('imageSrc', value)} />
      </div>
      <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
        <Input placeholder="Blog header" id="name" type="text" value={state.name} name="name" onChange={handleChange} />
        <Input
          placeholder="Blog descripition"
          id="description"
          type="text"
          value={state.description}
          name="description"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="text-white mt-4 p-3 border bg-gradient-to-r from-red-400 to-blue-400 hover:from-pink-500 hover:to-yellow-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

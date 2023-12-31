'use client';

import Input from '@/components/input/Input';
import { useRouter } from 'next/navigation';

import React, { FormEvent, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface InitialStateProps {
  name: String;
  email: String;
  password: String;
}

const initialState: InitialStateProps = {
  name: '',
  email: '',
  password: '',
};

const Page = () => {
  const router = useRouter();
  const [state, setState] = useState(initialState);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    axios
      .post('/api/register', state)
      .then(() => {
        router.refresh();
      })
      .then(() => {
        setTimeout(() => {
          router.push('/login');
        }, 2500);
      })
      .catch((err: any) => {});
  };

  const handleChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <form className="text-center mt-12" onSubmit={onSubmit}>
      <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
        <Input placeholder="Name" id="name" type="text" name="name" onChange={handleChange} value={state.name} />
        <Input placeholder="Email" id="email" type="email" name="email" onChange={handleChange} value={state.email} />
        <Input
          placeholder="Password"
          id="password"
          type="password"
          name="password"
          onChange={handleChange}
          value={state.password}
        />
        <button
          type="submit"
          className="text-white mt-4 p-3 border bg-gradient-to-r from-red-400 to-blue-400 hover:from-pink-500 hover:to-yellow-500"
        >
          Submit
        </button>
      </div>

      <div>
        <div className="text-white">
          Do you have an account yet ?{' '}
          <Link href={'/login'}>
            <p className="hover:text-slate-300">Sign in</p>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Page;

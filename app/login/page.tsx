'use client';

import Input from '@/components/input/Input';
import { useRouter } from 'next/navigation';

import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

interface InitialStateProps {
  email: String;
  password: String;
}

const initialState: InitialStateProps = {
  email: '',
  password: '',
};

const Page = () => {
  const router = useRouter();
  const [state, setState] = useState(initialState);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    signIn('credentials', {
      ...state,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        router.refresh();
      }

      if (callback?.error) {
        throw new Error('Wrong Credentials');
      }
    });
    router.push('/');
  };

  const handleChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <form className="text-center" onSubmit={onSubmit}>
      <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
        <Input placeholder="Email" id="email" type="email" name="email" onChange={handleChange} value={state.email} />
        <Input
          placeholder="Password"
          id="password"
          type="password"
          name="password"
          onChange={handleChange}
          value={state.password}
        />
        <button type="submit">Submit</button>
      </div>

      <div>
        <div>
          Haven&apos;t you got an account yet ? <Link href={'/register'}>Register</Link>
        </div>
      </div>
    </form>
  );
};

export default Page;

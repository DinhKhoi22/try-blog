'use client';

import { FC } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

import { SafeUser } from '@/types/index';

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const Navbar: FC<UserMenuProps> = ({ currentUser }) => {
  return (
    <div>
      <nav className="bg-gray-200 flex justify-between px-14 py-6 shadow-xl">
        <Link href={'/'}>{currentUser?.name}</Link>
        <div className="flex gap-x-12">
          <Link href={'/'}>Home</Link>
          <Link href={currentUser ? '/create' : '/register'}>Create</Link>
          {currentUser ? <button onClick={() => signOut()}>Sign Out</button> : <Link href={'/register'}>Register</Link>}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
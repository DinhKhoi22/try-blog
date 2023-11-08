import { User, Listing } from '@prisma/client';

export type SafeBlogs = Omit<Listing, 'createdAt'> & {
  createdAt: string;
};

export type SafeUser = Omit<User, 'createdAt' | 'updatedAt' | 'emailVerified'> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

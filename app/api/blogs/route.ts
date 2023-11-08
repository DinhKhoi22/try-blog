import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  const body = await request.json();
  const { name, description, imageSrc } = body;

  const blog = await prisma.listing.create({
    data: {
      name,
      imageSrc,
      description,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(blog);
}

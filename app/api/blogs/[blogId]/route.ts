import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/lib/prismadb';
import { NextResponse } from 'next/server';

interface IParams {
  blogId: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { blogId } = params;

  if (!blogId || typeof blogId !== 'string') {
    throw new Error('Invalid Id');
  }

  const blog = await prisma.listing.deleteMany({
    where: {
      id: blogId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json({ blog });
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  const blogJson = await request.json();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { blogId } = params;

  if (!blogId || typeof blogId !== 'string') {
    throw new Error('Invalid Id');
  }

  const updatedBlog = await prisma.listing.update({
    where: {
      id: blogId,
    },
    data: blogJson,
  });

  return NextResponse.json({ updatedBlog });
}

import SingleBlog from '@/components/blog/SingleBlog';
import getCurrentUser from './actions/getCurrentUser';
import getListing from './actions/getListing';
import Link from 'next/link';

export default async function Home() {
  const currentUser = await getCurrentUser();
  const blogs = await getListing();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="absolute">
        <div className="text-white mb-10">
          Ảnh chụp database{' '}
          <Link href={'https://drive.google.com/drive/folders/1U-bNpUqJJtfJT5QW2_UuD0KRIrnorPYy?usp=sharing'} target='_blank'>
            <button className="bg-white hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              ở đây
            </button>
          </Link>
        </div>
        {blogs.map((blog: any) => (
          <SingleBlog key={blog._id} data={blog} currentUser={currentUser} />
        ))}
      </div>
    </main>
  );
}

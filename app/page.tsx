import SingleBlog from '@/components/blog/SingleBlog';
import getCurrentUser from './actions/getCurrentUser';
import getListing from './actions/getListing';

export default async function Home() {
  const currentUser = await getCurrentUser();
  const blogs = await getListing();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='absolute'>
        {blogs.map((blog: any) => (
            <SingleBlog 
              key={blog._id}
              data={blog}
              currentUser={currentUser}
            />
        ))}
      </div>
    </main>
  );
}

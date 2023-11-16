import axios from 'axios';
import getCurrentUser from '../actions/getCurrentUser';
import getListing from '../actions/getListing';
import Link from 'next/link';

export default async function Dashboard() {
  const currentUser = await getCurrentUser();
  const blogs = await getListing();

  return (
    <div className="max-w-4xl mx-auto my-44">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">#</div>
              </th>
              <th scope="col" className="px-6 py-3">
                User name
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Created date
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          {/* Start to loop */}
          {blogs.map(
            (blog) =>
              currentUser?.id === blog.userId && (
                <tbody key={blog.id}>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4"></td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      {currentUser?.name}
                    </th>
                    <td className="px-6 py-4">{blog.name}</td>
                    <td className="px-6 py-4">{blog.createdAt.toString().split('T')[0]}</td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/blogs/${blog.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                        Edit
                      </Link>
                    </td>
                  </tr>
                </tbody>
              ),
          )}
        </table>
      </div>
    </div>
  );
}

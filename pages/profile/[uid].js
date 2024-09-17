import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import users from "../data.json";
import { Router, useRouter } from "next/router";

export default function ProfilePage({ params }) {
  console.log(params);
  const router = useRouter();
  const { uid } = router.query;

  const user = users.find((u) => u.id === uid);

  if (!user) {
    return <>nothing</>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
            >
              Back to All Users
            </Link>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={128}
                    height={128}
                    className="rounded-full"
                  />
                  <div className="ml-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {user.name}
                    </h2>
                    <p className="text-gray-600">{user.role}</p>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium text-gray-900">Bio</h3>
                <p className="mt-1 text-gray-600">{user.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

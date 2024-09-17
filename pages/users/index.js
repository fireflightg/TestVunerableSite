import Link from "next/link";
import Image from "next/image";
import users from "../data.json";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">User Profiles</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {users.map((user) => (
                <Link
                  href={`/profile/${user.id}`}
                  key={user.id}
                  className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center">
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={64}
                        height={64}
                        className="rounded-full"
                      />
                      <div className="ml-4">
                        <h2 className="text-xl font-semibold text-gray-900">
                          {user.name}
                        </h2>
                        <p className="text-gray-600">{user.role}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-gray-500 line-clamp-2">
                      {user.bio}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

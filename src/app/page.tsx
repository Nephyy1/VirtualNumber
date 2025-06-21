import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Virtual Number Marketplace</h1>
        <p className="text-lg mb-4">Discover and sell virtual numbers easily.</p>
        <div className="space-x-4">
          <Link href="/login" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition duration-300">
            Log In
          </Link>
          <Link href="/register" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition duration-300">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
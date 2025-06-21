import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 p-4 sm:p-6 lg:p-8">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-lg text-center transform transition-all duration-500 ease-in-out hover:scale-[1.02] hover:shadow-3xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Welcome to <span className="text-primary-600">Nephyy</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
          The seamless marketplace for virtual numbers. Connect, buy, and sell with ease.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/login" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-full shadow-lg text-white bg-primary-600 hover:bg-primary-700 transform hover:-translate-y-1 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            Log In
          </Link>
          <Link href="/register" className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-semibold rounded-full shadow-lg text-gray-800 bg-white hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-secondary-50 to-secondary-100 p-4">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl w-full max-w-lg text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-tight">
          Welcome to <span className="text-primary-600">Nephyy</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
          The seamless marketplace for virtual numbers.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/login" className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
            Log In
          </Link>
          <Link href="/register" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

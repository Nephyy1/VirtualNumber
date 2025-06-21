import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 p-4 sm:p-6 lg:p-8">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md transform transition-transform duration-500 ease-in-out hover:scale-[1.01] hover:shadow-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">
          Sign In
        </h1>

        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-base transition-all duration-200"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-base transition-all duration-200"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-lg text-base font-semibold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
          >
            Log In
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-white text-gray-500 font-medium">
              Or continue with
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <button
            className="w-full flex items-center justify-center py-3 px-6 border border-gray-300 rounded-lg shadow-md text-base font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
          >
            <img src="/google_icon.svg" alt="Google" className="h-6 w-6 mr-3" />
            Sign in with Google
          </button>
          <button
            className="w-full flex items-center justify-center py-3 px-6 border border-gray-300 rounded-lg shadow-md text-base font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
          >
            <img src="/github_icon.svg" alt="GitHub" className="h-6 w-6 mr-3" />
            Sign in with GitHub
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/register" className="font-semibold text-primary-600 hover:text-primary-700 hover:underline transition-colors duration-200">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

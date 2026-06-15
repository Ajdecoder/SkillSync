export default function ResetPassword() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Reset Password
                    </h1>
                    <p className="mt-3 text-sm text-gray-500">
                        Enter your new password below to reset your account password.
                    </p>
                </div>

                <form className="mt-8 space-y-5">
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            New Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            placeholder="Enter new password"
                            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Confirm Password
                        </label>

                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm new password"
                            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    >
                        Reset Password
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <a
                        href="/login"
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                        Back to login
                    </a>
                </div>
            </div>
        </div>
    );
}
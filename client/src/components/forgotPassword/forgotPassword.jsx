import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../services/api";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setFeedback(null);

        try {
            const response = await forgotPassword({ email });
            setFeedback({
                type: "success",
                message: response.data.message,
            });
        } catch (error) {
            setFeedback({
                type: "error",
                message: error.response?.data?.message || "Unable to send a reset link. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Forgot Password?
                    </h1>
                    <p className="mt-3 text-sm text-gray-500">
                        Enter your email address and we’ll send you a link to reset your password.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email address
                        </label>

                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            autoComplete="email"
                            required
                            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    {feedback && (
                        <p
                            role="status"
                            className={feedback.type === "success" ? "text-sm text-green-700" : "text-sm text-red-600"}
                        >
                            {feedback.message}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link
                        to="/login"
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                        Back to login
                    </Link>
                </div>
            </div>
        </div>
    );
}
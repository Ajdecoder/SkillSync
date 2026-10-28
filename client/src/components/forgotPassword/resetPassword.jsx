import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { resetPassword } from "../../services/api";

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token") || "";
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFeedback(null);

        if (!token) {
            setFeedback({ type: "error", message: "This password reset link is invalid or missing its token." });
            return;
        }
        if (password !== confirmPassword) {
            setFeedback({ type: "error", message: "Passwords do not match." });
            return;
        }
        if (!/^[a-zA-Z0-9]{8,30}$/.test(password)) {
            setFeedback({ type: "error", message: "Password must be 8 to 30 letters or numbers." });
            return;
        }

        setLoading(true);
        try {
            const response = await resetPassword({ token, password });
            setFeedback({ type: "success", message: response.data.message });
        } catch (error) {
            setFeedback({
                type: "error",
                message: error.response?.data?.message || "Unable to reset your password. Please try again.",
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
                        Reset Password
                    </h1>
                    <p className="mt-3 text-sm text-gray-500">
                        Enter your new password below to reset your account password.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
                            name="password"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            autoComplete="new-password"
                            minLength={8}
                            maxLength={30}
                            pattern="[a-zA-Z0-9]{8,30}"
                            required
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
                            name="confirmPassword"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            autoComplete="new-password"
                            minLength={8}
                            maxLength={30}
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
                        disabled={loading || !token}
                        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    >
                        {loading ? "Resetting..." : "Reset Password"}
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
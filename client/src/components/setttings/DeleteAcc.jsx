import React from "react";
import { Link } from "react-router-dom";

export const DeleteAcc = () => {
  return (
    <>
      <div>
        <Link
          to="/settings/delete-account"
          className="block text-xl font-semibold text-red-500 hover:underline"
        >
          Delete My Account
        </Link>
        <p className="text-red-500">
          Permanently delete your account. This action cannot be undone.
        </p>
      </div>
    </>
  );
};

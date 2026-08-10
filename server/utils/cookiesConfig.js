const isProduction = process.env.NODE_ENV === "production";

// Core options that MUST match for both setting and clearing
const baseOptions = {
  path: "/",
  domain: undefined, // Leave undefined on localhost
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
};

// Use this ONLY when logging in
export const loginCookieOptions = {
  ...baseOptions,
  httpOnly: isProduction,
  maxAge: 7 * 24 * 60 * 60 * 1000, 
};

// Use this ONLY when logging out
export const logoutCookieOptions = {
  ...baseOptions,
  httpOnly: isProduction, 
};
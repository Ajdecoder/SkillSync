const isProduction = process.env.NODE_ENV === "production";
const cookieDomain = isProduction ? "app-skillsync.vercel.app" : undefined;
export const cookieOptions = {
  httpOnly: isProduction,
  sameSite: isProduction ? "none" : "lax",
  secure: isProduction,
  path: "/",
  domain: cookieDomain,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};
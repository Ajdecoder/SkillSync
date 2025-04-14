import { z } from "zod";

// Signup Schema
const SignupSchema = z
  .object({
    name: z
      .string()
      .min(5, { message: "Name must be at least 5 characters" })
      .max(50, { message: "Name must be at most 50 characters" }),

    email: z
      .string()
      .email({ message: "Please enter a valid email address" }),

    role: z.string().optional(),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(30, { message: "Password must be at most 30 characters" })
      .regex(/^[a-zA-Z0-9]+$/, {
        message: "Password can only contain letters and numbers",
      }),

    reEnterPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(30, { message: "Password must be at most 30 characters" })
      .regex(/^[a-zA-Z0-9]+$/, {
        message: "Password can only contain letters and numbers",
      }),
  })
  .refine((data) => data.password === data.reEnterPassword, {
    path: ["reEnterPassword"],
    message: "Passwords do not match",
  });

// Login Schema with custom error messages
const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(20, { message: "Password must be at most 20 characters" })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Password can only contain letters and numbers",
    }),
});

// Signup Validation Middleware
export const SignupValidation = (req, res, next) => {
  const result = SignupSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "BAD REQUEST",
      errors: result.error.issues,
    });
  }

  next();
};

// Login Validation Middleware
export const LoginValidation = (req, res, next) => {
  const result = LoginSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "BAD REQUEST",
      errors: result.error.issues,
    });
  }

  next();
};

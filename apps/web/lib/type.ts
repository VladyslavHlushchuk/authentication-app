import { z } from "zod";

export type FormState =
  | {
      error?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

  export const SignupFormSchema = z.object({
    name: z
      .string()
      .min(2, {
        message: "Name must be at least 2 characters long.",
      })
      .trim(),
    email: z
      .string()
      .email({ message: "Please enter a valid email." })
      .trim(),
    password: z
      .string()
      .min(8, { message: "Be at least 8 characters long." }) // Мінімум 8 символів
      .regex(/[A-Z]/, {
        message: "Contain at least one uppercase letter.", // Велика літера
      })
      .regex(/[a-z]/, {
        message: "Contain at least one lowercase letter.", // Мала літера
      })
      .regex(/[0-9]/, {
        message: "Contain at least one number.", // Цифра
      })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character.", // Символ
      })
      .trim(),
  });

  export const LoginFormSchema = z.object({
    email: z
      .string()
      .email({ message: "Please enter a valid email." }),
    password: z
      .string()
      .min(1, {
        message: "Password field must not be empty.",
      }),
  });
  
"use server";

import { redirect } from "next/navigation";
import { BACKEND_URL } from "./constants";
import { FormState, LoginFormSchema, SignupFormSchema } from "./type";

export async function signUp(state: FormState, formData: FormData): Promise<FormState> {
  const validationFields = SignupFormSchema.safeParse({
    name: formData.get("name")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  });

  if (!validationFields.success) {
    return { error: validationFields.error.flatten().fieldErrors };
  }

  try {
    const response = await fetch(`${BACKEND_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validationFields.data),
    });

    if (response.ok) {
      redirect("/auth/signin");
    } else {
      return {
        message: response.status === 409 ? "The user already exists!" : response.statusText,
      };
    }
  } catch (error) {
    console.error("Sign-up error:", error);
    return { message: "Unable to connect to the server. Please try again later." };
  }
}

export async function signIn(state: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  try {
    const response = await fetch(`${BACKEND_URL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validatedFields.data),
    });

    if (response.ok) {
      const result = await response.json();
      console.log({ result });
    } else {
      return {
        message: response.status === 401 ? "Invalid credentials!" : response.statusText,
      };
    }
  } catch (error) {
    console.error("Sign-in error:", error);
    return { message: "Unable to connect to the server. Please try again later." };
  }
}

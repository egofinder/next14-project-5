"use server";

import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { FieldValues } from "react-hook-form";

export const login = async (
  values: FieldValues,
  callbackUrl?: string | null
) => {
  const { email, password } = values;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.hashedPassword) {
    return { error: "Email does not exist!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};

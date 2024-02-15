"use server";
import bcrypt from "bcrypt";
import { db } from "@/libs/db";

export const register = async (values: any) => {
  const { email, name, password } = values;
  const solt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, solt);

  await db.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return { success: "Registered!" };
};

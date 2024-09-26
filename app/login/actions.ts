"use server";

import { loginSchema } from "@/lib/schemas-server";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function login(values: z.infer<typeof loginSchema>) {
  try {
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (result?.error) {
      console.log(result.error);
      return { error: result.error };
    } else {
      redirect("/");
    }
  } catch (error) {
    console.log(error);
    return { error: "An unexpected error occurred" };
  }
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginSchema } from "@/lib/schemas";
// import { login } from "./actions"; // Update this import
// import { signIn } from "@/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm(): JSX.Element {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  // const form = useForm<z.infer<typeof loginSchema>>({
  //   resolver: zodResolver(loginSchema),
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //   }
  // });

  // const onSubmit = async (values: z.infer<typeof loginSchema>) => {
  //   const result = await login(values); // Call the login function

  //   if (result?.error) {
  //     setError(result.error); // Set error if login fails
  //   } else {
  //     router.push("/"); // Redirect to dashboard or home page
  //   }
  // };

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email" {...field} />
              </FormControl>
              <FormDescription>
                This is the email you use to login.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Your password" {...field} />
              </FormControl>
              <FormDescription>
                This is the password you use to login.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

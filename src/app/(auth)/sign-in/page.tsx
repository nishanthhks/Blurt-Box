"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

/**
 * Configuration for the form fields.
 */
const formFieldsConfig = [
  {
    name: "identifier" as const, // Use "as const" for stronger type inference
    label: "Email/Username",
    placeholder: "Enter your email or username",
    type: "text",
  },
  {
    name: "password" as const,
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
  },
];

const SignInPage = () => {
  // Initialize hooks for navigation and showing toast notifications.
  const { toast } = useToast();
  const router = useRouter();

  // 1. Setup the form using React Hook Form and Zod for validation.
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  // 2. Define the submit handler.
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    // Use  'signIn' function from NextAuth.js. "Credentials" to specify the provider defined in [...nextauth]/options.ts.
    const result = await signIn("Credentials", {
      ...data,
      redirect: false,
    });

    // 3. Handle the result of the signIn attempt.
    if (result?.error) {
      const errorMessage =
        result.error === "CredentialsSignin"
          ? "Incorrect username or password. Please try again."
          : result.error;

      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }

    if (result?.ok && !result.error) {
      router.replace("/dashboard");
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen py-8">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Welcome back to Blurt Box
          </h1>
          <p className="text-muted-foreground">
            Sign in to continue your anonymous journey
          </p>
        </div>

        <div className="border rounded-lg p-8 bg-card shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Map over the config array to render form fields dynamically */}
              {formFieldsConfig.map((fieldConfig) => (
                <FormField
                  key={fieldConfig.name}
                  name={fieldConfig.name}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{fieldConfig.label}</FormLabel>
                      <FormControl>
                        <Input
                          type={fieldConfig.type}
                          placeholder={fieldConfig.placeholder}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <Button
                className="w-full"
                type="submit"
                disabled={form.formState.isSubmitting} // Disable button while submitting
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Not a member yet?{" "}
              <Link
                href="/sign-up"
                className="font-medium text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;

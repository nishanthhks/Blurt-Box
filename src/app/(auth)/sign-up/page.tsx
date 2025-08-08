"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { signUpSchema } from "@/schemas/signUpSchema";
import { ApiResponse } from "@/types/ApiResponse";
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
 * Configuration for standard form fields
 */
const standardFormFields = [
  {
    name: "email" as const,
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
  },
  {
    name: "password" as const,
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
  },
];

const SignUpPage = () => {
  // State for real-time username validation feedback.
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  // Setup form using React Hook Form and Zod.
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // Debounced effect for checking username uniqueness.
  const watchedUsername = form.watch("username");
  useEffect(() => {
    if (!watchedUsername) {
      setUsernameMessage("");
      return;
    }

    const handler = setTimeout(() => {
      const checkUsernameUnique = async () => {
        setIsCheckingUsername(true);
        setUsernameMessage("");

        try {
          const response = await axios.get<ApiResponse>(
            `/api/check-username-unique?username=${watchedUsername}`
          );
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking username"
          );
        } finally {
          setIsCheckingUsername(false);
        }
      };

      checkUsernameUnique();
    }, 500); // delay 500ms after last keystroke

    return () => clearTimeout(handler); // cleanup on every new keystroke
  }, [watchedUsername]);

  // Form submission handler.
  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    try {
      const response = await axios.post<ApiResponse>("/api/sign-up", data);
      toast({
        title: "Success! ✅",
        description: response.data.message,
      });
      router.replace(`/verify/${data.username}`);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage =
        axiosError.response?.data.message ?? "An unexpected error occurred.";
      toast({
        title: "Sign Up Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen py-8">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Join Blurt Box
          </h1>
          <p className="text-muted-foreground">
            Sign up to start your anonymous adventure
          </p>
        </div>

        <div className="border rounded-lg p-8 bg-card shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Username Field (handled separately due to unique logic) */}
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a username" {...field} />
                    </FormControl>
                    <div className="h-4">
                      {isCheckingUsername ? (
                        <Loader2 className="animate-spin h-4 w-4" />
                      ) : (
                        usernameMessage && (
                          <p
                            className={`text-sm ${
                              usernameMessage === "Username is unique"
                                ? "text-green-500"
                                : "text-red-500"
                            }`}>
                            {usernameMessage}
                          </p>
                        )
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Map over the standard fields to render them dynamically */}
              {standardFormFields.map((fieldConfig) => (
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

              {/* Submit Button */}
              <Button
                className="w-full"
                type="submit"
                disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing
                    Up...
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Already a member?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

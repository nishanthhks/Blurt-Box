"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useCallback, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { messageSchema } from "@/schemas/messageSchema";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useParams } from "next/navigation";
import { Box, Loader2, Send, Sparkle, VenetianMaskIcon } from "lucide-react";
import Link from "next/link";
import ModernAnimatedButtonVariant1 from "@/components/custom/ModernAnimatedButtonVariant1";

function Page() {
  const { toast } = useToast();
  const params = useParams();
  const slug = params.username as string;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
      username: slug,
    },
  });

  const [suggestedMessages, setSuggestedMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMessages = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/suggest-messages");
      setSuggestedMessages(response.data.suggestedMessages);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to fetch suggested messages",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTime;

    if (timeSinceLastSubmit < 3000) {
      const waitTime = 3000 - timeSinceLastSubmit;
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/send-message", {
        content: data.content,
        username: data.username,
      });
      toast({
        title: "Success",
        description: response.data.message,
      });
      form.reset();
      setLastSubmitTime(Date.now());
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: "Error",
          description:
            error.response?.data?.message ||
            "An error occurred, message not sent",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An error occurred, message not sent",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuggestedMessageClick = (message: string) => {
    form.setValue("content", message);
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="container w-full mx-auto p-4 lg:px-[100px] xl:px-[300px]">
        <div className="bg-white rounded-lg p-6 md:p-8 ">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              <VenetianMaskIcon
                size={50}
                className="inline-block mr-2 text-purple-700 "
              />{" "}
              Send an Anonymous Message to {slug}
            </h1>

            <div className="space-y-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4">
                  <FormField
                    name="content"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Write your message here..."
                            className="p-3 md:p-4 text-base md:text-lg"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="md:w-1/3 w-full bg-purple-700 hover:bg-purple-800 text-base md:text-lg py-4 md:py-6">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>

              <div className="bg-gray-100 p-4 md:p-6 rounded-lg">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4 ">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                    Suggested Messages from{" "}
                    <span className="text-purple-700 animate-pulse">
                      ✨ AI ✨
                    </span>
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchMessages}
                    disabled={isLoading}
                    className="bg-black text-white hover:bg-black/80 hover:text-white">
                    <Sparkle />
                    {isLoading ? "Generating..." : "Refresh"}
                  </Button>
                </div>

                <div className="space-y-2">
                  {suggestedMessages.map((message, index) => (
                    <div
                      key={index}
                      className="bg-white p-3 md:p-4 rounded-md hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleSuggestedMessageClick(message)}>
                      <p className="text-sm md:text-base text-gray-700">
                        {message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4 justify-center items-center">
                <Link href="/" className="flex items-center ">
                  <Box className="w-8 h-8" />
                  <div className="flex text-2xl sm:text-3xl text-gray-500">
                    <span className="text-purple-700 font-bold">Blurt</span>{" "}
                    <span className="font-bold">Box</span>
                  </div>
                </Link>
                <ModernAnimatedButtonVariant1
                  text="Get Your Link Now"
                  buttonText="Click"
                  buttonLink={"./"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

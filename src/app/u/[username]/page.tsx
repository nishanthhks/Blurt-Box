"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
import { useParams } from "next/navigation"; // ✅ Use Next.js navigation hook

function Page() {
  const { toast } = useToast();
  const params = useParams(); // ✅ Get params properly
  const slug = params.username as string; // ✅ Extract safely

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
      username: slug,
    },
  });

  const [suggestedMessages, setSuggestedMessages] = useState<string[]>([]);

  const fetchMessages = useCallback(async () => {
    try {
      const response = await axios.post("/api/suggest-message");
      setSuggestedMessages(response.data.suggestedMessages);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to fetch suggested messages",
        variant: "destructive",
      });
    }
  }, [toast]); // Include toast as a dependency

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleRefresh = () => {
    fetchMessages();
  };

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    try {
      console.log(data);
      const response = await axios.post("/api/send-message", {
        content: data.content,
        username: data.username,
      });
      toast({
        title: "Success",
        description: response.data.message,
      });
      form.reset();
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
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6">
                <FormField
                  name="content"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Enter your message" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Card className="p-4 flex flex-col gap-2">
              {suggestedMessages.map((message, index) => (
                <CardContent
                  key={index}
                  className="border rounded-md p-0 px-8 py-2">
                  <p>{message}</p>
                </CardContent>
              ))}
            </Card>
            <Button className="w-[200px]" onClick={handleRefresh}>
              Refresh
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;

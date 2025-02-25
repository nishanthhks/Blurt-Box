"use client";

import MessageCard from "@/components/MessageCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Message } from "@/models/User";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import * as z from "zod";
import {
  Loader2,
  RefreshCcw,
  Link as LinkIcon,
  Globe,
  LogOut,
  AlertTriangle,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Copy, User } from "lucide-react";
import { updateUsernameSchema } from "@/schemas/updateUsernameSchema";
import NewNavbar from "@/components/NewNavbar";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useDebounceCallback } from "usehooks-ts";
import { signInSchema } from "@/schemas/signInSchema";

function Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [showProfileSection, setShowProfileSection] = useState(false);
  const [isUpdatingUsername, setIsUpdatingUsername] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [updatedUsername, setUpdatedUsername] = useState("");

  const { toast } = useToast();

  const handleDeleteMessage = (messageId: string) => {
    const newMessages = messages.filter((message) => message._id !== messageId);
    setMessages(newMessages);
  };

  const { data: session, update } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const updateUsernameForm = useForm<z.infer<typeof updateUsernameSchema>>({
    resolver: zodResolver(updateUsernameSchema),
    defaultValues: {
      updatedUsername: "",
      password: "",
    },
  });

  const { register, watch, setValue } = form;

  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setValue("acceptMessages", response.data.isAcceptingMessage ?? false);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ??
          "Failed to fetch message settings",
        variant: "destructive",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue, toast]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(true);
      try {
        const response = await axios.get<ApiResponse>("/api/get-messages");
        setMessages(response.data.messages || []);
        if (refresh) {
          toast({
            title: "Messages Refreshed",
            description: "Showing latest messages",
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
          title: "Failed to fetch messages",
          description:
            axiosError.response?.data.message || "Failed to fetch messages",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setIsLoading, setMessages, toast]
  );

  useEffect(() => {
    if (!session || !session.user) return;
    fetchMessages();
    fetchAcceptMessage();
  }, [session, setValue, fetchAcceptMessage, fetchMessages]);

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessages", !acceptMessages);
      toast({
        title: response.data.message,
        variant: "default",
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Failed to update settings",
        description:
          axiosError.response?.data.message ||
          "Failed to update message settings",
        variant: "destructive",
      });
    }
  };

  const username = session?.user?.username;
  const baseUrl =
    typeof window !== "undefined" ? `${window.location.origin}` : "";
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: "URL Copied",
      description: "Profile URL has been copied to clipboard",
    });
  };
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debounced = useDebounceCallback(setUpdatedUsername, 300);

  useEffect(() => {
    if (!updatedUsername) return;
    const checkUsernameUnique = async () => {
      setIsCheckingUsername(true);
      setUsernameMessage("");
      try {
        const response = await axios.get<ApiResponse>(
          `/api/check-username-unique?username=${updatedUsername}`
        );
        setUsernameMessage(response.data.message);
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        setUsernameMessage(
          axiosError.response?.data.message || "An error occurred"
        );
      } finally {
        setIsCheckingUsername(false);
      }
    };
    checkUsernameUnique();
  }, [updatedUsername]);

  const onUpdateUsername = async (
    data: z.infer<typeof updateUsernameSchema>
  ) => {
    try {
      const response = await axios.put("/api/update-profile", data);
      console.log(response);
      // Refresh the session after a successful update
      signOut();
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Failed to update username",
        description:
          axiosError.response?.data.message || "Failed to update username",
      });
    }
  };

  const [backgrounds, setBackgrounds] = useState<{ [key: string]: string }>({});

  const handleBackgroundChange = (messageId: string, newBackground: string) => {
    setBackgrounds((prev) => ({ ...prev, [messageId]: newBackground }));
  };

  if (!session || !session.user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <NewNavbar />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Please Login</h2>
            <p className="mt-2 text-gray-600">
              You need to be logged in to view your dashboard
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg  p-6 md:p-8 ">
          <div className="flex items-center gap-4 mb-8   xl:px-[100px]">
            <Globe className="h-8 w-8 text-purple-700" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Dashboard
            </h1>
          </div>

          <div className="space-y-4 xl:px-[100px]">
            {/* link section */}
            <div
              className="bg-gray-100 p-6 rounded-lg transition-colors duration-300 "
              id="profile-section">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <LinkIcon className="h-5 w-5" />
                Your Profile Link
              </h2>
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center justify-center">
                <div className="flex-1 relative max-w-xl">
                  <input
                    type="text"
                    value={profileUrl}
                    readOnly
                    className="w-full p-3  rounded border bg-white focus:outline-none focus:ring-2 focus:ring-purple-700"
                  />
                  <Button
                    onClick={() => {
                      copyToClipboard();
                      const section =
                        document.getElementById("profile-section");
                      section?.classList.add("bg-green-50");
                      setTimeout(() => {
                        section?.classList.remove("bg-green-50");
                      }, 1000);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-700 hover:bg-purple-800"
                    size="sm">
                    <Copy className="h-4 w-4" />
                    <span className="hidden sm:block">Copy</span>
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="py-4  bg-black text-white hover:bg-black/80 items-center gap-2 hover:text-white"
                  onClick={() => setShowProfileSection(!showProfileSection)}>
                  <User strokeWidth={2} className="h-10 w-10 " />
                  {showProfileSection ? "Hide Profile" : "View Profile"}
                </Button>
              </div>
            </div>

            {/* Profile Section with Animation */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                showProfileSection
                  ? "max-h-[2000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}>
              <div className="flex flex-col md:flex-row gap-2 md:gap-4 ">
                {/* Profile Information */}
                <div className="bg-gray-100 p-6 rounded-lg md:flex-1">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Information
                  </h2>
                  <div className="space-y-4 ">
                    <div className="flex items-center gap-3 bg-white p-4 rounded-md">
                      <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-purple-700" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Username</p>
                        <p className="font-semibold text-lg">
                          {session?.user?.username}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-black text-white hover:bg-black/80 hover:text-white"
                        onClick={() =>
                          setIsUpdatingUsername(!isUpdatingUsername)
                        }>
                        {isUpdatingUsername ? "Cancel" : "Edit"}
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className=" py-4 text-white bg-red-500 flex items-center justify-center gap-2 hover:text-white hover:bg-red-600"
                      onClick={() => signOut()}>
                      <LogOut />
                      Logout
                    </Button>

                    <div className="bg-white p-4 rounded-md">
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-semibold">{session?.user?.email}</p>
                    </div>

                    {isUpdatingUsername && (
                      <Form {...updateUsernameForm}>
                        <form
                          onSubmit={updateUsernameForm.handleSubmit(
                            onUpdateUsername
                          )}
                          className="space-y-6">
                          <FormField
                            name="updatedUsername"
                            control={updateUsernameForm.control}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Update Username</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter new username"
                                    {...field}
                                    onChange={(e) => {
                                      field.onChange(e);
                                      debounced(e.target.value);
                                    }}
                                  />
                                </FormControl>
                                {isCheckingUsername && (
                                  <Loader2 className="animate-spin" />
                                )}
                                {!isCheckingUsername && usernameMessage && (
                                  <p
                                    className={`text-sm ${
                                      usernameMessage === "Username is unique"
                                        ? "text-green-500"
                                        : "text-red-500"
                                    }`}>
                                    {usernameMessage}
                                  </p>
                                )}
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            name="password"
                            control={updateUsernameForm.control}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                  <Input
                                    type="password"
                                    placeholder="Enter your password"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button
                            className="w-full"
                            type="submit"
                            disabled={isSubmitting}>
                            {isSubmitting ? (
                              <Loader2 className="animate-spin" />
                            ) : (
                              "Sign Up"
                            )}
                          </Button>
                        </form>
                      </Form>
                    )}
                  </div>
                </div>

                {/* Delete Account Section */}
                <div className="bg-gray-100 p-6 rounded-lg md:flex-1">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-red-600">
                    <AlertTriangle className="h-5 w-5" />
                    Danger Zone
                  </h2>
                  <div className="bg-white p-4 rounded-md border border-red-200">
                    <h3 className="font-medium text-gray-900">
                      Delete Account
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 mb-3">
                      Once you delete your account, there is no going back.
                      Please be certain.
                    </p>
                    {!showDeleteConfirm ? (
                      <Button
                        variant="destructive"
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => setShowDeleteConfirm(true)}>
                        Delete Account
                      </Button>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                          Please type{" "}
                          <span className="font-bold">
                            {session?.user?.username}
                          </span>{" "}
                          to confirm.
                        </p>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          value={deleteConfirmText}
                          onChange={(e) => setDeleteConfirmText(e.target.value)}
                        />
                        <div className="flex gap-2">
                          <Button
                            variant="destructive"
                            disabled={
                              deleteConfirmText !== session?.user?.username
                            }
                            onClick={async () => {
                              try {
                                await axios.delete("/api/delete-profile");
                                signOut();
                              } catch (error) {
                                const axiosError =
                                  error as AxiosError<ApiResponse>;
                                toast({
                                  title: "Error",
                                  description:
                                    axiosError.response?.data.message ||
                                    "Failed to delete account",
                                  variant: "destructive",
                                });
                              }
                            }}>
                            Confirm Delete
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setShowDeleteConfirm(false);
                              setDeleteConfirmText("");
                            }}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* dashboard buttons */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <Switch
                    {...register("acceptMessages")}
                    checked={acceptMessages}
                    onCheckedChange={handleSwitchChange}
                    disabled={isSwitchLoading}
                    className="bg-black"
                  />
                  <span className="font-medium">
                    Accept Messages: {acceptMessages ? "On" : "Off"}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-black hover:bg-black/80"
                  onClick={(e) => {
                    e.preventDefault();
                    fetchMessages(true);
                  }}>
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCcw className="w-full h-full text-white" />
                  )}
                  <span className="hidden sm:block text-white">Refresh</span>
                </Button>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
              {messages.length > 0 ? (
                messages.map((message) => (
                  <MessageCard
                    key={message._id as string}
                    message={message}
                    onMessageDelete={handleDeleteMessage}
                    backgroundImage={
                      backgrounds[message._id as string] || "/message_card.jpeg"
                    }
                    onBackgroundChange={handleBackgroundChange}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  No messages to display.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

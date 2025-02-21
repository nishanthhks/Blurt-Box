"use client";
import React, { useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { X, Share2, Download, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";
import { Message } from "@/models/User";
import html2canvas from "html2canvas";

interface MessageCardProps {
  message: Message;
  onMessageDelete: (messageId: string) => void;
  backgroundImage: string;
}

const MessageCard: React.FC<MessageCardProps> = ({
  message,
  onMessageDelete,
  backgroundImage,
}) => {
  const { toast } = useToast();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tempBackground, setTempBackground] = useState<string>(backgroundImage);

  const handleDeleteConfirm = async () => {
    const response = await axios.delete<ApiResponse>(
      `/api/delete-message/${message._id}`
    );
    toast({
      title: response.data.message,
    });
    onMessageDelete(message._id as string);
  };

  const handleShare = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        useCORS: true,
        scale: 2,
      });
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "message.png", { type: "image/png" });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            navigator.share({ files: [file], title: "Check this out!" });
          } else {
            toast({ title: "Sharing not supported on this browser." });
          }
        }
      });
    }
  };

  const handleDownload = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        useCORS: true,
        scale: 2,
      });
      const link = document.createElement("a");
      link.download = "message.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setTempBackground(e.target.result as string);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-sm flex flex-col items-center space-y-4">
      {/* Message with background */}
      <div
        ref={cardRef}
        className="relative w-full aspect-square rounded-lg shadow-lg overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${tempBackground})`,
            backgroundSize: "100% 100%",
          }}></div>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <p className="text-white text-lg font-semibold text-center px-4">
            {message.content}
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="w-full flex justify-between px-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <X className="w-5 h-5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button variant="outline" onClick={handleShare}>
          <Share2 className="w-5 h-5" />
        </Button>
        <Button variant="outline" onClick={handleDownload}>
          <Download className="w-5 h-5" />
        </Button>
        <Button variant="outline" onClick={handleDownload}>
          {/* Upload Button */}
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
            id="upload-bg"
          />
          <label
            htmlFor="upload-bg"
            className="cursor-pointer  text-blue-500 ">
            <Upload className="inline w-5 h-5" /> Upload Background
          </label>
          
        </Button>
      </div>

      {/* Created At */}
      <p className="text-sm text-gray-500">
        {message.createdAt.toLocaleString()}
      </p>
    </div>
  );
};

export default MessageCard;

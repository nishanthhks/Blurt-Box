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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="w-full max-w-[250px] flex flex-col items-center space-y-2">
      {/* Message with background */}
      <div
        ref={cardRef}
        className="relative w-full aspect-square rounded-lg shadow-md overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${tempBackground})`,
            backgroundSize: "100% 100%",
          }}></div>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <p className="text-white text-sm font-medium text-center px-3">
            {message.content}
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="w-full flex justify-between px-1">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon" className="h-8 w-8">
              <X className="w-3 h-3" />
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
        <Button variant="outline" size="icon" className="h-8 w-8 bg-purple-50 hover:bg-purple-100 border-purple-200" onClick={handleShare}>
          <Share2 className="w-3 h-3 text-purple-700" />
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8 bg-purple-50 hover:bg-purple-100 border-purple-200" onClick={handleDownload}>
          <Download className="w-3 h-3 text-purple-700" />
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8 bg-purple-50 hover:bg-purple-100 border-purple-200">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
            id="upload-bg"
          />
          <label
            htmlFor="upload-bg"
            className="cursor-pointer flex items-center">
            <Upload className="w-3 h-3 text-purple-700" />
          </label>
        </Button>
      </div>

      {/* Created At */}
      <p className="text-xs text-gray-500">
        {formatDate(new Date(message.createdAt))}
      </p>
    </div>
  );
};

export default MessageCard;

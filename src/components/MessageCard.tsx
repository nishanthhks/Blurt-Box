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
        scale: window.devicePixelRatio || 2, // Capture at high resolution
        width: cardRef.current.scrollWidth,  // Capture full width
        height: cardRef.current.scrollHeight, // Capture full height
        x: 0, 
        y: 0,
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
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Card className="w-full max-w-[300px] bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Message with background */}
      <div ref={cardRef} className="relative w-full aspect-square">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 hover:scale-105"
          style={{
            backgroundImage: `url(${tempBackground})`,
            backgroundSize: "cover",
          }}></div>
        <div className="absolute inset-0 bg-gradient-to-b to-black/40 flex items-center justify-center p-6">
          <div className="bg-white/80 flex items-center justify-center h-full w-full rounded-full p-4">
            <p className="text-black text-lg font-bold text-center leading-relaxed">
              {message.content}
            </p>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Action buttons */}
        <div className="flex justify-between items-center mb-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="icon"
                className="h-9 w-9 rounded-full shadow-md hover:shadow-lg transition-all">
                <X className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white rounded-lg">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-full">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteConfirm}
                  className="rounded-full bg-red-500 hover:bg-red-600">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-xl bg-white hover:bg-gray-50 border-gray-100 shadow-sm hover:shadow transition-all duration-200 group"
              onClick={handleShare}>
              <Share2 className="w-4 h-4 text-gray-600 group-hover:text-gray-800 transition-colors" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-xl bg-white hover:bg-gray-50 border-gray-100 shadow-sm hover:shadow transition-all duration-200 group"
              onClick={handleDownload}>
              <Download className="w-4 h-4 text-gray-600 group-hover:text-gray-800 transition-colors" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-xl bg-white hover:bg-gray-50 border-gray-100 shadow-sm hover:shadow transition-all duration-200 group">
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
                id="upload-bg"
              />
              <label
                htmlFor="upload-bg"
                className="cursor-pointer flex items-center justify-center w-full h-full">
                <Upload className="w-4 h-4 text-gray-600 group-hover:text-gray-800 transition-colors" />
              </label>
            </Button>
          </div>
        </div>

        {/* Created At */}
        <p className="text-sm text-gray-500 text-center font-medium">
          {formatDate(new Date(message.createdAt))}
        </p>
      </CardContent>
    </Card>
  );
};

export default MessageCard;

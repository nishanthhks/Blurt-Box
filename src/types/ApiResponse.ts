import { Message } from "@/models/User";
export interface ApiResponse {
  success: boolean;
  message: string;
  isAcceptingMessage?: boolean;
  messages?: Array<Message>;
}

export interface SuggestedMessagesResponse {
  success: boolean;
  message: string;
  suggestedMessages: Array<Message>;
}

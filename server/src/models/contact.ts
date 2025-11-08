export interface ContactMessage {
  message_id: string; 
  name: string;
  email: string;
  message: string;
  status: "Read" | "Unread"; 
  submitted_at: string; 
}

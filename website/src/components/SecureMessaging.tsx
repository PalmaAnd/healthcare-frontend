import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: number;
  sender: string;
  recipient: string;
  content: string;
  timestamp: string;
}

const initialMessages: Message[] = [
  { id: 1, sender: "Dr. Smith", recipient: "John Doe", content: "Hello John, how are you feeling today?", timestamp: "2023-06-10 09:30" },
  { id: 2, sender: "John Doe", recipient: "Dr. Smith", content: "Hi Dr. Smith, I'm feeling much better. The new medication seems to be working well.", timestamp: "2023-06-10 10:15" },
];

export function SecureMessaging() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && selectedRecipient) {
      const message: Message = {
        id: messages.length + 1,
        sender: "John Doe", // In a real app, this would be the logged-in user
        recipient: selectedRecipient,
        content: newMessage.trim(),
        timestamp: new Date().toLocaleString(),
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Secure Messaging</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-96 overflow-y-auto border rounded-md p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "John Doe" ? "justify-end" : "justify-start"}`}>
                <div className={`flex items-start space-x-2 ${message.sender === "John Doe" ? "flex-row-reverse" : ""}`}>
                  <Avatar>
                    <AvatarFallback>{message.sender[0]}</AvatarFallback>
                  </Avatar>
                  <div className={`rounded-lg p-3 ${message.sender === "John Doe" ? "bg-blue-100" : "bg-gray-100"}`}>
                    <p className="font-semibold">{message.sender}</p>
                    <p>{message.content}</p>
                    <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Select value={selectedRecipient} onValueChange={setSelectedRecipient} required>
                <SelectTrigger id="recipient">
                  <SelectValue placeholder="Choose a recipient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dr. Smith">Dr. Smith</SelectItem>
                  <SelectItem value="Dr. Johnson">Dr. Johnson</SelectItem>
                  <SelectItem value="Dr. Williams">Dr. Williams</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message here..."
                required
              />
            </div>
            <Button type="submit">Send Message</Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}


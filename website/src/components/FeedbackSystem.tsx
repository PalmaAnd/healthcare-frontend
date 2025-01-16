import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star } from 'lucide-react';

export function FeedbackSystem() {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    alert("Feedback submitted successfully!");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Provide Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="doctor">Select Doctor</Label>
            <Select required>
              <SelectTrigger id="doctor">
                <SelectValue placeholder="Choose a doctor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                <SelectItem value="dr-johnson">Dr. Johnson</SelectItem>
                <SelectItem value="dr-williams">Dr. Williams</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 cursor-pointer ${
                    (hoverRating || rating) >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="feedback">Your Feedback</Label>
            <Textarea id="feedback" placeholder="Please share your experience..." required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Your Name (Optional)</Label>
            <Input id="name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Your Email (Optional)</Label>
            <Input id="email" type="email" />
          </div>
          <Button type="submit">Submit Feedback</Button>
        </form>
      </CardContent>
    </Card>
  );
}


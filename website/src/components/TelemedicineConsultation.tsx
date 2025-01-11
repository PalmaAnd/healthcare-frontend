import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";

export function TelemedicineConsultation() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);

    const availableTimes = [
        "09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        alert("Consultation request submitted successfully!");
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Request Telemedicine Consultation</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" required />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="reason">Reason for Consultation</Label>
                        <Select required>
                            <SelectTrigger id="reason">
                                <SelectValue placeholder="Select a reason" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="general">General Check-up</SelectItem>
                                <SelectItem value="followup">Follow-up Appointment</SelectItem>
                                <SelectItem value="prescription">Prescription Renewal</SelectItem>
                                <SelectItem value="specialist">Specialist Consultation</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Preferred Date</Label>
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            className="rounded-md border"
                            disabled={(date) => date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 1))}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Preferred Time</Label>
                        <Select value={selectedTime} onValueChange={setSelectedTime}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a time" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableTimes.map((time) => (
                                    <SelectItem key={time} value={time}>{time}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="symptoms">Describe Your Symptoms</Label>
                        <Textarea id="symptoms" required />
                    </div>
                    <Button type="submit">Request Consultation</Button>
                </form>
            </CardContent>
        </Card>
    );
}


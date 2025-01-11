import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
];

export function AppointmentCalendar() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [selectedTime, setSelectedTime] = useState<string | undefined>();

    const handleDateSelect = (newDate: Date | undefined) => {
        setDate(newDate);
        setSelectedTime(undefined);
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
    };

    const handleSchedule = () => {
        if (date && selectedTime) {
            alert(`Appointment scheduled for ${date.toDateString()} at ${selectedTime}`);
            // Here you would typically send this data to your backend
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Schedule an Appointment</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        className="rounded-md border"
                    />
                </div>
                <div className="flex-1 space-y-4">
                    <h3 className="font-semibold">Available Time Slots</h3>
                    {date && (
                        <div className="grid grid-cols-2 gap-2">
                            {timeSlots.map((time) => (
                                <Button
                                    key={time}
                                    variant={selectedTime === time ? "default" : "outline"}
                                    onClick={() => handleTimeSelect(time)}
                                >
                                    {time}
                                </Button>
                            ))}
                        </div>
                    )}
                    {date && selectedTime && (
                        <Button onClick={handleSchedule} className="w-full">
                            Schedule Appointment
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
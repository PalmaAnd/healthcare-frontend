// src/components/DashboardContent.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Users, CalendarIcon, FileText, MessageSquare } from 'lucide-react';

// Fake data for demonstration
const stats = {
    totalPatients: 1234,
    appointmentsToday: 8,
    pendingReports: 5,
    unreadMessages: 12
};

const todaysAppointments = [
    { time: '09:00 AM', patientName: 'John Doe', type: 'Check-up' },
    { time: '10:30 AM', patientName: 'Jane Smith', type: 'Follow-up' },
    { time: '11:45 AM', patientName: 'Mike Johnson', type: 'Consultation' },
    { time: '02:00 PM', patientName: 'Emily Brown', type: 'Check-up' },
    { time: '03:30 PM', patientName: 'David Wilson', type: 'Follow-up' },
    { time: '04:45 PM', patientName: 'Sarah Davis', type: 'Consultation' },
];

export function DashboardContent() {
    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">Welcome, Dr. Smith</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalPatients}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Appointments Today</CardTitle>
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.appointmentsToday}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.pendingReports}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.unreadMessages}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Today's Appointments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {todaysAppointments.map((appointment, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                    <div>
                                        <p className="font-semibold">{appointment.patientName}</p>
                                        <p className="text-sm text-gray-500">{appointment.time}</p>
                                    </div>
                                    <Badge>{appointment.type}</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Calendar</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Calendar
                            mode="single"
                            selected={new Date()}
                            className="rounded-md border"
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Pill, Calendar } from 'lucide-react';

interface HealthRecord {
    id: number;
    date: string;
    type: string;
    details: string;
    doctor: string;
}

interface Medication {
    id: number;
    name: string;
    dosage: string;
    frequency: string;
    startDate: string;
    endDate: string;
}

interface Appointment {
    id: number;
    date: string;
    time: string;
    doctor: string;
    type: string;
}

const healthRecords: HealthRecord[] = [
    { id: 1, date: "2023-06-01", type: "Blood Test", details: "Cholesterol levels: Normal", doctor: "Dr. Smith" },
    { id: 2, date: "2023-05-15", type: "X-Ray", details: "Chest X-ray: Clear", doctor: "Dr. Johnson" },
    { id: 3, date: "2023-04-22", type: "Physical Exam", details: "Annual check-up: All clear", doctor: "Dr. Brown" },
];

const medications: Medication[] = [
    { id: 1, name: "Lisinopril", dosage: "10mg", frequency: "Once daily", startDate: "2023-01-01", endDate: "2023-12-31" },
    { id: 2, name: "Metformin", dosage: "500mg", frequency: "Twice daily", startDate: "2023-03-15", endDate: "2023-09-15" },
];

const appointments: Appointment[] = [
    { id: 1, date: "2023-06-15", time: "10:00 AM", doctor: "Dr. Smith", type: "Follow-up" },
    { id: 2, date: "2023-07-01", time: "02:30 PM", doctor: "Dr. Johnson", type: "Consultation" },
];

export function PatientPortal() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Patient Portal</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="health-records">
                    <TabsList>
                        <TabsTrigger value="health-records">
                            <FileText className="mr-2 h-4 w-4" />
                            Health Records
                        </TabsTrigger>
                        <TabsTrigger value="medications">
                            <Pill className="mr-2 h-4 w-4" />
                            Medications
                        </TabsTrigger>
                        <TabsTrigger value="appointments">
                            <Calendar className="mr-2 h-4 w-4" />
                            Appointments
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="health-records">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Details</TableHead>
                                    <TableHead>Doctor</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {healthRecords.map((record) => (
                                    <TableRow key={record.id}>
                                        <TableCell>{record.date}</TableCell>
                                        <TableCell>{record.type}</TableCell>
                                        <TableCell>{record.details}</TableCell>
                                        <TableCell>{record.doctor}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabsContent>
                    <TabsContent value="medications">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Dosage</TableHead>
                                    <TableHead>Frequency</TableHead>
                                    <TableHead>Start Date</TableHead>
                                    <TableHead>End Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {medications.map((medication) => (
                                    <TableRow key={medication.id}>
                                        <TableCell>{medication.name}</TableCell>
                                        <TableCell>{medication.dosage}</TableCell>
                                        <TableCell>{medication.frequency}</TableCell>
                                        <TableCell>{medication.startDate}</TableCell>
                                        <TableCell>{medication.endDate}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabsContent>
                    <TabsContent value="appointments">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Time</TableHead>
                                    <TableHead>Doctor</TableHead>
                                    <TableHead>Type</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {appointments.map((appointment) => (
                                    <TableRow key={appointment.id}>
                                        <TableCell>{appointment.date}</TableCell>
                                        <TableCell>{appointment.time}</TableCell>
                                        <TableCell>{appointment.doctor}</TableCell>
                                        <TableCell>{appointment.type}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}


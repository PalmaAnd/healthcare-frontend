import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Eye, Edit, Trash2, Search, UserPlus } from 'lucide-react';

interface Patient {
    id: number;
    name: string;
    dateOfBirth: string;
    gender: string;
    contactNumber: string;
    lastVisit: string;
}

const initialPatients: Patient[] = [
    { id: 1, name: "John Doe", dateOfBirth: "1980-05-15", gender: "Male", contactNumber: "123-456-7890", lastVisit: "2023-06-01" },
    { id: 2, name: "Jane Smith", dateOfBirth: "1992-09-22", gender: "Female", contactNumber: "987-654-3210", lastVisit: "2023-05-28" },
    { id: 3, name: "Mike Johnson", dateOfBirth: "1975-12-10", gender: "Male", contactNumber: "456-789-0123", lastVisit: "2023-06-05" },
    { id: 4, name: "Emily Brown", dateOfBirth: "1988-03-30", gender: "Female", contactNumber: "789-012-3456", lastVisit: "2023-06-02" },
    { id: 5, name: "David Wilson", dateOfBirth: "1970-07-18", gender: "Male", contactNumber: "234-567-8901", lastVisit: "2023-05-30" },
];

export function PatientsRecord() {
    const [patients, setPatients] = useState<Patient[]>(initialPatients);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.contactNumber.includes(searchTerm)
    );

    const handleDelete = (id: number) => {
        setPatients(patients.filter(patient => patient.id !== id));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Patients Record</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between mb-4">
                    <div className="relative w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search patients..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                    <Button>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add New Patient
                    </Button>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Date of Birth</TableHead>
                            <TableHead>Gender</TableHead>
                            <TableHead>Contact Number</TableHead>
                            <TableHead>Last Visit</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPatients.map((patient) => (
                            <TableRow key={patient.id}>
                                <TableCell>{patient.name}</TableCell>
                                <TableCell>{patient.dateOfBirth}</TableCell>
                                <TableCell>{patient.gender}</TableCell>
                                <TableCell>{patient.contactNumber}</TableCell>
                                <TableCell>{patient.lastVisit}</TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="icon" onClick={() => setSelectedPatient(patient)}>
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Patient Details</DialogTitle>
                                                </DialogHeader>
                                                {selectedPatient && (
                                                    <div className="grid gap-4">
                                                        <div className="grid grid-cols-3 items-center gap-4">
                                                            <Label>Name</Label>
                                                            <span className="col-span-2">{selectedPatient.name}</span>
                                                        </div>
                                                        <div className="grid grid-cols-3 items-center gap-4">
                                                            <Label>Date of Birth</Label>
                                                            <span className="col-span-2">{selectedPatient.dateOfBirth}</span>
                                                        </div>
                                                        <div className="grid grid-cols-3 items-center gap-4">
                                                            <Label>Gender</Label>
                                                            <span className="col-span-2">{selectedPatient.gender}</span>
                                                        </div>
                                                        <div className="grid grid-cols-3 items-center gap-4">
                                                            <Label>Contact Number</Label>
                                                            <span className="col-span-2">{selectedPatient.contactNumber}</span>
                                                        </div>
                                                        <div className="grid grid-cols-3 items-center gap-4">
                                                            <Label>Last Visit</Label>
                                                            <span className="col-span-2">{selectedPatient.lastVisit}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </DialogContent>
                                        </Dialog>
                                        <Button variant="outline" size="icon">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="icon" onClick={() => handleDelete(patient.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}


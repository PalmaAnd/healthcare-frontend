import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

interface Prescription {
    id: number;
    patientName: string;
    medication: string;
    dosage: string;
    frequency: string;
    startDate: string;
    endDate: string;
}

interface PrescriptionManagerProps {
    initialPrescriptions: Prescription[];
}

export function PrescriptionManager({ initialPrescriptions }: PrescriptionManagerProps) {
    const [prescriptions, setPrescriptions] = useState<Prescription[]>(initialPrescriptions);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [newPrescription, setNewPrescription] = useState<Partial<Prescription>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewPrescription(prev => ({ ...prev, [name]: value }));
    };

    const handleAddPrescription = () => {
        if (editingId !== null) {
            setPrescriptions(prev => prev.map(p => p.id === editingId ? { ...p, ...newPrescription } : p));
            setEditingId(null);
        } else {
            setPrescriptions(prev => [...prev, { id: Date.now(), ...newPrescription } as Prescription]);
        }
        setNewPrescription({});
    };

    const handleEdit = (prescription: Prescription) => {
        setEditingId(prescription.id);
        setNewPrescription(prescription);
    };

    const handleDelete = (id: number) => {
        setPrescriptions(prev => prev.filter(p => p.id !== id));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Manage Prescriptions</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    <div>
                        <Label htmlFor="patientName">Patient Name</Label>
                        <Input id="patientName" name="patientName" value={newPrescription.patientName || ''} onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label htmlFor="medication">Medication</Label>
                        <Input id="medication" name="medication" value={newPrescription.medication || ''} onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label htmlFor="dosage">Dosage</Label>
                        <Input id="dosage" name="dosage" value={newPrescription.dosage || ''} onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label htmlFor="frequency">Frequency</Label>
                        <Input id="frequency" name="frequency" value={newPrescription.frequency || ''} onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input id="startDate" name="startDate" type="date" value={newPrescription.startDate || ''} onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label htmlFor="endDate">End Date</Label>
                        <Input id="endDate" name="endDate" type="date" value={newPrescription.endDate || ''} onChange={handleInputChange} />
                    </div>
                </div>
                <Button onClick={handleAddPrescription}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    {editingId !== null ? 'Update Prescription' : 'Add Prescription'}
                </Button>
                <Table className="mt-6">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Patient Name</TableHead>
                            <TableHead>Medication</TableHead>
                            <TableHead>Dosage</TableHead>
                            <TableHead>Frequency</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>End Date</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {prescriptions.map((prescription) => (
                            <TableRow key={prescription.id}>
                                <TableCell>{prescription.patientName}</TableCell>
                                <TableCell>{prescription.medication}</TableCell>
                                <TableCell>{prescription.dosage}</TableCell>
                                <TableCell>{prescription.frequency}</TableCell>
                                <TableCell>{prescription.startDate}</TableCell>
                                <TableCell>{prescription.endDate}</TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="sm" onClick={() => handleEdit(prescription)}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => handleDelete(prescription.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
export interface Appointment {
    id: string;
    doctorId: string;
    date: string;
    time: string;
    status: "upcoming" | "completed" | "cancelled";
    type: string;
}

export interface Doctor {
    id: string;
    name: string;
    specialization: string;
    imageUrl: string;
    rating: number;
    availableSlots?: string[];
}

export interface MedicalFile {
    id: string;
    name: string;
    type: string;
    date: string;
    size: string;
    url: string;
}

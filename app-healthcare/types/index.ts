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

export interface Patient {
    username: string;
    phone_number: Int16Array;
    birthday: Date;
    gender: string;
    svnr: Int16Array;
    allergies?: string[];
    current_medication?: string[];
    medical_conditions?: string[];
}

export interface Case {
    case_number: Int16Array;
     title: string;
     description: string;
     current_medication?: string[];
     urgency: string;
     status: string;
     created_at: Date;
     updated_at: Date;
}
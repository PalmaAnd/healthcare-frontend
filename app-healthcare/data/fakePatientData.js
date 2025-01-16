const fakePatientData = {
    username: "John Doe",
    phone_number: 1234567890, // Example Austrian phone number
    birthday: "1990-05-15T00:00:00.000Z", // ISO format date
    gender: "Male",
    svnr: 123456789, // Austrian social insurance number
    allergies: ["Peanuts", "Dust mites", "Penicillin"],
    current_medication: [
        "Ibuprofen 200mg",
        "Metformin 500mg",
        "Vitamin D 1000 IU",
    ],
    medical_conditions: [
        "Type 2 Diabetes",
        "Hypertension",
        "Seasonal Allergies",
    ],
};

const noAllergiesPatient = {
    username: "Jane Smith",
    phone_number: 9876543210,
    birthday: "1985-03-20T00:00:00.000Z",
    gender: "Female",
    svnr: 987654321,
    allergies: [],
    current_medication: ["Lisinopril 10mg"],
    medical_conditions: ["Asthma"],
  };
  

export { fakePatientData, noAllergiesPatient };
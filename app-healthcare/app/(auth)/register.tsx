import { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Alert,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { z } from 'zod';
import DateTimePicker from '@react-native-community/datetimepicker';

// Validation schema
const userSchema = z
    .object({
        username: z.string().min(3, 'Username must be at least 3 characters'),
        email: z.string().email('Invalid email address'),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .regex(/[0-9]/, 'Password must contain at least one number'),
        confirmPassword: z.string(),
        dateOfBirth: z.string().nonempty('Date of Birth is required'),
        phone: z.string().regex(/^[0-9]+$/, 'Phone must contain only numbers').optional(),
        gender: z.string().optional(),
        allergies: z.string().optional(),
        medications: z.string().optional(),
        medicalConditions: z.string().optional(),
        previousSurgeries: z.string().optional(),
        consentToTreatment: z.boolean().refine((val) => val, {
            message: 'Consent to treatment is required',
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

export default function RegisterScreen() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: new Date(),
        phone: '',
        gender: '',
        allergies: '',
        medications: '',
        medicalConditions: '',
        previousSurgeries: '',
        consentToTreatment: false,
    });
    const [errors, setErrors] = useState({});
    const [showDatePicker, setShowDatePicker] = useState(false);

    const validateForm = () => {
        try {
            userSchema.parse({ ...formData, dateOfBirth: formData.dateOfBirth.toISOString() });
            return true;
        } catch (error) {
            const formattedErrors = {};
            (error as z.ZodError).errors.forEach((err) => {
                formattedErrors[err.path[0]] = err.message;
            });
            setErrors(formattedErrors);
            return false;
        }
    };

    const handleRegister = async () => {
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        try {
            // Simulate successful registration
            setTimeout(() => {
                setIsLoading(false);
                Alert.alert('Success', 'Registration completed successfully!');
                router.replace('/(app)');
            }, 1000);
        } catch (error) {
            console.error('Registration error:', error);
            Alert.alert('Error', 'Failed to register. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const getInputStyle = (field: string) => [
        styles.input,
        errors[field] && styles.inputError,
    ];

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            <View style={styles.content}>
                <Text style={styles.title}>Create Account</Text>

                <TextInput
                    style={getInputStyle('username')}
                    placeholder="Username"
                    value={formData.username}
                    onChangeText={(text) => {
                        setFormData({ ...formData, username: text });
                        setErrors({ ...errors, username: null });
                    }}
                />
                {errors.username && (
                    <Text style={styles.errorText}>{errors.username}</Text>
                )}

                <TextInput
                    style={getInputStyle('email')}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={formData.email}
                    onChangeText={(text) => {
                        setFormData({ ...formData, email: text });
                        setErrors({ ...errors, email: null });
                    }}
                />
                {errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                )}

                <TextInput
                    style={getInputStyle('password')}
                    placeholder="Password"
                    secureTextEntry
                    value={formData.password}
                    onChangeText={(text) => {
                        setFormData({ ...formData, password: text });
                        setErrors({ ...errors, password: null });
                    }}
                />
                {errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                )}

                <TextInput
                    style={getInputStyle('confirmPassword')}
                    placeholder="Confirm Password"
                    secureTextEntry
                    value={formData.confirmPassword}
                    onChangeText={(text) => {
                        setFormData({ ...formData, confirmPassword: text });
                        setErrors({ ...errors, confirmPassword: null });
                    }}
                />
                {errors.confirmPassword && (
                    <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}

                <TouchableOpacity
                    style={styles.datePickerButton}
                    onPress={() => setShowDatePicker(true)}
                >
                    <Text style={styles.datePickerText}>{formData.dateOfBirth.toDateString()}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={formData.dateOfBirth}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            setShowDatePicker(false);
                            if (selectedDate) {
                                setFormData({ ...formData, dateOfBirth: selectedDate });
                                setErrors({ ...errors, dateOfBirth: null });
                            }
                        }}
                    />
                )}
                {errors.dateOfBirth && (
                    <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
                )}

                <TextInput
                    style={getInputStyle('phone')}
                    placeholder="Phone Number"
                    keyboardType="phone-pad"
                    value={formData.phone}
                    onChangeText={(text) => {
                        setFormData({ ...formData, phone: text });
                        setErrors({ ...errors, phone: null });
                    }}
                />

                <TextInput
                    style={getInputStyle('allergies')}
                    placeholder="Allergies"
                    multiline
                    value={formData.allergies}
                    onChangeText={(text) => setFormData({ ...formData, allergies: text })}
                />

                <TextInput
                    style={getInputStyle('medications')}
                    placeholder="Current Medications"
                    multiline
                    value={formData.medications}
                    onChangeText={(text) => setFormData({ ...formData, medications: text })}
                />

                <TextInput
                    style={getInputStyle('medicalConditions')}
                    placeholder="Medical Conditions"
                    multiline
                    value={formData.medicalConditions}
                    onChangeText={(text) => setFormData({ ...formData, medicalConditions: text })}
                />

                <TextInput
                    style={getInputStyle('previousSurgeries')}
                    placeholder="Previous Surgeries"
                    multiline
                    value={formData.previousSurgeries}
                    onChangeText={(text) => setFormData({ ...formData, previousSurgeries: text })}
                />

                <View style={styles.checkboxContainer}>
                    <TouchableOpacity
                        style={[
                            styles.checkbox,
                            formData.consentToTreatment && styles.checkboxChecked,
                        ]}
                        onPress={() =>
                            setFormData({
                                ...formData,
                                consentToTreatment: !formData.consentToTreatment,
                            })
                        }>
                        {formData.consentToTreatment && <View style={styles.checkboxInner} />}
                    </TouchableOpacity>
                    <Text style={styles.checkboxLabel}>
                        I consent to the medical procedure and understand the associated risks and benefits.
                    </Text>
                </View>

                <TouchableOpacity
                    style={[styles.button, isLoading && styles.buttonDisabled]}
                    onPress={handleRegister}
                    disabled={isLoading}>
                    {isLoading ? (
                        <ActivityIndicator color="#ffffff" />
                    ) : (
                        <Text style={styles.buttonText}>Register</Text>
                    )}
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Already have an account? Tap Login below
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    content: {
        padding: 20,
    },
    title: {
        color: '#25292e',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 48,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 4,
        marginBottom: 8,
        paddingHorizontal: 12,
        fontSize: 16,
    },
    inputError: {
        borderColor: '#ef4444',
    },
    errorText: {
        color: '#ef4444',
        fontSize: 12,
        marginBottom: 8,
        alignSelf: 'flex-start',
    },
    button: {
        backgroundColor: '#50B498',
        paddingVertical: 12,
        borderRadius: 4,
        marginVertical: 8,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    datePickerButton: {
        width: '100%',
        height: 48,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    datePickerText: {
        fontSize: 16,
        color: '#718096',
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
    },
    checkbox: {
        height: 20,
        width: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginRight: 8,
    },
    checkboxChecked: {
        backgroundColor: '#50B498',
    },
    checkboxInner: {
        height: 10,
        width: 10,
        backgroundColor: '#fff',
    },
    checkboxLabel: {
        fontSize: 16,
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        alignItems: 'center',
    },
    footerText: {
        textAlign: 'center',
        color: '#718096',
        fontSize: 14,
    },
});

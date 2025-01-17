import { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Alert,
    ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { z } from 'zod';

// Validation schema
const userSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});

export default function RegisterScreen() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        try {
            userSchema.parse(formData);
            return true;
        } catch (error) {
            const formattedErrors: { [key: string]: string } = {};
            (error as z.ZodError).errors.forEach(err => {
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
            // Check if user already exists
            const existingUsers = await AsyncStorage.getItem('users');
            const users = existingUsers ? JSON.parse(existingUsers) : [];

            if (users.some((user: { email: string; }) => user.email === formData.email)) {
                Alert.alert('Error', 'An account with this email already exists');
                setIsLoading(false);
                return;
            }

            // Add new user
            const newUser = {
                id: Date.now().toString(),
                username: formData.username,
                email: formData.email,
                password: formData.password, // In a real app, you should hash the password
                createdAt: new Date().toISOString(),
            };

            users.push(newUser);
            await AsyncStorage.setItem('users', JSON.stringify(users));

            // Set current user token
            await AsyncStorage.setItem('userToken', newUser.id);
            await AsyncStorage.setItem('currentUser', JSON.stringify(newUser));

            // Success! Navigate to app
            router.replace('/(app)');
        } catch (error) {
            console.error('Registration error:', error);
            Alert.alert('Error', 'Failed to register. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const getInputStyle = (field: string) => [
        styles.input,
        errors[field] && styles.inputError
    ];

    return (
        <View style={styles.container}>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        paddingHorizontal: 32,
        borderRadius: 4,
        marginVertical: 8,
        width: '100%',
        alignItems: 'center',
        height: 48,
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
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
    },
    footerText: {
        textAlign: 'center',
        color: '#718096',
        fontSize: 14,
    },
});
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, ActivityIndicator, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../auth/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showImage, setShowImage] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const loginClient = async () => {
    // Check email for "@" symbol
    if (!email.includes('@')) {
      Alert.alert('Invalid Input', 'Please enter a valid email address.');
      return;
    }

    // Check for filled email/password
    if (!email || !password) {
      Alert.alert('Invalid Input', 'Please fill in both email and password fields.');
      return;
    }

    try {
      await login(email, password);
      // If login is successful, navigation will be handled by AuthContext
    } catch (error) {
      Alert.alert('Login Failed', 'Please check your credentials and try again.');
    }
  };

  const handleClick = () => {
    setClickCount(prevCount => {
      const newCount = prevCount + 1;
      if (newCount >= 7) {
        setShowImage(true);
      }
      return newCount;
    });
  };

  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.9;

  if (isLoading) {
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.inputStyle}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        maxLength={15}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={loginClient}
      >
        <Text style={styles.buttonTextStyle}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.linkContainer}>
        No{' '}
        <Text
          onPress={(e) => {
            e.preventDefault(); // Prevent navigation
            handleClick(); // Increment click count
          }}
          style={styles.text}
        >
          User?
        </Text>{' '}
        Then{' '}
        <Link href="./register" style={styles.text}>
          Register!
        </Link>
      </Text>

      {showImage && (
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/no-user.png')} // Adjust path to your asset
            style={{ width: imageWidth, height: undefined, aspectRatio: 1 }} // Maintain aspect ratio
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: 35,
    backgroundColor: '#fff',
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: 'center',
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  buttonStyle: {
    backgroundColor: '#50B498',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#50B498',
    height: 40,
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  text: {
    color: '#000',
    fontSize: 16,
  },
  linkContainer: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  preloader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

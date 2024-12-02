import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Link } from 'expo-router';

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      showImage: false,
      clickCount: 0,
    };
  }

  loginClient = () => {
    const { email, password } = this.state;

    // Check email for  "@" symbol
    if (!email.includes('@')) {
      Alert.alert('Invalid Input', 'Please enter a valid email address.');
      return;
    }

    // Check for filled email/password
    if (!email || !password) {
      Alert.alert('Invalid Input', 'Please fill in both email and password fields.');
      return;
    }

    // Login logic
    console.log('Email:', email);
    console.log('Password:', password);
    Alert.alert('Success', 'Login successful!');
  };


  handleClick = () => {
      this.setState((prevState) => {
        const newCount = prevState.clickCount + 1;
        return {
          clickCount: newCount,
          showImage: newCount >= 7, //show after 7 clicks
        };
      });
    };
  updateInputVal = (val, prop) => {
    this.setState({
      [prop]: val,
    });
  };


  render() {
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.9;

    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }

    return (
      <ScrollView style={styles.container}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />
        <Button
          color="#50B498"
          title="Login"
          onPress={() => this.loginClient()}
        />
        <Text style={styles.linkContainer}>
          No{' '}
          <Link
            href="#"
            onPress={(e) => {
              e.preventDefault(); // Prevent navigation
              this.handleClick(); // Increment click count
            }}
            style={styles.text}
          >
            User?
          </Link>{' '}
          Then{' '}
          <Link href="/register" style={styles.text}>
            Register!
          </Link>
        </Text>

        {this.state.showImage && (
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
  text: {
    color: '#000', // Same color as the surrounding text
    fontSize: 16, // Same size as the surrounding text
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
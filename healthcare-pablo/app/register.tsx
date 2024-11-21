import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      displayName: '',
      email: '',
      password: '',
      dateOfBirth: new Date(),
      showDatePicker: false,
      phone: '',
      gender: '',
      allergies: '',
      medications: '',
      medicalConditions: '',
      previousSurgeries: '',
      consentToTreatment: false,
      isLoading: false
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  showDatepicker = () => {
    this.setState({ showDatePicker: true });
  }

  registerUser = () => {
    if (this.state.email === '' || this.state.password === '' || this.state.displayName === '') {
      Alert.alert('Enter details to signup!')
    } else {
      this.setState({
        isLoading: true,
      })
      // Here you would typically send the data to your API
      console.log(this.state);
      setTimeout(() => {
        this.setState({ isLoading: false });
        Alert.alert('Registration Successful', 'Thank you for your registration.');
      }, 2000);
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>User Registration</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Full Name"
          value={this.state.displayName}
          onChangeText={(val) => this.updateInputVal(val, 'displayName')}
        />
        <TouchableOpacity style={styles.inputStyle} onPress={this.showDatepicker}>
          <Text>{this.state.dateOfBirth.toDateString()}</Text>
        </TouchableOpacity>
        {this.state.showDatePicker && (
          <DateTimePicker
            value={this.state.dateOfBirth}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              this.setState({ showDatePicker: false, dateOfBirth: selectedDate || this.state.dateOfBirth });
            }}
          />
        )}
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
        <TextInput
          style={styles.inputStyle}
          placeholder="Phone Number"
          value={this.state.phone}
          onChangeText={(val) => this.updateInputVal(val, 'phone')}
          keyboardType="phone-pad"
        />
        <Picker
          selectedValue={this.state.gender}
          onValueChange={(itemValue) => this.updateInputVal(itemValue, 'gender')}
          style={styles.pickerStyle}
        >
          <Picker.Item label="Select gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other" />
        </Picker>
        <TextInput
          style={styles.inputStyle}
          placeholder="Allergies"
          value={this.state.allergies}
          onChangeText={(val) => this.updateInputVal(val, 'allergies')}
          multiline
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Current Medications"
          value={this.state.medications}
          onChangeText={(val) => this.updateInputVal(val, 'medications')}
          multiline
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Medical Conditions"
          value={this.state.medicalConditions}
          onChangeText={(val) => this.updateInputVal(val, 'medicalConditions')}
          multiline
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Previous Surgeries"
          value={this.state.previousSurgeries}
          onChangeText={(val) => this.updateInputVal(val, 'previousSurgeries')}
          multiline
        />
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={{
              height: 20,
              width: 20,
              borderWidth: 1,
              borderColor: '#ccc',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: this.state.consentToTreatment ? '#3740FE' : '#fff',
            }}
            onPress={() => this.updateInputVal(!this.state.consentToTreatment, 'consentToTreatment')}
          >
            {this.state.consentToTreatment && (
              <View
                style={{
                  height: 10,
                  width: 10,
                  backgroundColor: '#fff',
                }}
              />
            )}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>
            I consent to the medical procedure and understand the associated risks and benefits.
          </Text>
        </View>
        <Button
          color="#3740FE"
          title="Signup"
          onPress={() => this.registerUser()}
        />
        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Login')}>
          Already Registered? Click here to login
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: 35,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  pickerStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  checkboxLabel: {
    margin: 8,
    fontSize: 16,
  },
});

import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default class Signup extends Component {


  constructor() {
    super();
    this.state = { 
      displayName: '',
      Number :'',
      email: '', 
      password: '',
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  registerUser = async () => {
    if(this.state.email === '' || this.state.password === '') {
      Alert.alert('Enter details to signup!')
    } else {
      
      await auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        // res.user.updateProfile({
        //   displayName: this.state.displayName,
        //   Number : this.state.Number
        // })
       
        const uid = auth().currentUser.uid
        firestore().collection("users")
        .add({    
          id : uid ,
          email : this.state.email,
          name : this.state.displayName ,
          number : this.state.Number
        }).then(() => {
          console.log("user added!");
        }).catch(error=>{
          console.log(error.message)
        })
        if(res.user.sendEmailVerification()){
          Alert.alert("Verification Link is sent to your Registered Mail Id.")
        }
        Alert.alert('User registered successfully!')
        // this.setState({
        //   displayName: '',
        //   Number: '',
        //   email: '', 
        //   password: ''
        // })
        this.props.navigation.navigate('Login')
      })
      .catch(error => 
        {
        
        console.log(error.message);
        this.setState({ errorMessage: error.message })
        })     
    }
  }


  render() {
    
    return (
      <View style={styles.container}>  
        <TextInput
          style={styles.inputStyle}
          placeholder="Full Name"
          value={this.state.displayName}
          onChangeText={(val) => this.updateInputVal(val, 'displayName')}
        />      
        <TextInput
          style={styles.inputStyle}
          placeholder="Phone Number"
          value={this.state.Number}
          keyboardType="numeric"
          onChangeText={(val) => this.updateInputVal(val, 'Number')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          keyboardType='email-address'
          autoCapitalize='none'
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        <TextInput
         style={styles.inputStyle}
         placeholder="Password"
         value={this.state.password}
         autoCapitalize='none'
         onChangeText={(val) => this.updateInputVal(val, 'password')}
         maxLength={15}
         secureTextEntry={true}
        /> 
        <Button
          color="#2e8099"
          title="Signup"
          onPress={() => this.registerUser()}
        />

        <Text 
          style={styles.loginText}
          onPress={() =>  this.props.navigation.navigate('Login')}>
          Already Registered? Click here to login
        </Text>                          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#2e8099',
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
  }
});
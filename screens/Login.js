import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

export default class Login extends Component {
  constructor() {
    super();
    this.state = { 
      email: '', 
      password: '',
    }
  }

   async componentDidMount(){
    const data =  await AsyncStorage.getItem("loggedIn");
    if(data){
      const getData = JSON.parse(data);
      console.log("getdata",getData);
      if(getData.email!=undefined && getData.password!=undefined){
        this.props.navigation.navigate('Dashboard')
      }else{
        this.props.navigation.navigate('Login')
      }
    }else{
      console.log("no data exists");
      this.props.navigation.navigate('Login')
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  userLogin = async () => {
    console.log("login details",this.state.email,this.state.password)
    
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signin!')
    } else {
     
       await auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
    
      .then((res) => {
        if(res.user.emailVerified){
          console.log(res)
          console.log('User logged-in successfully!')
          var obj= {
            id : auth().currentUser.uid,
            email : this.state.email,
            password : this.state.password,
          }
          Alert.alert('User logged-in successfully!')
          this.setState({
            email: '', 
            password: ''
          })
          
          AsyncStorage.setItem("loggedIn",JSON.stringify(obj));
          console.log("asyncstorage",obj)
          this.props.navigation.navigate('Dashboard')
        }else{
          Alert.alert("Email is Not Verified.")
        }
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
          placeholder="Email"
          keyboardType='email-address'
          autoCapitalize='none'
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          autoCapitalize='none'
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />   
        <Button
          color="#2e8099"
          title="Login"
          onPress={() => this.userLogin()}
        />   

        <Text 
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Signup')}>
          Don't have account? Click here to signup
        </Text> 
        <Text 
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('ForgetPassword')}>
          Forget Password
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
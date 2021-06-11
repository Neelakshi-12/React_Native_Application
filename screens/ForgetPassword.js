import React, { Component } from 'react';
import {View,StyleSheet,Text,TouchableOpacity,TextInput,ActivityIndicator, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

class ForgotPassword extends Component{
    state={
        email:'',
        showLoading:false
    }
    reset=async()=>{
        try {
            await auth().sendPasswordResetEmail(this.state.email);
            Alert.alert("Password reset link is sent!!")
            this.setState({showLoading:false})
            this.props.navigation.navigate("Login");
        } catch (e) {
            console.log(e.message)
            if(e.message=="[auth/invalid-email] The email address is badly formatted."){
            Alert.alert("Invalid email address")
            }
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <TextInput style = {styles.input}
               value={this.state.email}
               placeholder="Email"
               keyboardType='email-address'
               autoCapitalize='none'
               onChangeText = {text=>this.setState({email:text})}/>
                <TouchableOpacity style = {styles.submitButton}
            onPress={()=>{
                if(this.state.email==''){
                    Alert.alert("Email address required!!")
                }
                else{
                    this.setState({showLoading:true})
                    this.reset()
                }
            }}>
                <Text style = {styles.submitButtonText}>Send Reset Link</Text>
                </TouchableOpacity>
               
               {this.showLoading &&
                <View style={styles.activity}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
    }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 30,
        backgroundColor: '#fff'
      },
    input: {
        width: '100%',
        marginBottom: 15,
        paddingBottom: 15,
        alignSelf: "center",
        borderColor: "#ccc",
        borderBottomWidth: 1
     },
     submitButton: {
        backgroundColor: '#2e8099',
        padding: 10,
        borderRadius:10,
        margin: 15,
        height: 45,
        justifyContent:"center",
        alignItems: 'center'
        
     },
     submitButtonText:{
        color: 'white',
        
        
     },
     activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
export default ForgotPassword;
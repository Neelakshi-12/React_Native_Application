import React, { Component } from 'react';
import {ImageBackground, StyleSheet, View, Text, Button, AsyncStorage } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = { 
      uid: '',
      displayName : '',
      email : '',
    }
  }


  componentDidMount(){
    console.log("component did mount")
    firestore()
    .collection('users')
    .get()
    .then(querySnapshot => {
      console.log("component did mount2")
        querySnapshot.forEach(documentSnapshot => {
          console.log("id",documentSnapshot.data().id)
            if(documentSnapshot.data().id==auth().currentUser.uid){
                AsyncStorage.setItem('Userid' + auth().currentUser.uid,documentSnapshot.id)
                console.log("component did mount",documentSnapshot.data().name,documentSnapshot.data().email)
           this.setState({
              displayName : documentSnapshot.data().name, 
              email : documentSnapshot.data().email,
           })
            }
      
      });
    });
  
  }

  signOut = () => {
   auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  }  

  //https://images.pexels.com/photos/1261731/pexels-photo-1261731.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940
  render() {
    const image = { uri: "https://images.pexels.com/photos/1261731/pexels-photo-1261731.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" };

    return (
        
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
       <View style={styles.text}>
       <Text style = {styles.textStyle}>
          Hello!! {this.state.displayName} ...👋
          </Text>
          <Text style = {styles.textEmail}>
         Contact Here 🤗 {this.state.email}
          </Text>
       
          <View style = {styles.CreateProfile}>
        <Button
          color="#2e8099"
          title="View Profile"
          onPress={() => this.props.navigation.navigate('UserScreen')}
        />
        </View>
      
      <View style = {styles.CreateProfile}>
        <Button
          color="#2e8099"
          title="View Todos"
          onPress={() => this.props.navigation.navigate('Todo')}
        />
        
      </View>

      <View style = {styles.CreateProfile}>
          <Button
          color="#2e8099"
          title="Logout"
          onPress={() => this.signOut()}
        />
      
      </View>     
       </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection : 'column'
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20,
    marginTop : 30,
    fontWeight : "bold",
    color : 'white'
  },
  textEmail :{
    fontSize: 15,
    marginBottom: 20,
    color : "#cdcdcd",
    fontWeight : "bold",
  },
  CreateProfile :{
    marginVertical:10,
    minWidth : 100
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  text: {
    color: "white",
    padding : 25,
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0"
  }
});
import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, AsyncStorage } from 'react-native';
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
  getData = () => {
    firestore()
    .collection('users')
    .get()
    .then(querySnapshot => {
     
        querySnapshot.forEach(documentSnapshot => {
            if(documentSnapshot.data().id==auth().currentUser.uid){
                AsyncStorage.setItem('Userid' + auth().currentUser.uid,documentSnapshot.id)
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

  render() {
      this.getData();
    return (
        
      <View style={styles.container}>
          <View style = {styles.CreateProfile}>
        <Button
          color="#2e8099"
          title="Create Profile"
          onPress={() => this.props.navigation.navigate('CreateProfile')}
        />
        </View>
          <Button
          color="#2e8099"
          title="Logout"
          onPress={() => this.signOut()}
        />
        <Text style = {styles.textStyle}>
          Hello!! {this.state.displayName} ...👋
          </Text>
          <Text style = {styles.textEmail}>
         Contact Here 📞 {this.state.email}
          </Text>
       
      
      
        <Button
          color="#2e8099"
          title="View Todos"
          onPress={() => this.props.navigation.navigate('Todo')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff'
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20,
    marginTop : 30,
    fontWeight : "bold",
  },
  textEmail :{
    fontSize: 15,
    marginBottom: 20,
    color : "red",
    fontWeight : "bold",
  },
  CreateProfile :{
    marginVertical:10
  }
  
});
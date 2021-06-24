import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View,Button } from 'react-native';
import { ListItem } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore';

class UserScreen extends Component {
    
  constructor() {
    super();
    this.firestoreRef = firestore().collection('Profile');
    this.state = {
      userArr: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const { name, fname , mname , email, mobile, dob, address} = res.data();
      userArr.push({
        key: res.id,
        res,
        name,
        fname ,
        mname ,
        email,
        mobile,
        dob,
        address,
      });
    });
    this.setState({
      
      userArr,
   });
  }

  render() {
  
    return (
      <ScrollView style={styles.container}>
         <Button
          color="#2e8099"
          title="Create Profile"
          onPress={() => this.props.navigation.navigate('CreateProfile')}
        />
          {
            this.state.userArr.map((item, i) => {
              console.log("name", item.name);
              console.log("email",item.email);
              return (
                // <ListItem
                //   key={i}
                //   chevron
                //   bottomDivider
                //   title={item.name}
                //   subtitle={item.email}
                //   style={styles.listView}
                  // onPress={() => {
                  //   this.props.navigation.navigate('UserInfo', {
                  //     userkey: item.key
                  //   });
                //   }}/>
                <ListItem bottomDivider key={i}  onPress = {() => {this.props.navigation.navigate('UserInfo', {userkey: item.key })}} >
                <ListItem.Content>
                  <ListItem.Title style={styles.listView1}>👧 Name : {item.name}</ListItem.Title>
                  <ListItem.Subtitle style={styles.listView2}>✔    Email : {item.email}</ListItem.Subtitle>
                  <ListItem.Subtitle style={styles.listView2}>📞   Phone Number : {item.mobile}</ListItem.Subtitle>
                </ListItem.Content>
                </ListItem>
              );
            })
          }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  listView1 : {
    color : 'grey',
    fontSize : 18,
    fontWeight : "bold"
  },
  listView2 : {
    color : '#2e8099'
  }
})

export default UserScreen;
import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';

class UserInfo extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      fname : '',
      mname : '',
      email: '',
      mobile: '',
      dob: '',
      address:'',
    };
  }
 
  componentDidMount() {
    const dbRef = firestore().collection('Profile').doc(this.props.route.params.userkey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
      fname :user.fname,
      mname :user.mname,
      dob :user.dob,
      address :user.address,
        });
      } else {
        console.log("Document does not exist!");
      }
    });
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  updateUser() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firestore().collection('Profile').doc(this.state.key);
    updateDBRef.set({
      name: this.state.name,
      fname :this.state.fname,
      mname :this.state.mname,
      dob :this.state.dob,
      address :this.state.address,
      email: this.state.email,
      mobile: this.state.mobile,
    }).then((docRef) => {
      this.setState({
        key: '',
        name: '',
          fname : '',
          mname : '',
          email: '',
          mobile: '',
          dob: '',
          address:'',
      });
      this.props.navigation.navigate('UserScreen');
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
  }

  deleteUser() {
    const dbRef = firestore().collection('Profile').doc(this.props.route.params.userkey)
      dbRef.delete().then((res) => {
          console.log('Item removed from database')
          this.props.navigation.navigate('UserScreen');
      })
  }

  openTwoButtonAlert=()=>{
    Alert.alert(
      'Delete User',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => this.deleteUser()},
        {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
  }

  render() {
   
    return (
      <ScrollView style={styles.container}>

{/* <View style={styles.inputGroup}>
<TextInput
    placeholder={'Name'}
    value={this.state.name}
    onChangeText={(val) => this.inputValueUpdate(val, 'name')}
/>
</View>
<View style={styles.inputGroup}>
<TextInput
    multiline={true}
    numberOfLines={4}
    placeholder={'Email'}
    value={this.state.email}
    onChangeText={(val) => this.inputValueUpdate(val, 'email')}
/>
</View>
<View style={styles.inputGroup}>
<TextInput
    placeholder={'Mobile'}
    value={this.state.mobile}
    onChangeText={(val) => this.inputValueUpdate(val, 'mobile')}
/>
</View> */}

         <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Name'}
              value={this.state.name}
              onChangeText={(val) => this.inputValueUpdate(val, 'name')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={"Father's Name"}
              value={this.state.fname}
              onChangeText={(val) => this.inputValueUpdate(val, 'fname')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={"Mother's Name"}
              value={this.state.mname}
              onChangeText={(val) => this.inputValueUpdate(val, 'mname')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              
              placeholder={'Email'}
              value={this.state.email}
              onChangeText={(val) => this.inputValueUpdate(val, 'email')}
          />
        </View>
       
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Mobile'}
              value={this.state.mobile}
              onChangeText={(val) => this.inputValueUpdate(val, 'mobile')}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Date Of Birth'}
              value={this.state.dob}
              onChangeText={(val) => this.inputValueUpdate(val, 'dob')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Address'}
              multiline={true}
              numberOfLines={4}
              value={this.state.address}
              onChangeText={(val) => this.inputValueUpdate(val, 'address')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Update 📝'
            onPress={() => this.updateUser()} 
            color="#2e8099"
          />
          </View>
         <View>
          <Button
            title='Delete ❌'
            onPress={this.openTwoButtonAlert}
            color="#2e8099"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
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
  button: {
    marginBottom: 7, 
  }
})

export default UserInfo;
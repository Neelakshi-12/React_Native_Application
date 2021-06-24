import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Alert,TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';

class CreateProfile extends Component {

  constructor() {
    super();
    this.dbRef = firestore().collection('Profile');
    this.state = {
      name: '',
      fname : '',
      mname : '',
      email: '',
      mobile: '',
      dob: '',
      address:'',
      image:'',
      uri:null,
      submit_image:false,
      url:""
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  selectImage = () => {                                //change image
    const options = {
      noData: true
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        const source = { uri: response.uri }
        console.log(source)
        this.setState({
          image: source
        })
        this.setState({uri:this.state.image.uri})
        this.setState({submit_image:true})
      }
    })
  }

  storeUser() {
    if(this.state.name === ''){
     alert('Fill at least your name!')
    } else {
            
      this.dbRef.add({
        name: this.state.name,
        fname :this.state.fname,
        mname :this.state.mname,
        dob :this.state.dob,
        address :this.state.address,
        email: this.state.email,
        mobile: this.state.mobile,

      }).then((res) => {
        this.setState({
          name: '',
          fname : '',
          mname : '',
          email: '',
          mobile: '',
          dob: '',
          address:'',
        });
        console.log("User Added!!");
        Alert.alert("User Added Successfully!!");
        this.props.navigation.navigate('UserScreen')
      })
      .catch((err) => {
        console.error("Error found: ", err);
      
      });
    }
  }



  render() {
  
    return (
      <ScrollView style={styles.container}>
           <TouchableOpacity onPress={()=>{this.selectImage()}} style={{alignSelf:'center'}}>
                        {this.state.uri?
                (<Image 
            source={{uri:this.state.uri}}
            style={{ marginTop:20,width:120,borderRadius:80, height:120}}
            
            />):(<Image 
                source={{uri:'http://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png'}}
                style={{ marginTop:20,width:120,borderRadius:40, height:120,alignSelf:'center'}}
                
                />)}
            </TouchableOpacity>
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
            title='Add User'
            onPress={() => this.storeUser()} 
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
  }
})

export default CreateProfile;
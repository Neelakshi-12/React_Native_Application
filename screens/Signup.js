
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator,TouchableOpacity, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage'
import RNFetchBlob from 'rn-fetch-blob';
import * as ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';

export default class Signup extends Component {


  constructor() {
    super();
    this.state = { 
      displayName: '',
      Number :'',
      email: '', 
      password: '',
      image:'',
      uri:null,
      submit_image:false,
      url:""
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  getPathForFirebaseStorage =async(uri)=> {
    const stat = await RNFetchBlob.fs.stat(uri)
    return stat.path
  }
   //upload to firestore

   uploadImage=async()=>{               
    let blob=this.getPathForFirebaseStorage(this.state.image.uri);
    const imagePath=(await blob).toString()
    const task = storage().ref('image'+auth().currentUser.uid).putFile(imagePath);
    let url=null;
    task.on('state_changed',null, null, async (taskSnapshot) => {
      url = await taskSnapshot.ref.getDownloadURL();
      console.log(url)
      firestore().collection('users').doc(doc)
    .update({
      image:url
    })
    .then(()=>{
      console.log("Uploaded to firestore");
    })
      console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
    });
    const doc=await AsyncStorage.getItem('user_id'+auth().currentUser.uid)
    
    task.then(() => {
      console.log('Image uploaded to the bucket!');
      this.setState({uri:this.state.image.uri})
      this.setState({image:null,submit_image:false})
      Toast.show('Uploaded!');
    });
}

  //change image
  chooseImage = () => {                                
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
            console.log("response",response.assets[0].uri)
            // const source = { uri: "file:///data/user/0/com.todoappv1/cache/rn_image_picker_lib_temp_9094b714-56be-4bc0-ba17-812eb1d5a00f.jpg" }
             const source = { uri: response.assets[0].uri}
            console.log(source)
            this.setState({
              image: source
            })
            this.setState({uri:this.state.image.uri})
            this.setState({submit_image:true})
          }
        })
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
          if(this.state.image!=''){
            this.uploadImage()
        }
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
          <TouchableOpacity onPress={()=>{this.chooseImage()}} style={{alignSelf:'center'}}>
                        {this.state.uri?
                (<Image 
            source={{uri:this.state.uri}}
            style={{ marginTop:20,width:120,borderRadius:80, height:120}}
            
            />):(<Image 
                source={{uri:'http://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png'}}
                style={{ marginTop:20,width:120,borderRadius:40, height:120,alignSelf:'center'}}
                
                />)}
            </TouchableOpacity>
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
import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class UserInfo extends Component {
    
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Users List"
          onPress={() => this.props.navigation.navigate('UserScreen')}
          color="#19AC52"
        />
    </View>
    );
  }
}

export default UserInfo;
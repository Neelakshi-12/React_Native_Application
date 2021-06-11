import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View,Button } from 'react-native';
import { ListItem } from 'react-native-elements'

class UserScreen extends Component {
    
render() {
    return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Users List"
          onPress={() => this.props.navigation.navigate('UserInfo')}
          color="#19AC52"
        />
    </View>
    );
  }
}
export default UserScreen;
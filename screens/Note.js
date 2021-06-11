import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity ,
    AsyncStorage
} from 'react-native';


export default class Note extends React.Component {
  render() {
    return (
      <View key={this.props.keyval} style={styles.note}>
        <Text style={styles.noteText}>{this.props.val.date}</Text>
        <Text style={styles.noteText}>{this.props.val.note}</Text>

        <TouchableOpacity onPress={this.props.deleteMethod} style={styles.noteDelete}>
            <Text style={styles.noteDeleteText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.editMethod} style={styles.noteEdit}>
            <Text style={styles.noteEditText}>Edit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  note: {
    position: 'relative',
    padding: 20,
    paddingRight: 100,
    borderBottomWidth: 2,
    borderBottomColor: '#ededed',
  },
  noteText: {
      paddingLeft: 20,
      borderLeftWidth: 10,
      borderLeftColor: '#2e8099',
  },
  noteDelete: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2e8099',
      padding: 10,
      borderRadius :10,
      top: 20,
      bottom: 20,
      right: 10,
  },
  noteDeleteText: {
      color: 'white',
  },
  noteEdit: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2e8099',
    padding: 10,
    borderRadius :10,
    top: 20,
    bottom: 20,
    right: 80,
},
noteEditText: { 
    color: 'white',
}
});
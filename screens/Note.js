import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity ,
    AsyncStorage,
    Image,
    TouchableHighlight,
    Alert
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
export default class Note extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        pressed: false,
    };
}

  render() {


    console.log("Value",this.props.val);
    console.log("title",this.props.val.title)
    console.log("created date",this.props.val.createdDate)
    // console.log("note",this.props.val.note);
     var date =  this.props.val.createdDate
     console.log("dateeeeee" , date)
    return (
      <View key={this.props.keyval} style={styles.note}>
        
        <Text style={styles.noteText}>
         
         {this.props.val.title}
        </Text>
        <Text style={styles.dateText}>Created Date :  </Text>
        
        <TouchableOpacity onPress={()=> {this.props.deleteMethod(this.props.val.id,this.props.val.title)}} style={styles.noteDelete}>
          
            <Text style={styles.noteDeleteText}>❌</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> {this.props.editMethod(this.props.val.id,this.props.val.title)}} style={styles.noteEdit}>
            <Text style={styles.noteEditText}> 📝</Text>
        </TouchableOpacity>
        
        
        {console.log("iscomplete",this.props.val.isComplete)}
        {/* {this.props.val.isComplete ? (
        <View>
         <Text>checked</Text>
        </View>
             ) : (
        <View>
                <Text>unchecked</Text>
               </View>
        )} */}

       {this.props.val && this.props.val.isImportant ?  
        <TouchableHighlight
            onPress={() => {this.props.important(this.props.val.id,this.props.val.title)}}
            
            style={[
                styles.noteStar,
                this.state.pressed ? { backgroundColor: "#2e8099" } : {backgroundColor: "#2e8099" }
            ]}
            onHideUnderlay={() => {
                this.setState({ pressed: true });
            }}
            onShowUnderlay={() => {
                this.setState({ pressed: false });
            }}
        >
           <Text style={styles.noteEditText}>⭐</Text>
        </TouchableHighlight> 
        :  
        <TouchableHighlight
            onPress={() => {this.props.important(this.props.val.id,this.props.val.title)}}
            
            style={[
                styles.noteStar,
                this.state.pressed ? { } : { }
            ]}
            onHideUnderlay={() => {
                this.setState({ pressed: true });
            }}
            onShowUnderlay={() => {
                this.setState({ pressed: false });
            }}
        >
           <Text style={styles.noteEditText}>⭐</Text>
        </TouchableHighlight> 
        }

        {this.props.val && this.props.val.isComplete ?  
        <View style={styles.checked}>
        <CheckBox value={this.props.val.isComplete}  onValueChange={() => {this.props.onchecked(this.props.val.id,this.props.val.title)}} />
        </View>
        :  <View style={styles.unchecked}>
        <CheckBox value={this.props.val.isComplete}  onValueChange={() => {this.props.onchecked(this.props.val.id,this.props.val.title)}} />
        </View>}

        
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
      fontSize : 18
  },
  dateText: {
    paddingLeft: 20,
    borderLeftWidth: 10,
    borderLeftColor: '#2e8099',
    fontSize : 11,
    color : "red",
    
},
  noteDelete: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2e8099',
      padding: 8,
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
    padding: 8,
    borderRadius :10,
    top: 20,
    bottom: 20,
    right: 50,
},
noteEditText: { 
    color: 'white',
},
// noteStar: {
//   position: 'absolute',
//   justifyContent: 'center',
//   alignItems: 'center',
//   backgroundColor: '#2e8099',
//   padding: 10,
//   borderRadius :10,
//   top: 20,
//   bottom: 20,
//   right: 133,
// },
noteStar: {
  position: 'absolute',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
  borderColor: "#2e8099",
  borderWidth: 1,
  padding: 8,
  borderRadius :10,
  top: 20,
  bottom: 20,
  right: 95,
},
checked :{
  position: 'absolute',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 2,
  borderRadius :10,
  borderColor: "grey",
  borderWidth: 1,
  top: 20,
  bottom: 20,
  right: 140,
},
unchecked : {
  position: 'absolute',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 2,
  borderRadius :10,
  borderColor: "grey",
  borderWidth: 1,
  top: 20,
  bottom: 20,
  right: 140,
}
});
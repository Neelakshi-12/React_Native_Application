import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    ScrollView, 
    TouchableOpacity ,
    AsyncStorage
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Note from './Note';

export default class Todo extends React.Component {

constructor(props){
    super(props);
    this.state = {
        noteArray: [],
        noteText: '',
    }
}

  render() {

    let notes = this.state.noteArray.map((val, key) => {
        return <Note key={key} keyval={key} val={val}
                 deleteMethod={ () => this.deleteNote(key) } 
                 editMethod = {() => this.editNote(key)}
                />
    });

    return (
      <View style={styles.container}>
         <View style={styles.header}>
          <Text style={styles.headerText}>Welcome 😉</Text>   
        </View>
        <TextInput 
       style={styles.TextInputStyleClass}
       onChangeText={(text) => this.SearchFilterFunction(text)}
       value={this.state.text}
       underlineColorAndroid='transparent'
       placeholder="Search Here"
        />

        <ScrollView style={styles.scrollContainer}>
            {notes}
        </ScrollView>

        <View style={styles.footer}>
            <TextInput 
            style={styles.textInput} 
            placeholder='> Enter Your Notes Here'
            onChangeText={(noteText) => this.setState({noteText})}
            value={this.state.noteText}
            placeholderTextColor='white'
            underlineColorAndroid='transparent'
            >
           </TextInput>
        </View>

        <TouchableOpacity onPress={ this.addNote.bind(this) } style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

      </View>
    );
  }
//   SearchFilterFunction(text){
     
//     const newData = this.arrayholder.filter(function(item){
//         const itemData = item.fruit_name.toUpperCase()
//         const textData = text.toUpperCase()
//         return itemData.indexOf(textData) > -1
//     })
//     this.setState({
//         dataSource: this.state.dataSource.cloneWithRows(newData),
//         text: text
//     })
// }
  
  async addNote(){
    let i=parseInt(await AsyncStorage.getItem('taskid'),10)
    if(i>=0){
     
    }else{
       i=0; 
    }
    let uid1=auth().currentUser.uid
        var taskinfo={
           uid:uid1,
           title: this.state.noteText,     
        complete: false,

        }
      // if (this.state.noteText) {

      //     var d = new Date();
      //     this.state.noteArray.push({
      //         'date': d.getFullYear() +
      //         "/" + (d.getMonth() + 1) +
      //         "/" + d.getDate(),
      //         'note': this.state.noteText
      //     });
      //     this.setState({ noteArray: this.state.noteArray })
      //     this.setState({ noteText: '' });

      // }
      firestore()
      .collection('Todo_tasks')
      .add(taskinfo)
this.state.arr.push(taskinfo);

AsyncStorage.setItem('taskid',(i+1).toString())
Toast.show("Task added successfully")
     
  }

  componentDidMount(){
    console.log("helloo component",auth().currentUser.uid)
    firestore().collection('Todo_tasks')
    .where('uid', '==', auth().currentUser.uid)
       .onSnapshot((querySnapshot) => {
        console.log("hello1",);
           var todoList= [];    //state 
           querySnapshot.forEach((doc) => {
             console.log(doc.data());
               todoList.push({...doc.data(), id: doc.id});
           });
           console.log("notearray")
           this.setState({
             
            noteArray : todoList,  //stored data
            
           })
     })
  }

  
 
  // getData= async() => {
  //   let todoIndex =0;
  //  await firestore().collection('Todo_tasks')
  //  .where('id', '==', auth().currentUser.uid)
  //   .then((querySnapshot)=>{
  //      querySnapshot.forEach((doc)=>{
  //       AsyncStorage.setItem('taskid'+doc.data().todoIndex, doc.id) 
  //       if(documentSnapshot.data().todoIndex>todoIndex){
  //         todoIndex=documentSnapshot.data().todoIndex
  //     } 
  //      })
  //   })
  //   AsyncStorage.setItem('Totaltasks',(todoIndex+1).toString)
  // }

  // updateUser() {
  //   this.setState({
  //     isLoading: true,
  //   });
  //   const updateDBRef = firebase.firestore().collection('users').doc(this.state.key);
  //   updateDBRef.set({
  //     name: this.state.name,
  //     email: this.state.email,
  //     mobile: this.state.mobile,
  //   }).then((docRef) => {
  //     this.setState({
  //       key: '',
  //       name: '',
  //       email: '',
  //       mobile: '',
  //       isLoading: false,
  //     });
  //     this.props.navigation.navigate('UserScreen');
  //   })
  //   .catch((error) => {
  //     console.error("Error: ", error);
  //     this.setState({
  //       isLoading: false,
  //     });
  //   });
  // }

  editNote(key){
  console.log("Editing");
  }

  deleteNote(key){
      this.state.noteArray.splice(key, 1);
      this.setState({ noteArray: this.state.noteArray })
      // const dbRef = firebase.firestore().collection('users').doc(this.props.route.params.userkey)
      // dbRef.delete().then((res) => {
      //     console.log('Item removed from database')
      //     this.props.navigation.navigate('UserScreen');
      // })
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: { 
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  headerText: {
    color: '#2e8099',
    fontSize: 28,
    fontWeight: 'bold',
    padding: 18,
    marginTop: 20
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  textInput: {
    alignSelf: 'stretch',
    color: '#fff',
    padding: 20,
    backgroundColor: '#2e8099',
  },
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: '#2e8099',
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  TextInputStyleClass:{
        
    textAlign: 'center',
    height: 40,
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 7 ,
    backgroundColor : "#FFFFFF"
         
    }
});
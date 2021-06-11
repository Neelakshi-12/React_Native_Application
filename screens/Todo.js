import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    ScrollView, 
    TouchableOpacity ,
    AsyncStorage,
    Alert
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
                isEdit : false,
                editId : '',
                searchText : '',
                finalTodos : [],
            }
        }

  render() {
            return (
              <View style={styles.container}>
                <View style={styles.header}>
                  <Text style={styles.headerText}>Welcome 😉</Text>   
                </View>
                 
                <View>
                <TextInput
                    onChangeText={(text) => {this.searchInput(text)}} 
                    style={styles.searchInput}
                    placeholder="Type a keyword to search"
                    value= {this.state.searchText}
                    />
                </View>

                <ScrollView style={styles.scrollContainer}>
                  {
                    this.state.noteArray.map((val, key) => {
                      console.log("data",val);
                      
                      return <Note key={key} keyval={key} val={val}
                              deleteMethod={this.deleteNote} 
                              editMethod =  {this.editNote}
                              />
                  })
                  }
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
         searchInput=(text)=>{
          console.log("search here!!",text);
          const Data = this.state.finalTodos
          console.log("Data",Data)
          if(text){
          const item = Data.filter((data)=>{
            return data.title.toLowerCase().includes(text.toLowerCase())
          })
          this.setState({
            noteArray: item,
            searchText : text,
          })
          }else if(text == ''){
                this.setState({
                  noteArray : Data,
                  searchText : '',
          })
          }
          
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
          if(this.state.isEdit == false){
            let uid1=auth().currentUser.uid
              
            firestore()
            .collection('Todo_tasks')
            .add({
              uid:uid1,
                title: this.state.noteText,     
              complete: false,
              createdDate:new Date()
            }).then((res)=>{
              console.log('added');
              this.setState({noteText:""});
            }).catch((err)=>{
              console.log("error")
            })

            Alert.alert("Task added successfully")

      }else if(this.state.isEdit == true) {
          //editing 

                  firestore()
                  .collection("Todo_tasks")
                  .doc(this.state.editId)
                  .update(
                    {title:this.state.noteText}
                  )
                  .then(() => {
                    console.log("Updated!");
                    Alert.alert("Updated!!!");
                    this.setState({isEdit:false,noteText : ""})
                  });

                  }
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
                  finalTodos : todoList
                })
          })
        }

        editNote= (id,text) =>{
        console.log("Editing",id);
        console.log("Editing",text);
        this.setState({noteText:text,isEdit: true, editId : id});  
        }

        deleteNote=(id,text)=>{
          console.log("deleteing",id);
          console.log("deleting",text);
           firestore()
          .collection('Todo_tasks')
          .doc(id)
          .delete()
          .then(() => {
            console.log("Deleted!");
            Alert.alert("Deleted!!");
          });

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
         
    },
    searchInput:{
      padding: 10,
      margin:10,
      borderRadius:20,
      borderColor: '#CCC',
      borderWidth: 1
    }
});
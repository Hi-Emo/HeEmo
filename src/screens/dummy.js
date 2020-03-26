import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    SafeAreaView,
    Button,
} from 'react-native';

import { getBottomSpace } from "react-native-iphone-x-helper";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { SafeAreaContext } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import dbCRUD from './new_db';

  export default class DB extends Component<Props> {

    constructor(props){
      super(props);

      this.state = {
        id: "",
        pw: "",
        acc: "",
      
     };

     dbCRUD.loadAccount().then((acc) => {
      acc = JSON.stringify(acc)
       this.showAcc(acc)
     })
    }

     

    showAcc = accounts => {
      this.setState({acc: accounts})
    }


    handlerId = text => {
      this.setState({id: text})
    }

    handlerPw = text => {
      this.setState({pw: text})
    }
     
  
  
      
   
    state = {
      activeSections: []
    };
  
    render(){
      return(
        <SafeAreaView>
          <View style={{flexDirection:'row', justifyContent: 'center'}}> 
            <Text>ID :</Text>
            <TextInput 
            placeholder='Input Id HERE!'
            onChangeText={this.handlerId}
            />

          </View>

          <View style={{flexDirection:'row', justifyContent: 'center'}}> 
            <Text>PW :</Text>
            <TextInput 
            placeholder='Input PW HERE!'
            onChangeText={this.handlerPw}
            />

          </View>

          <View style={{justifyContent: 'center'}}> 
            <Button 
            title="add to DB!"
            onPress={() => dbCRUD.runDB(this.state.id, this.state.pw, 1)}
            />

            <Button 
            title="Select all from DB!"
            onPress = {dbCRUD.loadAccount}
            />


          </View>

          <Text>{this.state.acc}</Text>
          

        </SafeAreaView>
  

      );

    }
  
    
  }

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
    marginVertical: 10,
    
    
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    
  }

});
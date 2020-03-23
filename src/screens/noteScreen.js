import React, { Component } from 'react';
import{
    View,
    Text,
    Dimensions,
    Image,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    StyleSheet,

} from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { SafeAreaView } from 'react-native-safe-area-context';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import {KeyboardAvoidingView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import dbCRUD from './Database';


const { width} = Dimensions.get('window');

const height= Dimensions.get("window").height - getStatusBarHeight() - getBottomSpace();

export default class Note extends Component<props>{

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            textValue: '여기에 일기 써라.',
            tt: '',
            index: 0,

    };
      }

      _onTextChange(event) {
        this.setState({ textValue: event.nativeEvent.text || ''});
      }

  

      _changeIndex() {
          
          this.setState({ index: this.state.index + 1});
      }

      _DummyText(){
        console.log("Clicked!");
      }
    
      

    
    render(){
        return(
            

                <SafeAreaView style={{
                flex: 1
                }}>
                    <View style={{flex:0.1, justifyContent: 'space-between', flexDirection: 'row'}}>
                        <Image
                        source={require('../../assets/home.png')}
                        resizeMode='contain'
                        style={{height:'60%'}}
                        />

                        <TouchableOpacity onPress={() => {dbCRUD.runDB(this.state.textValue, this.state.text, 1)}}>
                          <Image
                          source={require('../../assets/save.png')}
                          resizeMode='contain'
                          style={{height:'60%'}}
                          
                          />

                        </TouchableOpacity>
                        

                    </View>
                    <View style={{flex:1}}>
                      <TextInput
                      placeholder={'제목 써라.'}
                      style={{...styles.textInput , height:'10%'}}
                      onChangeText={(text)=>this.setState({text})
                      }
                      
                      />
                    <AutoGrowingTextInput
                        value={this.state.textValue}
                        onChange={(event) => this._onTextChange(event)}
                        style={styles.textInput}
                        placeholder={'Your Message'}
                        placeholderTextColor='#3f3f3f'
                        maxHeight={200}
                        minHeight={45}
                        enableScrollToCaret
                        ref={(r) => { this._textInput = r; }}
                    />

                    </View>

                    <KeyboardAvoidingView style={{flex:0.15}} behavior='padding'>

              
                      <TouchableOpacity onPress={() => {dbCRUD.runDB("vvv", "sss")}}>
                            
                            <Image
                            source={require('../../assets/staticButton.png')}
                            resizeMode = 'contain'
                            style = {{
                                
                                width:'100%',
                                
                            }}
                            />
                            

                        </TouchableOpacity>
                        

                    </KeyboardAvoidingView>
                
                
               
               
                </SafeAreaView>
             

        );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#76c6ff'
    },
    textInputContainer: {
      flexDirection: 'row',
      paddingLeft: 8,
      paddingRight: 8
    },
    welcome: {
      marginTop: 100,
      fontSize: 20,
      textAlign: 'center',
      margin: 10
    },
    textInput: {
      paddingLeft: '10%',
      fontSize: 20,
      fontWeight: '100',
      width: '80%',
      color:'#3f3f3f',
      borderWidth: 0,
    },
    button: {
      paddingLeft: 5,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
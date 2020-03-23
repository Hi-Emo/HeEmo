import React, {Component} from 'react';
import {
    View,
    ImageBackground,
    Image,
    Dimensions,
    SafeAreaView,
    TextInput,
    FlatList,
    Text,
    StyleSheet,
    ScrollView,
    

} from 'react-native';

import { getBottomSpace } from "react-native-iphone-x-helper";
import { getStatusBarHeight } from "react-native-status-bar-height";
import    AccordionView    from "./dummy.js"
import Accordion from 'react-native-collapsible/Accordion';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { navigation } from 'react-navigation'
import Calender from './dummy';

const { width} = Dimensions.get('window');

const height= Dimensions.get("window").height - getStatusBarHeight() - getBottomSpace();




export default class SecondScreen extends Component<props>{

    
      
    
    render(){
        return(
            <ImageBackground
            source={require('../../assets/bg_for_second.png')}
            style= {{
                width:'100%',
                height: '100%'
            }}
            >
            
            <SafeAreaView style={{
                flex: 1
            }}>
                
                <View style={{flexDirection: 'row', justifyContent: 'space-between', flex:1}}>

                    <TouchableOpacity style={{
                        width:'50%',
                        height: '50%',
                    }}
                    onPress = {() => this.props.navigation.pop()}
                    >

                    <Image
                        source = {require('../../assets/aa.png')}
                        style={{
                            height:'40%',
                            resizeMode:'contain'
        
                        }}
                        />

                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        width:'50%',
                        height: '50%',
                    }}
                    onPress = {() => this.props.navigation.navigate('Dummy')}
                    >
                    
                        <Image
                        source = {require('../../assets/bb.png')}
                        style={{
                            height:'40%',
                            resizeMode:'contain'
        
                        }}
                        />

                    </TouchableOpacity>
                    
                    
                    
                </View>
                <View style={{
                    flex: 2.9,
                    
                }}>
                <View style={{flex:0.065}}>
                    <TextInput
                       style={{
                       top:'2%',
                       left: '15%',
                            
                            
                    }}
                    placeholder="Search"
                    placeholderTextColor="#9a73ef"
                    />
                </View>
    
                <View style={{flex:1}}>
                    <Calender />
                        
                        
                        
                </View>

    
                </View>
                
                    
               
               
            </SafeAreaView>
    
        </ImageBackground>
    
    
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
      padding: 10,
      
    }
  
  });
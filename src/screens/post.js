import React, {Component} from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput, ImageBackground, TouchableOpacity, Button} from 'react-native';
import { getBottomSpace } from "react-native-iphone-x-helper";
import { getStatusBarHeight } from "react-native-status-bar-height";
const { width} = Dimensions.get('window');

const height= Dimensions.get("window").height - getStatusBarHeight() - getBottomSpace();

const pressHandler = ({navigation}) => {
  navigation.navigate('SecondScreen');

};


class post extends Component<props>{

 

  

    render(){
        return(
            <View style={{flexDirection: 'row', flex:1}}>
                <View style={{flex:0.5}}>
                    <TouchableOpacity style={{flex:1, flexDirection: 'row-reverse', alignItems:'center'}}>
                        <Image
                        source={require('../../assets/postbox.png')}
                        resizeMode= 'cover'
                        style={{width:'70%', height:'20%'}}
                        />

                    </TouchableOpacity>
                    
                    

                
                </View>
                <View style={{flex:0.5}}>
                    <TouchableOpacity style={{flex:1, justifyContent:'center'}} onPress = {() => this.props.navigation.navigate('note')}>
                        <Image
                        source={require('../../assets/mail.png')}
                        resizeMode= 'contain'
                        style={{width:'70%', height:'15%'}}
                        />

                    </TouchableOpacity>
                
                
                </View>
                
            </View>

           

        );
    }
}

const styles = StyleSheet.create({
  
 

})
export default post;

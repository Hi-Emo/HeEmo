import React, {Component} from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput, ImageBackground, TouchableOpacity, Button} from 'react-native';
import { getBottomSpace } from "react-native-iphone-x-helper";
import { getStatusBarHeight } from "react-native-status-bar-height";
const { width} = Dimensions.get('window');

const height= Dimensions.get("window").height - getStatusBarHeight() - getBottomSpace();

const pressHandler = ({navigation}) => {
  navigation.navigate('SecondScreen');

};

import Amplify, { Auth } from 'aws-amplify'
import awsconfig from '../aws-exports'

Amplify.configure(awsconfig)

class Login extends Component<props>{

    state = {
        authCode: ''
    }

    onChangeText(value){
        this.setState({
            authCode: value
        })
    }
    signUp() {
        Auth.signUp({
            username: 'leeminhyung',
            password: 'thisismyCoolPw1!',
            attributes: {
                email: 'ss49132002@gmail.com',
                phone_number: '+821063909435'
            }
        })
        .then(res => {
            console.log('signed Up!', res);
        })
        .catch(err => {
            console.log('err: ', err);
        })
    }

    verify() {
        const { authCode } = this.state
        Auth.confirmSignUp('leeminhyung', authCode)
        .then(res => {
            console.log('confirmed', res)
        })
        .catch(err => {
            console.log('err confiming: ', err)
        })
    }

 

  

    render(){
        return(
            <View>
                <TextInput 
                style={{marginTop:100, borderColor: 'black', borderBottomWidth: 5}}
                onChangeText = { value => this.onChangeText(value)}
                />

            <Button 
            title = "Sign Up"
            onPress = {this.signUp.bind(this)}

            />  

            <Button 
            title = "Verify"
            onPress = {this.verify.bind(this)}

            />  
            </View>
            





        );
    }
}

const styles = StyleSheet.create({
  

})
export default Login;

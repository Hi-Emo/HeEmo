import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput, ImageBackground, TouchableOpacity} from 'react-native';
import MainScreen from './src/screens/MainScreen'
import SecondScreen from './src/screens/SecondScreen'
import Navigator from './src/screens/homeStack'
import Accordion from './src/screens/dummy'

import { withAuthenticator } from 'aws-amplify-react-native';


const { width, height } = Dimensions.get('window');


class App extends Component<props>{

    

 
    render(){
        return(
          <Navigator />
          );
    }
}
export default App

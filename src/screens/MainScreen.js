import React, {Component} from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput, ImageBackground, TouchableOpacity, Button} from 'react-native';
import { getBottomSpace } from "react-native-iphone-x-helper";
import { getStatusBarHeight } from "react-native-status-bar-height";
const { width} = Dimensions.get('window');

const height= Dimensions.get("window").height - getStatusBarHeight() - getBottomSpace();

const pressHandler = ({navigation}) => {
  navigation.navigate('SecondScreen');

};


class MainScreen extends Component<props>{

 

  

    render(){
        return(

            <ImageBackground source={require('hello/assets/bg.png')} style={styles.backgroundImage}>
          
          <View style={{flex: 1.21}}>
            
              <View style={{flex: 0.8}}>
                <View style={styles.diaryView}>
                    
                <TouchableOpacity style={{width:'100%', height:'100%'}} onPress = {()=>this.props.navigation.navigate('Diary')}>
                  <Image
                  source = {require('hello/assets/diarybutton.png')}
                  style = {styles.diaryButton}
        
                  />        
                    
                </TouchableOpacity>
                

                </View>
              
                

                </View>
              

            <View style={{flex: 1}}>
            </View>

          </View>
          
          <View style={{flex:1}}>
            <View style={{flex:1}}>

              <View style={{flex: 0.78}}>

                  
                <View style={{flex:1}}>
                  <TouchableOpacity style={{width:'100%', height:'100%'}} >
                  
                  <Image 
                      source={require('hello/assets/button2.png')} 
                      style = {styles.selButton}
                    />
                    </TouchableOpacity>
                </View>

                
                <View style={{flex:1}}>
                <TouchableOpacity style={{width:'100%', height:'100%',}}>
                  <Image 
                      source={require('hello/assets/button1.png')} 
                      style = {styles.selButton}
                      
                    />
                    </TouchableOpacity>
                </View>
                
              </View>

              

                <View style={{flex:0.2}}>
                  

                </View>

            </View>

          </View>

            

              

              
            
        </ImageBackground>

        );
    }
}

const styles = StyleSheet.create({
  backgroundImage:{
    width:'100%',
    height: '100%',
  },
  diaryView: {
    height:'50%',
    width: '40%',
    top: '85%',
    left: '10%',
    justifyContent: 'center'
  },
  diaryButton: {
    height: '50%',
    width: '100%',
    resizeMode: 'contain',
  },
  selButton: {
    flex: 1,
    height: null,
    width: null, 
    resizeMode: 'contain',
  },
 

})
export default MainScreen;

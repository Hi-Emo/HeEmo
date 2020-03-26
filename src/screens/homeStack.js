import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';


import MainScreen from './MainScreen';
import SecondScreen from './SecondScreen';
import Dummy from './dummy.js'
import Note from './noteScreen'
import DBScreen from './Database'
import Calendar from './expandableCalendar';
import Agenda from './agenda';
import Post from './post';
import Login from './login'


import Amplify from 'aws-amplify';

import aws_exports from '../../aws-exports';


//Amplify.configure(aws_exports);




const screens = {
    Home:{
        screen: Dummy,
        navigationOptions: {
            header: null,
          },
    },

    Diary:{
        screen: SecondScreen,
        navigationOptions: {
            header: null,
        }
    },
    Dummy:{
        screen: Post,
        navigationOptions: {
            header: null,
        }
    },

    note:{
        screen: Note,
        navigationOptions: {
            header: null,
        }
    },

    box:{
        screen: Post,
        navigationOptions: {
            header: null,
        }
    },
    


}

const homeStack = createStackNavigator(screens);

export default createAppContainer(homeStack);


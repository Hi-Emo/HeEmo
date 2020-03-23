import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';

import { getBottomSpace } from "react-native-iphone-x-helper";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {Calendar, CalendarList, Agenda, LocaleConfig, calendarTheme} from 'react-native-calendars';

LocaleConfig.locales['kr'] = {
  monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  monthNamesShort: ['1','2.','3','4','5','6','7.','8','9.','10.','11.','12.'],
  dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
  dayNamesShort: ['일.','월.','화.','수.','목.','금.','토.'],
  today: '오늘'
};
LocaleConfig.defaultLocale = 'kr';

  export default class Cal extends Component<Props> {

    constructor(props){
      super(props);

      this.state = {
      day: 1,      // day of month (1-31)
      month: 1,    // month of year (1-12)
      year: 2017,  // year
         // UTC timestamp representing 00:00 AM of this date
      dateString: '2016-05-13' // date formatted as 'YYYY-MM-DD' string
     };
    }
     
  
  
      
   
    state = {
      activeSections: []
    };
  
    render(){
      return(
        <Calendar
  // Initially visible month. Default = Date()
  current={Date()}
  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
  minDate={undefined}
  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
  maxDate={undefined}
  // Handler which gets executed on day press. Default = undefined
  onDayPress={(day) => {console.log('selected day', day)}}
  // Handler which gets executed on day long press. Default = undefined
  onDayLongPress={(day) => {console.log('selected day', day)}}
  // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
  monthFormat={'yyyy MM'}
  // Handler which gets executed when visible month changes in calendar. Default = undefined
  onMonthChange={(month) => {console.log('month changed', month)}}
  // Hide month navigation arrows. Default = false
  hideArrows={true}
  // Replace default arrows with custom ones (direction can be 'left' or 'right')
  renderArrow={(direction) => (<Arrow/>)}
  // Do not show days of other months in month page. Default = false
  hideExtraDays={true}
  // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
  // day from another month that is visible in calendar page. Default = false
  disableMonthChange={true}
  // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
  firstDay={1}
  // Hide day names. Default = false
  hideDayNames={false}
  // Show week numbers to the left. Default = false
  showWeekNumbers={false}
  // Handler which gets executed when press arrow icon left. It receive a callback can go back month
  onPressArrowLeft={substractMonth => substractMonth()}
  // Handler which gets executed when press arrow icon right. It receive a callback can go next month
  onPressArrowRight={addMonth => addMonth()}
  // Disable left arrow. Default = false
  disableArrowLeft={true}
  // Disable right arrow. Default = false
  disableArrowRight={true}
/>


      

      

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
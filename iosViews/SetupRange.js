'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  TouchableOpacity,
  ActivityIndicatorIOS,
  AlertIOS,
  Picker,
  Item,
  StyleSheet,
  Image,
  Text,
  TextInput,
  View
} from 'react-native';

var self;
var SetupRange =  React.createClass({

	getInitialState() {
	  return{
      	token:'',
        selectedRange: 'key0',
	  };
	},

	componentDidMount() {
		self = this;
	},

  onAboutChanged(event){
    this.setState({ aboutMe: event.nativeEvent.text });
  },

  skipClicked(){

  },

  onRangeChanged(selected){
    this.setState({ selectedRange:selected })
  },

  onRightNavButtonClicked(){
  	if(self.state.aboutMe === ''){
  		AlertIOS.alert(
	        'About Empty',
	        'Tell us something about yourself or use skip.',
	        [
	          {text: 'Cancel', onPress: () => console.log("cancel"), style:'cancel'}
	        ],
	      );
  	} else {
  		AsyncStorage.setItem("aboutMe", self.state.aboutMe);

  		self.props.navigator.push({
          title: 'Musical Preference',
          component: setupPref,
          rightButtonTitle: 'Next',
          onRightButtonPress: () => { setupInfo.prototype.onRightNavButtonClicked() },
          titleTextColor: '#FFFFFF',
          barTintColor: '#1C1C1C',
        })
  	}
  },

	render(){

    //TODO: Fix text box with "what type of music do you like." It needs to wrap the content if it is longer/the device is smaller
    return(
	      <View style={styles.container}>
	        <View style={styles.topContainer}>
	        	<View style={[styles.contentContainer, {paddingTop: 70}]}>
		        	<Image style={styles.icon} source={require('../images/stepColored.png')} />
		        	<Image style={styles.icon} source={require('../images/stepColored.png')}/>
		        	<Image style={styles.icon} source={require('../images/stepColored.png')} />
		        	<Image style={styles.icon} source={require('../images/stepClear.png')} />
		        </View>
		        <View style={styles.contentContainer}>
		        	<Text style={styles.whiteFont}>What type of music do you like?</Text>
		        </View>
	         </View>


	        <View style={styles.inputContainer}>
            <Picker
            style={styles.picker}
            selectedValue={this.state.key0}
            onValueChange={(selected) => { this.onRangeChanged(selected) }}>
            <Picker.Item label="100 miles" value="key0" />
            <Picker.Item label="250 miles" value="key1" />
            <Picker.Item label="500 miles" value="key2" />
            <Picker.Item label="1000 miles" value="key3" />
            <Picker.Item label="2000 miles" value="key4" />
            <Picker.Item label="Worldwide" value="key5" />
            </Picker>
	       </View>

	       <View style={styles.bottomContainer}>
	       </View>
	      </View>
		);
	}
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    flexDirection: 'column'
  },
  picker: {
  width: 100,
},
  contentContainer: {
  	justifyContent: 'center',
  	alignItems: 'center',
  	flexDirection: 'row',
  	flex: 1,
  },
  topContainer: {
  	justifyContent: 'center',
  	alignItems: 'center',
  	flex: .25,
  },
  inputContainer: {
    alignItems: 'center',
  	flex: .60,
  	backgroundColor: '#3C3C3C',
  	marginLeft: 20,
  	marginTop: 20,
  	marginRight: 20
  },
  bottomContainer: {
  	justifyContent: 'center',
  	alignItems: 'center',
  	flex: .15
  },
  textContainer: {
  	paddingLeft: 10,
  	paddingRight: 10,
    flex: 1,
    flexDirection: 'row'
  },
  whiteFont: {
  	color: '#FFFFFF',
  	fontFamily: 'Verdana',
  	fontSize: 15
  },
  secondaryFont: {
  	color: '#F1F1F1',
  	fontFamily: 'Verdana',
  	fontSize: 12
  }
});



module.exports = SetupRange;

'use strict';

import CheckBox from 'react-native-checkbox';
import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  TouchableOpacity,
  ActivityIndicatorIOS,
  AlertIOS,
  StyleSheet,
  Image,
  Text,
  TextInput,
  View
} from 'react-native';

var self;
var SetupPref =  React.createClass({

	getInitialState() {
	  return{
      	token:'',
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

  onCheckboxClicked(){
  },

  onRightNavButtonClicked(){
  		//AsyncStorage.setItem("aboutMe", self.state.aboutMe);

  		self.props.navigator.push({
          title: 'Musical Preference',
          pageIdent: 'SetupRange',
          rightButtonTitle: 'Next',
          onRightButtonPress: () => { SetupRange.prototype.onRightNavButtonClicked() },
          titleTextColor: '#FFFFFF',
          barTintColor: '#1C1C1C',
        })
  },

	render(){

    //TODO: Fix text box with "what type of music do you like." It needs to wrap the content if it is longer/the device is smaller
    return(
	      <View style={styles.container}>
	        <View style={styles.topContainer}>
	        	<View style={[styles.contentContainer, {paddingTop: 70}]}>
		        	<Image style={styles.icon} source={require('../images/stepColored.png')} />
		        	<Image style={styles.icon} source={require('../images/stepColored.png')}/>
		        	<Image style={styles.icon} source={require('../images/stepClear.png')} />
		        	<Image style={styles.icon} source={require('../images/stepClear.png')} />
		        </View>
		        <View style={styles.contentContainer}>
		        	<Text style={styles.whiteFont}>What type of music do you like?</Text>
		        </View>
	         </View>


	        <View style={styles.inputContainer}>
            <View style={{paddingTop: 10}}>
  	        	<CheckBox label="House" />
              <CheckBox label="Drum n Bass" />
              <CheckBox label="Dubstep" />
              <CheckBox label="Trance" />
              <CheckBox label="Rock n Roll" />
              <CheckBox label="Electro" />
              <CheckBox label="Um" />
              <CheckBox label="Ya" />
              <CheckBox label="This Works" />
            </View>
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



module.exports = SetupPref;

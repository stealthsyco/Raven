'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  TouchableHighlight,
  ActivityIndicatorIOS,
  AlertIOS,
  StyleSheet,
  Image,
  Text,
  TextInput,
  View
} from 'react-native';
var self;


class setupPref extends Component {

	constructor(props) {
	  super(props);
	  this.state = {
      	token:'',
	  };
	}

	componentDidMount() {
		self = this;
	}

  onAboutChanged(event){
    this.setState({ aboutMe: event.nativeEvent.text });
  }

  skipClicked(){

  }

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
  }

	render(){

		return(
	      <View style={styles.container}>
	      </View>
		);
	}
}

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
  	flex: .45,
  	backgroundColor: '#3C3C3C',
  	marginLeft: 20,
  	marginTop: 20,
  	marginRight: 20
  },
  bottomContainer: {
  	justifyContent: 'center',
  	alignItems: 'center',
  	flex: .30
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



module.exports = setupPref;
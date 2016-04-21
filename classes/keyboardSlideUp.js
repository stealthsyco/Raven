'use strict'

var React = require('react-native');

import React, {
  AppRegistry,
  StyleSheet,
  Text,
  DeviceEventEmitter,
  View
} from 'react-native';

class keyboardSlideUp extends Component {


    componentWillMount () {
   		this.keyboardDidShowListener = DeviceEventEmitter.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
    	this.keyboardDidHideListener = DeviceEventEmitter.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
  	}

  	componentWillUnmount () {
    	this.keyboardDidShowListener.remove();
    	this.keyboardDidHideListener.remove();
 	}	

	render(){

	}
}

module.exports = keyboardSlideUp;


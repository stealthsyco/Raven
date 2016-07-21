'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  TouchableHighlight,
  ActivityIndicatorIOS,
  StyleSheet,
  Image,
  Text,
  TextInput,
  View
} from 'react-native';

//var TabBar = require('../components/tabComponent');

class homeFeed extends Component {

	constructor(props) {
	  super(props);
	  this.state = {
      	token: ''
	  };
	}

	componentDidMount() {
	    AsyncStorage.getItem("jwt").then((value) => {
	        this.setState({"token": value});
	    }).done();
	}

	render(){
		console.log("Tribe feed has token: " + this.state.token);

		return(
			<View />
		);
	}
}



module.exports = homeFeed;

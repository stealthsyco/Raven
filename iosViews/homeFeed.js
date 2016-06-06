'use strict';

import React, {
  AppRegistry,
  AsyncStorage,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Component,
  StyleSheet,
  Image,
  Text,
  TextInput,
  View
} from 'react-native';

var TabBar = require('../components/tabComponent');

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
			<TabBar />
		);
	}
}



module.exports = homeFeed;
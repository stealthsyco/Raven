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
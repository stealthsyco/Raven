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

var setupPref = require('./setupPref.js');
var self;


class setupInfo extends Component {

	constructor(props) {
	  super(props);
	  this.state = {
	  	aboutMe:'',
      	token:'',
	  };
	}

	componentDidMount() {
		self = this;
	    AsyncStorage.getItem("jwt").then((value) => {
	        this.setState({"token": value});
	    }).done();
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
          backButtonTitle: 'About',
          component: setupPref,
          rightButtonTitle: 'Next',

          onRightButtonPress: () => { setupPref.prototype.onRightNavButtonClicked() },
          titleTextColor: '#FFFFFF',
          barTintColor: '#1C1C1C',
        })
  	}
  }

	render(){

		return(
	      <View style={styles.container}>
	        <View style={styles.topContainer}>
	        	<View style={[styles.contentContainer, {paddingTop: 70}]}>
		        	<Image style={styles.icon} source={require('../images/stepColored.png')} />
		        	<Image style={styles.icon} source={require('../images/stepClear.png')} />
		        	<Image style={styles.icon} source={require('../images/stepClear.png')} />
		        	<Image style={styles.icon} source={require('../images/stepClear.png')} />
		        </View>
		        <View style={styles.contentContainer}>
		        	<Text style={styles.whiteFont}>Tell us a little about yourself.</Text>	
		        </View>
	         </View>


	        <View style={styles.inputContainer}>
	        	<TextInput
	                style={[styles.textContainer, styles.whiteFont]}
	                autoCorrect={false}
	                returnKeyType='next'
	                multiline={true}
	                maxLength={500}
	                autoCapitalize='none'
	                onChange={this.onAboutChanged.bind(this)}
	                value={this.state.aboutMe} />
	       </View>

	       <View style={styles.bottomContainer}>
	       		<TouchableHighlight
			        onPress={this.skipClicked.bind(this)}>
			        <View>
			          <Text style={styles.secondaryFont}>SKIP >></Text>
			        </View>
			      </TouchableHighlight>  
	       </View>
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



module.exports = setupInfo;
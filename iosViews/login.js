'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  AlertIOS,
  TouchableOpacity,
  ActivityIndicatorIOS,
  StyleSheet,
  Image,
  Text,
  TextInput,
  View
} from 'react-native';

import helperFunctions from '../classes/helperFunctions.js'

//Async-Storage key
var storageKey = '@token:key';

var Login = React.createClass({

  getInitialState() {
    return {
      username: '',
      password: '',
      token: '',
      showErrorMessage: false,
    };
  },

  saveToken(value, username) {
    AsyncStorage.setItem("jwt", value);
    AsyncStorage.setItem("username", username);
    //this.setState({ token: value });
    this.state.token = value;
  },

  invalidPassword(){
    this.setState({ showErrorMessage:true });
  },

  // Handler for login button
  onLoginPressed(){
    console.log("we made it boys");
    var self = this;
      helperFunctions.checkLogin(this.state.username, this.state.password, function(response){
        //our response holds our token, we need to pass this along to different pages...
        if(response.status === 200) {
          self.state.password = '';
          self.state.showErrorMessage = false;
          self.state.token = response.token;
          self.saveToken(response.token, self.state.username);

          if(response.firstlogin == true && response.setup == 0){
            self.props.navigator.push({
              title: 'About You',
              pageIdent: 'SetupInfo',
              onRightButtonPress: () => { setupInfo.prototype.onRightNavButtonClicked() },
              titleTextColor: '#FFFFFF',
              barTintColor: '#1C1C1C',
            })
          } else {
            self.props.navigator.push({
              title: 'TRIBE FEED',
              pageIdent: 'Home',
              titleTextColor: '#FFFFFF',
              barTintColor: '#1C1C1C',
          })
          }
        } else {
          self.invalidPassword();
        }
      });
  },

	render() {
    //TODO: Create a center text box so the text wraps
    var showErrorMessage = this.state.showErrorMessage ?
          <Text style={styles.errorStyle}>Your username or password is incorrect. Please try again.</Text> : <View />

	    return (
	      <View style={styles.container}>
	      	<View style={styles.topSpacer} />
	      	<View style={styles.inputContainer}>

	      		<View style={styles.usernameField}>
	      			<View style={styles.iconContainer}>
	      				<Image style={styles.icon} source={require('../images/userIcon.png')} />
	      			</View>
      				<TextInput
      					style={[styles.textContainer, styles.whiteFont]}
      					autoCorrect={false}
      					autoCapitalize='none'
      					placeholder="Username"
      					placeholderTextColor="#6F6F6F"
      					value={this.state.username}
      					onChangeText={(username) => this.setState({username})} />
	      		</View>

	      		<View style={styles.passwordField}>
	      			<View style={styles.iconContainer}>
	      				<Image style={styles.icon} source={require('../images/passIcon.png')} />
	      			</View>
	  				<TextInput
	  					password={true}
	  					style={[styles.textContainer, styles.whiteFont]}
	  					autoCorrect={false}
	      			autoCapitalize='none'
	  					placeholder="Password"
	  					placeholderTextColor="#6F6F6F"
	  					value={this.state.password}
	  					onChangeText={(password) => this.setState({password})} />
	      		</View>

            <TouchableOpacity
            	style={styles.loginButton}
              onPress={(event)=>{this.onLoginPressed()}}>
            	<Text style={styles.whiteFont}> LOG IN </Text>
            </TouchableOpacity>
	      	</View>

	      	<View style={styles.bottomSpacer}>
            {showErrorMessage}
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
  topSpacer: {
  	flex: .25
  },
  inputContainer: {
  	flex: .24,
  	backgroundColor: '#3C3C3C',
  	marginLeft: 20,
  	marginRight: 20,
    marginBottom: 20,
  },
  usernameField: {
  	flex: 1,
  	backgroundColor: "#2C2C2C",
  	flexDirection: 'row'
  },
  passwordField: {
  	flex: 1,
  	backgroundColor: "#2C2C2C",
  	marginTop: 1,
  	flexDirection: 'row'
  },
  iconContainer: {
  	flex: .15,
  	justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
  	padding: 5,
  	flex: .85
  },
  icon: {
  	height: 28,
  	width: 28
  },
  loginButton: {
  	flex: 1,
  	justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#199C66'
  },
  bottomSpacer: {
  	flex: .51
  },
  errorStyle: {
    color: 'red',
    fontFamily: 'Verdana',
    fontSize: 12,
    textAlign: 'center',
  },
  whiteFont: {
  	color: '#FFFFFF',
  	fontFamily: 'Verdana',
  	fontSize: 15
  }
});

module.exports = Login;

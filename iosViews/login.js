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

var helperFunctions = require('../classes/helperFunctions');
var homeFeed = require('./homeFeed');

//Async-Storage key
var storageKey = '@token:key';

class login extends Component {

	constructor(props) {
	  super(props);
	  this.state = {
	    username: '',
	    password: '',
      token:'',
	  };
	}

  saveToken(value) {
    AsyncStorage.setItem("jwt", value);
    this.setState({ token: value });
  }

  // Setter for username field
	onUsernameChanged(event){
		this.setState({ username: event.nativeEvent.text });
	}

  // Setter for password field
	onPasswordChanged(event){
		this.setState({ password: event.nativeEvent.text });
	}

  // Handler for login button
  onLoginPressed(){
    var self = this;
      helperFunctions.checkLogin(this.state.username, this.state.password, function(response){
        //our response holds our token, we need to pass this along to different pages...
        if(response.status === 200) {
          self.state.token = response.token;
          self.saveToken(response.token);
          self.props.navigator.push({
            title: 'TRIBE FEED',
            component: homeFeed,
            titleTextColor: '#FFFFFF',
            barTintColor: '#1C1C1C',
          })
        } else {
          //show error message
        }
      });
  }

	render() {
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
      					onChange={this.onUsernameChanged.bind(this)} />
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
	  					onChange={this.onPasswordChanged.bind(this)} />
	      		</View>

            <TouchableHighlight
            	style={styles.loginButton}
              onPress={this.onLoginPressed.bind(this)}>
            	<Text style={styles.whiteFont}> LOG IN </Text>
            </TouchableHighlight>
	      	</View>

	      	<View style={styles.bottomSpacer} />
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
  topSpacer: {
  	flex: .25
  },
  inputContainer: {
  	flex: .24,
  	backgroundColor: '#3C3C3C',
  	marginLeft: 20,
  	marginRight: 20
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
  whiteFont: {
  	color: '#FFFFFF',
  	fontFamily: 'Verdana',
  	fontSize: 15
  }
});

module.exports = login;
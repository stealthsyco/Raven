'use strict';

import React, {
  AppRegistry,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Component,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';

var login = require('./login');
var signupType = require('./signupType');

class home extends Component {
	loginPressed(){
		this.props.navigator.push({
		  title: 'LOG IN',
          component: login,
          titleTextColor: '#FFFFFF',
          barTintColor: '#1C1C1C',
		})
	}

	signupPressed(){
		this.props.navigator.push({
		  title: 'SIGN UP',
          component: signupType,
          titleTextColor: '#FFFFFF',
          barTintColor: '#1C1C1C',
		})
	}

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.backdrop}>
          	<Image style={styles.logo} source={{uri:'http://cdn.marketplaceimages.windowsphone.com/v8/images/f6ca8518-ee7f-4e3d-ba83-1c4753f7d2c1?imageType=ws_icon_medium'}} />
          </View>
        </View>

        <View style={styles.bottomContainer}>

            <TouchableHighlight onPress={this.loginPressed.bind(this)}
            	style={styles.loginButton}>
            	<Text style={styles.whiteFont}> LOG IN </Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={this.signupPressed.bind(this)}
            	style={styles.signButton}>
            	<Text style={styles.whiteFont}> SIGN UP </Text>
            </TouchableHighlight>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  topContainer: {
    flex: .92,
    flexDirection: 'column'
  },
    bottomContainer: {
    flex: .08,
    flexDirection: 'row'
  },
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#225F69'
  },
  logo: {
  	width: 150,
  	height: 150
  },
  whiteFont: {
  	color: '#FFFFFF',
  	fontFamily: 'Verdana',
  	fontSize: 15
  },
    loginButton: {
    flex: .5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1C1C'
  },
    signButton: {
    flex: .5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#199C66'
  }
});

module.exports = home;
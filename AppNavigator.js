import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Navigator,
} from 'react-native';

import LoggedOutHome from './iosViews/LoggedOutHome.js';
import Login from './iosViews/Login.js';

/*
  This class will handle routing the user to the main sections of the app.
  Namely the loggin page, the "home" page ,and the active order page
*/
class AppNavigator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startPage: ''
    }
  }

  render() {
    //this.determineStartPage()

    return (
      <Navigator
        // TODO: change the initialRoute to a loading page so the user is not
        //       loaded into an incorrect page while the functions determine the proper start page
        initialRoute={{pageIdent: 'LoggedOutHome'}}
        ref="appNavigator"
        style={styles.navigatorStyle}
        renderScene={this._renderScreen}
        configureScene={(route) => ({
          ...route.sceneConfigs || Navigator.SceneConfigs.FloatFromRight,
        })} />
    );
  }

  determineStartPage() {
    if(this.props.loggeddIn){

    } else {
      this.setState({startPage: 'LoggedOutHome'})
    }
  }


  _renderScreen(route, navigator){
    var globalNavigatorProps = {navigator}
    console.log("something");
    //NOTE: the globalNavigatorProps are passed to each page to give it the
    //      navigator so it can push pages onto the navigator
    switch (route.pageIdent) {
      case 'LoadingScreen':
        return(
          <LoadingScreen
            {...globalNavigatorProps} />
        )
      break;
      case 'LoggedOutHome':
        return(
          <LoggedOutHome
            {...globalNavigatorProps} />
        )
      break;
      case 'Login':
        return(
          <Login
            {...globalNavigatorProps} />
        )
        break;
      default:
        return(
          <Text style={styles.error}>x
            You are attempting to route to a page that does not exist in the navigator: {route.ident} 
          </Text>
        )
        break;
    }
  }
}

const styles = StyleSheet.create({
  //TODO: see if a nav style should be added to the code if it isn't a hidden object
  navigatorStyle: {

  },
  error: {
    color: 'red',
    fontSize: 25,
  }
});

module.exports = AppNavigator

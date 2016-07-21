import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Navigator,
} from 'react-native';

import LoggedOutHome from './iosViews/LoggedOutHome.js';
import SignupType from './iosViews/SignupType.js';
import FanSignup from './iosViews/FanSignup.js';
import Login from './iosViews/Login.js';
import SetupInfo from './iosViews/SetupInfo.js';
import SetupPref from './iosViews/SetupPref.js';
import SetupRange from './iosViews/SetupRange.js';
import Home from './iosViews/Home.js';

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
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: (route, navigator, index, navState) =>
              {
                switch(route.pageIdent){
                  case 'Login':
                  case 'SetupInfo':
                  case 'SetupPref':
                  case 'SetupRange':
                  case 'SignupType':
                  case 'FanSignup':
                    return(
                      <TouchableOpacity
                        underlayColor="transparent"
                        onPress={() => { if (index > 0) { navigator.pop() } }}>
                        <Text style={ styles.backButtonStyle }>Back</Text>
                      </TouchableOpacity>
                    )
                  break;

                  default:
                    return null;
                  break;
                }
              },
              RightButton: (route, navigator, index, navState) =>
              {
                switch(route.pageIdent){
                  case 'SetupInfo':
                    return(
                      <TouchableOpacity
                        underlayColor="transparent"
                        onPress={() => { SetupInfo.prototype.onRightNavButtonClicked() }}>
                        <Text style={ styles.nextButtonStyle }>Next</Text>
                      </TouchableOpacity>
                    )
                  break;
                  case 'SetupPref':
                    return(
                      <TouchableOpacity
                        underlayColor="transparent"
                        onPress={() => { SetupPref.prototype.onRightNavButtonClicked() }}>
                        <Text style={ styles.nextButtonStyle }>Next</Text>
                      </TouchableOpacity>
                    )
                  break;
                  case 'SetupRange':
                    return(
                      <TouchableOpacity
                        underlayColor="transparent"
                        onPress={() => { SetupRange.prototype.onRightNavButtonClicked() }}>
                        <Text style={ styles.nextButtonStyle }>Next</Text>
                      </TouchableOpacity>
                    )
                  break;
                  default:
                    return null;
                  break;
                }
              },
              Title: (route, navigator, index, navState) =>
              {
                switch(route.pageIdent){
                  case 'Login':
                    return(<Text style={styles.titleStyle}>LOG IN</Text>);
                  break;
                  case 'SignupType':
                    return(<Text style={styles.titleStyle}>Choose Type</Text>);
                  break;
                  case 'FanSignup':
                    return(<Text style={styles.titleStyle}>Fan</Text>);
                  break;
                  case 'SetupInfo':
                    return(<Text style={styles.titleStyle}>About You</Text>);
                  break;
                  case 'SetupPref':
                    return(<Text style={styles.titleStyle}>Music Preference</Text>);
                  break;
                  case 'SetupRange':
                    return(<Text style={styles.titleStyle}>Festival Distance</Text>);
                  break;

                  default:
                    return null;
                  break;
                }
              }
            }}/>
        }
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
      case 'SignupType':
        return(
          <SignupType
            {...globalNavigatorProps} />
        )
        break;
      case 'FanSignup':
        return(
          <FanSignup
          {...globalNavigatorProps} />
        )
        break;
      case 'Login':
        return(
          <Login
            {...globalNavigatorProps} />
        )
        break;
      case 'SetupInfo':
        return(
          <SetupInfo
            {...globalNavigatorProps} />
        )
      case 'SetupPref':
        return(
          <SetupPref
            {...globalNavigatorProps} />
        )
      break;
      case 'SetupRange':
        return(
          <SetupRange
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
  backButtonStyle: {
    color: 'white',
  	fontFamily: 'Verdana',
    fontSize: 20,
    paddingLeft: 15,
    paddingTop: 10,
  },
  titleStyle: {
    color: 'white',
  	fontFamily: 'Verdana',
    fontSize: 20,
    paddingTop: 10,
  },
  nextButtonStyle: {
    color: 'white',
  	fontFamily: 'Verdana',
    fontSize: 20,
    paddingRight: 15,
    paddingTop: 10,
  },
  error: {
    color: 'red',
    fontSize: 25,
  }
});

module.exports = AppNavigator

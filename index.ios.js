'use strict';

import React, { Component, } from 'react';
import {
  AppRegistry,
  NavigatorIOS,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import AppNavigator from './AppNavigator.js';

class Raven extends Component {
  render() {
    StatusBar.setBarStyle('light-content')
    return (
      //Add navigaton
      <AppNavigator />
       // <NavigatorIOS
       //  style={styles.container}
       //  initialRoute={{
       //    title: '',
       //    component: main,
       //    navigationBarHidden: true,
       //  }} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

AppRegistry.registerComponent('Raven', () => Raven);

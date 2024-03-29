'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  TouchableHighlight,
  ActivityIndicatorIOS,
  StyleSheet,
  Text,
  View
} from 'react-native';

var SignupType = React.createClass({

  onFanPressed(){
    this.props.navigator.push({
      title: 'FAN',
      pageIdent: 'FanSignup',
      titleTextColor: '#FFFFFF',
      barTintColor: '#1C1C1C',
    });
  },

  onFestivalPressed(){

  },

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.topContainer}>
          <View style={styles.progressContainer} />
          <View style={styles.textContainer}>
            <Text style={styles.whiteFont}
              textAlign='center'>
              What type of account do you need? </Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TouchableHighlight
            onPress={() => this.onFanPressed()}
            style={styles.fanButton}>
            <Text style={styles.whiteFont}>FAN</Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => this.onFestivalPressed()}
            style={styles.festivalButton}>
            <Text style={styles.whiteFont}>FESTIVAL</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.bottomSpacer} />
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
  topContainer: {
    flex: .25,
    flexDirection: 'column',
  },
  progressContainer: {
    flex: 1
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    flex: .20,
    backgroundColor: '#3C3C3C',
    marginLeft: 20,
    marginRight: 20
  },
  fanButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 1,
    backgroundColor: '#199C66'
  },
  festivalButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
    backgroundColor: '#199C66'
  },
  bottomSpacer: {
    flex: .55
  },
  whiteFont: {
    color: '#FFFFFF',
    fontFamily: 'Verdana',
    fontSize: 15
  }
});

module.exports = SignupType;

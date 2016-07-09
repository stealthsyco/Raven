'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  TabBarIOS,
  NavigatorIOS,
  TouchableHighlight,
  ActivityIndicatorIOS,
  StyleSheet,
  Image,
  Text,
  TextInput,
  View
} from 'react-native';

var Profile = require('../iosViews/profile');

var TabBar = React.createClass({
  statics: {
    title: '<TabBarIOS>',
    description: 'Tab-based navigation.',
  },

  displayName: 'TabBarExample',

  getInitialState: function() {
    return {
      selectedTab: 'profileTab',
      notifCount: 0,
      presses: 0,
    };
  },

  _renderContent: function(color: string, pageText: string, num?: number) {
    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
        <Text style={styles.tabText}>{pageText}</Text>
        <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text>
      </View>
    );
  },

  _renderProfileView: function() {
    return (
      <NavigatorIOS style={styles.container}
        tintColor='#D6573D'
        barTintColor='#1C1C1C'
        titleTextColor='#D6573D'
        initialRoute={{
          title: 'Kyle',
          component: Profile
      }} />
    )
  },

  render: function() {
    return (
      <TabBarIOS
        unselectedTintColor="yellow"
        tintColor="white"
        barTintColor="darkslateblue">
        <TabBarIOS.Item
          title="Feed"
          selected={this.state.selectedTab === 'feedTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'feedTab',
            });
          }}>
          {this._renderContent('#414A8C', 'Blue Tab')}
        </TabBarIOS.Item>
                <TabBarIOS.Item
          title="Festivals"
          selected={this.state.selectedTab === 'festivalTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'festivalTab',
            });
          }}>
          {this._renderContent('#414A8C', 'Blue Tab')}
        </TabBarIOS.Item>
                <TabBarIOS.Item
          title="Messages"
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}>
          {this._renderContent('#414A8C', 'Blue Tab')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="history"
          badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
          selected={this.state.selectedTab === 'notificationTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'notificationTab',
              notifCount: this.state.notifCount + 1,
            });
          }}>
          {this._renderContent('#783E33', 'Red Tab', this.state.notifCount)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          renderAsOriginal
          title="Profile"
          selected={this.state.selectedTab === 'profileTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'profileTab',
            });
          }}>
          {this._renderProfileView()}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

module.exports = TabBar;

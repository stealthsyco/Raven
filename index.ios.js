'use strict';

import React, {
  AppRegistry,
  StatusBar,
  Component,
  StyleSheet,
  View
} from 'react-native';

var home = require('./home');

class Raven extends Component {
  render() {
    StatusBar.setBarStyle('light-content')
    return (
      //Add navigaton
       <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: '',
          component: home,
          navigationBarHidden: true,
        }}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

AppRegistry.registerComponent('Raven', () => Raven);

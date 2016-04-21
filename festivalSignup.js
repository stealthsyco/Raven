'use strict';

import React, {
  AppRegistry,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

class festivalSignup extends Component {
  render() {
    return (
      //Add navigaton
      <View style={styles.container} />
    );
  }
}

var styles = StyleSheet.create({
  text: {
  	color: 'black',
  	backgroundColor: 'white',
  	fontSize: 30
  },
  container: {
    flex: 1,
    alignItems: 'center'
  }
});

module.exports = festivalSignup;
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

class signupType extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topSpacer} />
        <View style={styles.inputContainer} />
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
  bottomSpacer: {
    flex: .59
  },
  inputContainer: {
    flex: .16,
    backgroundColor: '#3C3C3C',
    marginLeft: 20,
    marginRight: 20
  }
});

module.exports = signupType;
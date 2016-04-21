'use strict';

import React, {
  AppRegistry,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicatorIOS,
  DatePickerIOS,
  CustomActionSheet,
  Component,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

var DatePickerModal = require('react-native-custom-action-sheet');
var dismissKeyboard = require('./classes/dismissKeyboard');

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

class fanSignup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      first: '',
      last: '',
      password: '',
      repeat: '',
      dob: '',
      date: new Date(),
      showDatePicker: false
    };
  }

  onDateChange(date){
    this.setState({ date: date });
    console.log(date);
    this.setState({ dob: monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear().toString() });
  }

  signPressed(){

  }

  onUsernameChanged(event){
    this.setState({ username: event.nativeEvent.text });
  }

  onEmailChanged(event){
    this.setState({ email: event.nativeEvent.text });
  }

  onFirstChanged(event){
    this.setState({ first: event.nativeEvent.text });
  }

  onLastChanged(event){
    this.setState({ last: event.nativeEvent.text });
  }

  onPasswordChanged(event){
    this.setState({ password: event.nativeEvent.text });
  }

  onRepeatChanged(event){
    this.setState({ repeat: event.nativeEvent.text });
  }

  render() {
    //This type of fuction has two options, one with true and one with false.
    //If it is false, the empty view is called. If it is true, the date picker
    //is shown.
    var showDatePicker = this.state.showDatePicker ?
        <DatePickerModal modalVisible={this.state.modalVisible} 
          onCancel={() => this.setState({showDatePicker:false})}>
          {showDatePicker}
          {dismissKeyboard()}
          <View style={styles.datePickerContainer}>
            <DatePickerIOS 
              mode="date"
              date={this.state.date} 
              onDateChange={this.onDateChange.bind(this)} />
          </View>
        </DatePickerModal> : <View />

    return (
      <View style={styles.container}>
        <View style={styles.topSpacer} />

        <View style={styles.inputContainer}>

          <View style={styles.usernameField}> 
              <View style={styles.iconContainer} />
              <TextInput
                style={[styles.textContainer, styles.whiteFont]}
                autoCorrect={false}
                returnKeyType='next'
                autoCapitalize='none'
                placeholder="Username"
                placeholderTextColor="#6F6F6F"
                value={this.state.username}
                onChange={this.onUsernameChanged.bind(this)} />
          </View>

          <View style={styles.emailField}>
            <View style={styles.iconContainer} />
              <TextInput
                ref='email'
                style={[styles.textContainer, styles.whiteFont]}
                autoCorrect={false}
                autoCapitalize='none'
                placeholder="Email"
                placeholderTextColor="#6F6F6F"
                value={this.state.email}
                onChange={this.onEmailChanged.bind(this)} />
          </View>

          <View style={styles.nameContainer}>
            <View style={styles.iconContainer} />
              <View style={styles.textContainer}>
                <TextInput
                  style={[styles.firstLastField, styles.whiteFont]}
                  autoCorrect={false}
                  autoCapitalize='none'
                  placeholder="First"
                  placeholderTextColor="#6F6F6F"
                  value={this.state.first}
                  onChange={this.onFirstChanged.bind(this)} />

                <TextInput
                  style={[styles.firstLastField, styles.whiteFont]}
                  autoCorrect={false}
                  autoCapitalize='none'
                  placeholder="Last"
                  placeholderTextColor="#6F6F6F"
                  value={this.state.last}
                  onChange={this.onLastChanged.bind(this)} />
              </View>
          </View>

          <View style={styles.passwordField}>
            <View style={styles.iconContainer} />
              <TextInput
                style={[styles.textContainer, styles.whiteFont]}
                password={true}
                autoCorrect={false}
                autoCapitalize='none'
                placeholder="Password"
                placeholderTextColor="#6F6F6F"
                value={this.state.password}
                onChange={this.onPasswordChanged.bind(this)} />
          </View>

          <View style={styles.repeatField}>
            <View style={styles.iconContainer} />
              <TextInput
                style={[styles.textContainer, styles.whiteFont]}
                autoCorrect={false}
                autoCapitalize='none'
                placeholder="Repeat Password"
                placeholderTextColor="#6F6F6F"
                value={this.state.repeat}
                onChange={this.onRepeatChanged.bind(this)} />
          </View>

          <View style={styles.dobField}>
            <View style={styles.iconContainer} />
            <TextInput
              style={[styles.textContainer, styles.whiteFont]}
              placeholder="Date of Birth"
              placeholderTextColor="#6F6F6F"
              value={this.state.dob}
              onFocus={() => this.setState({showDatePicker:true})}/>
            {showDatePicker}
          </View>


          <TouchableHighlight 
            onPress={this.signPressed.bind(this)}
            style={styles.signButton}>
            <Text style={styles.whiteFont}>SIGN UP</Text>
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
    flex: .56,
    backgroundColor: '#3C3C3C',
    marginLeft: 20,
    marginRight: 20
  },
  usernameField: {
    flex: 1,
    marginBottom: 1,
    backgroundColor: "#2C2C2C",
    flexDirection: 'row'   
  },
  emailField: {
    flex: 1,
    marginBottom: 1,
    backgroundColor: "#2C2C2C",
    flexDirection: 'row'
  },
  nameContainer: {
    flex: 1,
    marginBottom: 1,
    backgroundColor: "#2C2C2C",
    flexDirection: 'row'
  },
  firstLastField: {
    flex: 1
  },
  passwordField: {
    flex: 1,
    marginBottom: 1,
    backgroundColor: "#2C2C2C",
    flexDirection: 'row'
  },
  repeatField: {
    flex: 1,
    marginBottom: 1,
    backgroundColor: "#2C2C2C",
    flexDirection: 'row'
  },
  dobField: {
    flex: 1,
    marginBottom: 1,
    backgroundColor: "#2C2C2C",
    flexDirection: 'row'
  },
  signButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#199C66",
    flexDirection: 'row'
  },
  iconContainer: {
    flex: .15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    height: 28,
    width: 28
  },
  textContainer: {
    padding: 5,
    flex: .85,
    flexDirection: 'row'
  },
  datePickerContainer: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
    height: 200
  },
  bottomSpacer: {
    flex: .19
  },
  whiteFont: {
    color: '#FFFFFF',
    fontFamily: 'Verdana',
    fontSize: 15
  }
});

module.exports = fanSignup;
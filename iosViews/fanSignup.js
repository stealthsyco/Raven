/* fanSignup.js 
   Developed by: Kyle Smith - 4/1/16
*/

'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicatorIOS,
  AlertIOS,
  DatePickerIOS,
  CustomActionSheet,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

var DatePickerModal = require('react-native-custom-action-sheet');
var dismissKeyboard = require('../classes/dismissKeyboard');
var validator = require('validator');
var helperFunctions = require('../classes/helperFunctions');

// This is used to convert the date into a string
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
      date: new Date('2005-01-01'),
      showDatePicker: false,
      emailValid: false,
      usernameValid: false,
      firstValid: false,
      lastValid: false,
      passwordValid: false,
      dateValid: false,
      usernameCheckValid: false
    };
  }

  //When the date changes in the date picker, convert the date into a string.
  //Also, update the date as it gets set.
  onDateChange(date){
    this.setState({ date: new Date(date) });
    console.log(date);
    this.setState({ dob: monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear().toString() });
    if(helperFunctions.getAge(date) >= 13)
      this.setState({ dateValid: true });
    else
      this.setState({ dateValid: false });
    console.log(this.state.dateValid);
  }

  /* When the signup button is pressed, this checks to make sure all of the required fields are
     valid. It then makes a POST request to the server.
     **Functionality to move to the next page needs to be added** */
  signPressed(){
    if(this.state.emailValid && this.state.usernameCheckValid && this.state.firstValid && this.state.lastValid && this.state.passwordValid && this.state.dateValid){
      var obj = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'username': this.state.username,
          'password': this.state.password,
          'email': this.state.email,
          'dob': this.state.dob,
          'first': this.state.first,
          'last': this.state.last,

        })
      }

      fetch('http://www.smithcoding.com:8888/api/users', obj)
        .then((response) => response.text())
        .then((responseText) => {
          console.log(responseText);
        })
        .catch((error) => {
          console.warn(error);
        });

      //this.props.navigator.popToTop();

      AlertIOS.alert(
        'Success',
        'You can now log in!',
        [
          {text: 'Let\'s GO!', onPress: this.props.navigator.popToTop()}
        ],
      );

    } else {
      console.log('Username: ' + this.state.usernameCheckValid);
      console.log("Email: " + this.state.emailValid);
      console.log('Date: ' + this.state.dateValid);
      console.log('Password: ' + this.state.passwordValid);
      console.log('First: ' + this.state.firstValid);
      console.log('Last: ' + this.state.lastValid);
    }
  }

  /* Updates the username and checks it against the server to see if it has been created before.
     It also makes sure the length of the username is a minimum of 8. This function uses a callback from the function written in helperFunctions.js. After the function happens, a closure is needed to keep up with the state while the asyncronous function works its magic. self handles this operation. */
  onUsernameChanged(event){
    this.setState({ username: event.nativeEvent.text });
    this.setState({ usernameValid: validator.isLength( event.nativeEvent.text, {min:8})});
    //this is how to handle async function
    if(this.state.usernameValid){
      var self = this;
      helperFunctions.checkUsername(event.nativeEvent.text, function(response){
        if(response == 200) {
          self.setState({ usernameCheckValid: true });
        } else {
          self.setState({ usernameCheckValid: false });
        }
      });

      this.setState({ usernameCheckValid: self.usernameCheckValid });
    }
  }

  // Setter for email changing
  onEmailChanged(event){
    this.setState({ email: event.nativeEvent.text });
    this.setState({ emailValid: validator.isEmail( event.nativeEvent.text )});
  }

  // Setter for first changing
  onFirstChanged(event){
    this.setState({ first: event.nativeEvent.text });
    this.setState({ firstValid: validator.isAlpha( event.nativeEvent.text )});
  }
  // Setter for last changing
  onLastChanged(event){
    this.setState({ last: event.nativeEvent.text });
    this.setState({ lastValid: validator.isAlpha( event.nativeEvent.text )});
  }

  // Setter for password changing. Also makes sure the password is === to repeat and that it is at least 8 characters long.
  onPasswordChanged(event){
    this.setState({ password: event.nativeEvent.text });
    if(event.nativeEvent.text.length > 7 && event.nativeEvent.text == this.state.repeat)
      this.setState({ passwordValid: true });
    else
      this.setState({ passwordValid: false });
  }

  // Setter for repeat password changing. Same story as password
  onRepeatChanged(event){
    this.setState({ repeat: event.nativeEvent.text });
    console.log(event.nativeEvent.text);
    console.log(this.state.password);
    if(event.nativeEvent.text.length > 7 && this.state.password === event.nativeEvent.text)
      this.setState({ passwordValid: true });
    else
      this.setState({ passwordValid: false });
  }

  render() {

    //There is a problem with DatePickerIOS which causes two warnings, but the functionality still works.
    //This problem needs to be fixed by Facebook, but is not hindering progress.
    console.disableYellowBox = true;
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

    //Each of if statements below change the color of the border around their relative fields.
    var usernameField;
    if(this.state.username == '')
      usernameField = styles.defaultField;
    else if(this.state.usernameValid == false || this.state.usernameCheckValid == false){
      usernameField = styles.invalidField;
    } else {
      usernameField = styles.validField;
    }

    var emailField;
    if(this.state.emailValid == false && this.state.email == '')
      emailField = styles.defaultField;
    else if(this.state.emailValid == false){
      console.log(this.state.emailValid);
      emailField = styles.invalidField;
    } else
      emailField = styles.validField;

    var passwordField;
      if(this.state.password == '')
        passwordField = styles.defaultField;
      else if(this.state.password != this.state.repeat || this.state.password.length < 8)
        passwordField = styles.invalidField;
      else if(this.state.password == this.state.repeat && this.state.password.length > 7)
        passwordField = styles.validField;

    var repeatField;
      if(this.state.repeat == '')
        repeatField = styles.defaultField;
      else if(this.state.password != this.state.repeat || this.state.repeat.length < 8)
        repeatField = styles.invalidField;
      else if(this.state.password == this.state.repeat && this.state.repeat.length > 7)
        repeatField = styles.validField;

    return (
      <View style={styles.container}>
        <View style={styles.topSpacer} />

        <View style={styles.inputContainer}>

          <View style={usernameField}> 
              <View style={styles.iconContainer} />
              <TextInput
                style={[styles.textContainer, styles.whiteFont]}
                autoCorrect={false}
                returnKeyType='next'
                autoCapitalize='none'
                placeholder="Username"
                placeholderTextColor="#6F6F6F"
                onChange={this.onUsernameChanged.bind(this)}
                value={this.state.username}/>
          </View>

          <View style={emailField}>
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

          <View style={passwordField}>
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

          <View style={repeatField}>
            <View style={styles.iconContainer} />
              <TextInput
                style={[styles.textContainer, styles.whiteFont]}
                password={true}
                autoCorrect={false}
                autoCapitalize='none'
                placeholder="Repeat Password"
                placeholderTextColor="#6F6F6F"
                value={this.state.repeat}
                onChange={this.onRepeatChanged.bind(this)} />
          </View>

          <View style={styles.defaultField}>
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
    flex: .50,
    backgroundColor: '#1C1C1C',
    marginLeft: 20,
    marginRight: 20
  },
  defaultField: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#1C1C1C',
    backgroundColor: "#2C2C2C",
    flexDirection: 'row'   
  },
  invalidField: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#FF0000',
    backgroundColor: "#2C2C2C",
    flexDirection: 'row'   
  },
  validField: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#00FF00',
    backgroundColor: "#2C2C2C",
    flexDirection: 'row'   
  },
  firstLastField: {
    flex: 1,
  },
  nameContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#1C1C1C',
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
    flex: .85,
    flexDirection: 'row'
  },
  datePickerContainer: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
    height: 200
  },
  bottomSpacer: {
    flex: .25
  },
  whiteFont: {
    color: '#FFFFFF',
    fontFamily: 'Verdana',
    fontSize: 15
  }
});

module.exports = fanSignup;
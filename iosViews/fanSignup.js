/* fanSignup.js
   Developed by: Kyle Smith - 4/1/16
*/

'use strict';

//import PureComponent from 'react-pure-render/mixin';
import Keyboard from 'Keyboard';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicatorIOS,
  AlertIOS,
  DatePickerIOS,
  CustomActionSheet,
  Picker,
  ScrollView,
  Modal,
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

var FanSignup = React.createClass({

  getInitialState(){
    return{
      visibleHeight: Dimensions.get('window').height,
      keyboardSpace: 0,
      showScrollView: View,
      username: '',
      email: '',
      first: '',
      last: '',
      password: '',
      repeat: '',
      carrier: '',
      mobile: '',
      showVerifyForm: false,
      showCarrierPicker: false,
      emailValid: false,
      usernameValid: false,
      firstValid: false,
      lastValid: false,
      passwordValid: false,
      mobileValid: false,
      carrierValid: false,
      usernameCheckValid: false,
    };
  },

  componentWillMount(){
    Keyboard.addListener('keyboardWillShow', (event) => this.keyboardWillShow(event))
    Keyboard.addListener('keyboardWillHide', (event) => this.keyboardWillHide(event))
  },

  keyboardWillShow(event){
    this.setState({ showScrollView: ScrollView })
    this.setState({ keyboardSpace: event.endCoordinates.height })
    //this.setState({ visibleHeight: openKeyboard })
  },

  keyboardWillHide(event){
    this.setState({ showScrollView: View })
    this.setState({ keyboardSpace: 0 })
    //this.setState({ visibleHeight: Dimensions.get('window').height })
  },

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
  },

  /* When the signup button is pressed, this checks to make sure all of the required fields are
     valid. It then makes a POST request to the server.
     **Functionality to move to the next page needs to be added** */
  onSignPressed(){
    this.setState({showVerifyForm: true})
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
  },

  /* Updates the username and checks it against the server to see if it has been created before.
     It also makes sure the length of the username is a minimum of 8. This function uses a callback from the function written in helperFunctions.js. After the function happens, a closure is needed to keep up with the state while the asyncronous function works its magic. self handles this operation. */
  onUsernameChanged(updateUsername){
    this.setState({ username: updateUsername });
    this.setState({ usernameValid: validator.isLength( updateUsername, {min:8})});
    //this is how to handle async function
    if(this.state.usernameValid){
      var self = this;
      helperFunctions.checkUsername(updateUsername, function(response){
        if(response == 200) {
          self.setState({ usernameCheckValid: true });
        } else {
          self.setState({ usernameCheckValid: false });
        }
      });

      this.setState({ usernameCheckValid: self.usernameCheckValid });
    }
  },

  // Setter for email changing
  onEmailChanged(updateEmail){
    this.setState({ email: updateEmail });
    this.setState({ emailValid: validator.isEmail( updateEmail )});
  },

  // Setter for first changing
  onFirstChanged(updateFirst){
    this.setState({ first: updateFirst });
    this.setState({ firstValid: validator.isAlpha( updateFirst )});
  },
  // Setter for last changing
  onLastChanged(updateLast){
    this.setState({ last: updateLast });
    this.setState({ lastValid: validator.isAlpha( updateLast )});
  },

  // Setter for password changing. Also makes sure the password is === to repeat and that it is at least 8 characters long.
  onPasswordChanged(updatePassword){
    this.setState({ password: updatePassword });
    if(updatePassword.length > 7 && updatePassword == this.state.repeat)
      this.setState({ passwordValid: true });
    else
      this.setState({ passwordValid: false });
  },

  // Setter for repeat password changing. Same story as password
  onRepeatChanged(updateRepeat){
    this.setState({ repeat: updateRepeat });
    console.log(updateRepeat);
    console.log(this.state.password);
    if(updateRepeat.length > 7 && this.state.password === updateRepeat)
      this.setState({ passwordValid: true });
    else
      this.setState({ passwordValid: false });
  },

  onMobileChanged(updateMobile){
    this.setState({ mobile: updateMobile });
  },

  render() {

    const keyboardSpacer =  110 - (this.state.keyboardSpace / 3)
    console.log(keyboardSpacer);
    //There is a problem with DatePickerIOS which causes two warnings, but the functionality still works.
    //This problem needs to be fixed by Facebook, but is not hindering progress.
    console.disableYellowBox = true;
    //This type of fuction has two options, one with true and one with false.
    //If it is false, the empty view is called. If it is true, the date picker
    //is shown.
    var showVerifyForm = this.state.showVerifyForm ?
      <View style={styles.verifyTextForm}>
        <Modal>
        {showVerifyForm}
        </Modal>
      </View> : <View />
    var showCarrierPicker = this.state.showCarrierPicker ?
      <DatePickerModal modalVisible={this.state.modalVisible}
        onCancel={() => this.setState({showCarrierPicker:false})}>
        {showCarrierPicker}
        {dismissKeyboard()}
        <View style={styles.datePickerContainer}>
        <Picker
          selectedValue={this.state.carrier}
          onValueChange={(carrier) => this.setState({carrier})}>
          <Picker.Item label="AT&T" value="AT&T" />
          <Picker.Item label="Verizon" value="Verizon" />
          <Picker.Item label="C Spire" value="C Spire" />
          <Picker.Item label="Boost Mobile" value="Boost Mobile" />
          <Picker.Item label="Project Fi" value="Project Fi" />
          <Picker.Item label="T-Mobile" value="T-Mobile" />
          <Picker.Item label="Sprint" value="Sprint" />
          <Picker.Item label="U.S Cellular" value="U.S Cellular" />
          <Picker.Item label="Virgin Mobile" value="Virgin Mobile" />
          <Picker.Item label="Alltel" value="Alltel" />
          <Picker.Item label="Cricket Wireless" value="Cricket Wireless" />
          </Picker>
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

    var changeView = this.state.showScrollView;
    return (
      <View style={styles.container}>
        <Modal
            transparent={true}
            visible={this.state.showVerifyForm}>
            <View style={styles.verifyContainer}>
              <View style={styles.verifyTextForm} />
            </View>
        </Modal>
        <View style={[styles.inputContainer, { paddingTop: keyboardSpacer }]}>
        <ScrollView contentContainerStyle={styles.inputContainer}>
          <View style={usernameField}>
              <View style={styles.iconContainer} />
              <TextInput
                style={[styles.textContainer, styles.whiteFont]}
                autoCorrect={false}
                returnKeyType='next'
                autoCapitalize='none'
                placeholder="Username"
                placeholderTextColor="#6F6F6F"
                value={this.state.username}
                onChangeText={(updateUsername) => this.onUsernameChanged(updateUsername)}
                />
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
                onChangeText={(updateEmail) => this.onEmailChanged(updateEmail)} />
          </View>

          <View style={styles.nameContainer}>
            <View style={styles.iconContainer} />
              <View style={styles.textContainer}>
                <TextInput
                  style={[styles.firstLastField, styles.whiteFont, {paddingLeft:1}]}
                  autoCorrect={false}
                  autoCapitalize='none'
                  placeholder="First"
                  placeholderTextColor="#6F6F6F"
                  value={this.state.first}
                  onChangeText={(updateFirst) => this.onFirstChanged(updateFirst)} />
                <TextInput
                  style={[styles.firstLastField, styles.whiteFont]}
                  autoCorrect={false}
                  autoCapitalize='none'
                  placeholder="Last"
                  placeholderTextColor="#6F6F6F"
                  value={this.state.last}
                  onChangeText={(updateLast) => this.onLastChanged(updateLast)} />
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
                onChangeText={(updatePassword) => this.onPasswordChanged(updatePassword)} />
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
                onChangeText={(updateRepeat) => this.onRepeatChanged(updateRepeat)} />
          </View>

          <View style={styles.nameContainer}>
            <View style={styles.iconContainer} />
              <View style={styles.textContainer}>
                <TextInput
                  style={[styles.firstLastField, styles.whiteFont]}
                  keyboardType='numeric'
                  placeholder="Mobile Number"
                  placeholderTextColor="#6F6F6F"
                  maxLength={10}
                  value={this.state.mobile}
                  onChangeText={(updateMobile) => this.onMobileChanged(updateMobile)} />
              </View>
          </View>

          <View style={styles.defaultField}>
            <View style={styles.iconContainer} />
            <TouchableOpacity
              style={styles.textContainer}
              onPress={() => this.setState({showCarrierPicker:true})}>
              <Text style={[styles.whiteFont, {textAlign: 'center'}]}>{this.state.carrier}</Text>
              </TouchableOpacity>
            {showCarrierPicker}
          </View>

          <TouchableHighlight
            onPress={() => this.onSignPressed()}
            style={styles.signButton}>
            <Text style={styles.whiteFont}>SIGN UP</Text>
          </TouchableHighlight>

        </ScrollView>
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
  topSpacer: {
    flex: .20
  },
  inputContainer: {
    flex: 3,
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
  bottomSpacer: {
    flex: 1
  },
  whiteFont: {
    color: '#FFFFFF',
    fontFamily: 'Verdana',
    fontSize: 15
  },
  verifyContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyTextForm: {
    backgroundColor: 'white',
    height: 300,
    width: 330
  }
});

module.exports = FanSignup;

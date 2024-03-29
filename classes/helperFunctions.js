import GLOBAL from '../Globals.js'

(function (global, factory) {
      typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
      typeof define === 'function' && define.amd ? define(factory) :
      (global.validator = factory());
}(this, function () { 'use strict';

	function getAge(birthDateString) {
	    var today = new Date();
	    var birthDate = new Date(birthDateString);
	    var age = today.getFullYear() - birthDate.getFullYear();
	    var m = today.getMonth() - birthDate.getMonth();
	    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
	        age--;
	    }
	    return age;
	}


	//this is a future, and it returns a promise
	//when using this type of function, do not try to return data, rather return your response
	function checkUsername(username, callback){
	  	var res;

		fetch('http://' + GLOBAL.DATABASE + ':8888/api/checkUser/' + username)
			//this sends back the response code
		.then((response) => {
			console.log('Fetch - Logging Response Status: ' + response.status);
			callback(response.status);
		})
		.catch((error) => {
		  console.warn(error);
		});
	}

	// This future will check to see if the login credentials are valid
	function checkLogin(username, password, callback){

		fetch('http://' + GLOBAL.DATABASE + ':8888/api/authenticate/' + username + '/' + password)
		.then((response) => response.json())
		.then((responseData) => {
			console.log(responseData);
			callback(responseData);
		})
		// .then((response) => {
		// 	callback(response);
		// })
		// .then(responseData) => {
		// 	console.log(responseData.json);
		// 	callback(responseData);
		// })
		.catch((error) => {
			console.warn(error);
		});
	}

  function mobileResponse(mobile, carrier, callback){
    fetch('http://' + GLOBAL.DATABASE + ':8888/api/checkPhone/' + mobile + '/' + carrier)
    .then((response) => response.json())
		.then((responseData) => {
			console.log(responseData);
			callback(responseData);
		})
		// .then((response) => {
		// 	callback(response);
		// })
		// .then(responseData) => {
		// 	console.log(responseData.json);
		// 	callback(responseData);
		// })
		.catch((error) => {
			console.warn(error);
		});
  }

	var helperFunctions = {
		getAge: getAge,
		checkUsername: checkUsername,
		checkLogin: checkLogin,
    mobileResponse: mobileResponse
	};

	return helperFunctions;

}));

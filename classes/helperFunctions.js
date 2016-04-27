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

	function checkUsername(username, callback){
	  	var res;

		fetch('http://www.smithcoding.com:8888/api/checkUser/' + username)
			//this sends back the response code
		.then((response) => {
			console.log('Fetch - Logging Response Status: ' + response.status);
			callback(response.status);
		})
		.catch((error) => {
		  console.warn(error);
		});
	}

	var helperFunctions = {
		getAge: getAge,
		checkUsername: checkUsername
	};

	return helperFunctions;

}));

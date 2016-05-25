'use strict';

var angular = require('angular');

/**
 * @ngInject
 * @author Craig McMurray
 * @constructor
 * @desc AngularJS Controller for the Portfolio Page
 * @param {Object} $sce: The AngularJS $sce (Sanitize) Service
 * @param {Object} $timeout: The AngularJS $timeout (Timeout) Service
 * @param {Object} ContactService: The Contact Me message Service
 * @type {Function}
 */
function ContactController($sce, $timeout, ContactService) {
	/**
	 * @desc The ViewModel Object.  Grab a reference to this to represent the ViewModel and to prevent scope bleeding and capture context.
	 * @public
	 * @type {ContactController}
	 */
	var vm = this;

	vm.blankMessage = {
		name : '',
		email : '',
		comment : ''
	};

	//function to submit the form after all validation has occurred
	vm.resetForm = function() {
		vm.message = angular.copy(vm.blankMessage);
		vm.contactfrm.$setPristine();
		vm.contactfrm.$setUntouched();
		vm.contactErrorText = null;
		$timeout(function() {
			vm.contactSuccessText = null;
		}, 15000);
	};

	//Finish button pressed
	vm.sendMessage = function() {
		//Get promise for sending the Message
		ContactService.sendMessage(vm.message).then(function(response) {
			//console.log(response);
			//Request successful, set the text
			vm.contactSuccessText = $sce.trustAsHtml(response);
			//Reset the form
			vm.resetForm();
			//console.log(response);
		}, function(reason) {
			//Request failed, set the text
			vm.contactErrorText = $sce.trustAsHtml(reason);
			//console.log(reason);
		});
	};
}

//Declare the Controller
require('./_index').controller('ContactController', ContactController);
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
	 * @desc The ViewModel Object.  Grab a reference to this to represent the ViewModel and to prevent scope bleeding.
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
		vm.contactErrorText = null;
		$timeout(function() {
			vm.contactSuccessText = null;
		}, 15000);
	};

	//Finish button pressed
	vm.sendMessage = function() {
		console.log('contactfrm has been submitted');
		//Get promise for sending the Message
		ContactService.sendMessage(vm.message).then(function(response) {
			console.log('contactfrm message success');
			//console.log(response);
			//Request successful, set the text
			vm.contactSuccessText = $sce.trustAsHtml(response);
			//Reset the form
			vm.resetForm();
		}, function(err) {
			console.log('contactfrm message failure');
			//Request failed, set the text
			vm.contactErrorText = $sce.trustAsHtml(err);
		});
	};

}

//Declare the Controller
require('./_index').controller('ContactController', ContactController);
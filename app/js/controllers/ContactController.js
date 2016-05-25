'use strict';

var angular = require('angular');

/**
 * @desc AngularJS Controller for the Portfolio Page
 *
 * @ngInject
 * @author Craig McMurray
 * @constructor
 * @param {Object} $sce - The AngularJS {@link $sce} Sanitize Service
 * @param {Object} $timeout - The AngularJS {@link $timeout} Timeout Service
 * @param {Object} ContactFactory - The {@link ContactFactory} Contact Factory
 * @type {Function}
 */
function ContactController($sce, $timeout, ContactFactory) {
	/**
	 * @desc The ViewModel Object.  Grab a reference to this to represent the ViewModel and to prevent scope bleeding and capture context.
	 *
	 * @public
	 * @type {ContactController}
	 */
	var vm = this;

	/**
	 * @desc Default model for Contact Message
	 *
	 * @type {{name: string, email: string, comment: string}}
	 */
	vm.blankMessage = {
		'name': '',
		'email': '',
		'comment': ''
	};

	/**
	 * @desc Function exposed to the ViewModel
	 *
	 * @type {resetForm}
	 */
	vm.resetForm = resetForm;

	/**
	 * @desc Function exposed to the ViewModel
	 *
	 * @type {sendMessage}
	 */
	vm.sendMessage = sendMessage;

	//******************** FUNCTION DECLARATIONS ********************//
	/**
	 * @desc Function to reset the form after the reset button was clicked or successful form submit
	 *
	 * @type {Function}
	 */
	function resetForm() {
		//Copy the blank Message model
		vm.message = angular.copy(vm.blankMessage);

		//Set the Form to Pristine
		vm.contactfrm.$setPristine();

		//Set the form to Untouched
		vm.contactfrm.$setUntouched();

		//Clear the error text
		vm.contactErrorText = null;

		//Set a 15s timeout before clearing the success text
		$timeout(function() {
			vm.contactSuccessText = null;
		}, 15000);
	}

	/**
	 * @desc Function to submit the form after all validation has occurred
	 *
	 * @type {Function}
	 */
	function sendMessage() {
		//Get promise for sending the Message
		ContactFactory.sendMessage(vm.message).then(function(response) {
			//Request successful, set the text
			vm.contactSuccessText = $sce.trustAsHtml(response);

			//Reset the form
			vm.resetForm();
		}, function(reason) {
			//Request failed, set the text
			vm.contactErrorText = $sce.trustAsHtml(reason);
		});
	}
}

//Declare the Controller
require('./_index').controller('ContactController', ContactController);

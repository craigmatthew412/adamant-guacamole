'use strict';

/**
 * @desc AngularJS Factory Recipe Class for Contact Messages, meaning this Class is a singleton.
 *
 * @ngInject
 * @author Craig McMurray
 * @constructor
 * @param {Object} $http - The AngularJS {@link $http} HTTP Service
 * @param {Object} $log - The AngularJS {@link $log} Logging Service
 * @param {Object} $q - The AngularJS {@link $q} Promise Service
 * @type {Function}
 */
function ContactFactory($http, $log, $q) {
	/**
	 * @desc Object to be returned by the Factory singleton
	 *
	 * @type {Object}
	 */
	var factory = {
		'sendMessage': sendMessage
	};

	//Return the Object
	return factory;

	//******************** FUNCTION DECLARATIONS ********************//

	/**
	 * @desc Accepts the Contact Form model and submits the form fields to a PHP script which does a round of server-side
	 * validations and uses the PHP mail function to actually send the email.
	 *
	 * @param {Object} model - The model from the Contact Form
	 * @returns {*}
	 * @type {Function}
	 */
	function sendMessage(model) {
		$log.debug('contactfrm message is about to be sent: ', model);

		//Get the deferred object
		var deferred = $q.defer();

		//Create the parameters
		var formData = $.param({
			'name': model.name,
			'email': model.email,
			'comment': model.comment
		});

		//Make the HTTP Request
		$http({
			'method': 'POST',
			'url': 'php/contact-form-handler.php',
			'data': formData,
			'headers': {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(function resolved(response) {
			$log.debug('contactfrm message success! response: ', response);

			//Resolve the deferred
			deferred.resolve(response.data);
		}, function rejected(reason) {
			$log.error('contactfrm message rejected! reason: ', reason);

			//The failure reason text
			var reasonText = '';

			//Check to see if failure was generated inside PHP script
			if (reason.data && reason.data.indexOf('php-error') > -1) {
				reasonText = reason.data;
			}
			else {
				reasonText = '<i class="fa fa-warning"></i>&nbsp;I\'m sorry, there was a server problem while submitting your message.  Please try back again later!';
			}

			//Reject the deferred
			deferred.reject(reasonText);
		});

		//Return the promise
		return deferred.promise;
	}
}

require('./_index.js').service('ContactFactory', ContactFactory);

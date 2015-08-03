'use strict';

/**
 * @ngInject
 * @author Craig McMurray
 * @constructor
 * @desc AngularJS Service Recipe Class for Contact Me messages, meaning this Class is a singleton.
 * @param {Object} $http: The AngularJS $http (HTTP) Service
 * @param {Object} $q: The AngularJS $q (Promise) Service
 * @type {Function}
 */
function ContactService($http, $q) {
	this.sendMessage = function(model) {
		console.log('contactfrm message is about to be sent');
		console.log(model);
		//Get the deferred object
		var deferred = $q.defer();
		//Create the parameters
		var form_data = $.param({name: model.name, email: model.email, comment: model.comment});

		//Make the HTTP Request
		$http({
			method: 'POST',
			url: 'php/contact-form-handler.php',
			data: form_data,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(function(data, status, headers) {
			console.log('contactfrm message resolved!');
			//console.log(data);
			console.log(status);
			console.log(headers);
			//Resolve the deferred
			deferred.resolve(data);
		}).error(function(reason) {
			console.log('contactfrm message rejected!');
			//Reject the deferred
			deferred.reject(reason);
		});

		//Return the promise
		return deferred.promise;
	};
}

require('./_index.js').service('ContactService', ContactService);
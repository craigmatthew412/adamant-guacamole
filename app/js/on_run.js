'use strict';

/**
 * @desc The 'Run' Phase of the AngularJS Application Lifecycle.
 *
 * @ngInject
 * @author Craig McMurray
 * @constructor
 * @type {Function}
 */
function OnRun($rootScope, AppSettings) {
	//Set the Application Settings on the View
	$rootScope.AppSettings = AppSettings;
}

module.exports = OnRun;

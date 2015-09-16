'use strict';

/**
 * @ngInject
 */
function OnRun($rootScope, AppSettings) {
	//Set the Page Title
	$rootScope.pageTitle = AppSettings.appTitle;
}

module.exports = OnRun;
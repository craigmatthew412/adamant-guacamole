/*global Modernizr*/
'use strict';

/**
 * @ngInject
 * @author Craig McMurray
 * @constructor
 * @desc AngularJS Controller for the FAB Menu
 * @type {Function}
 */
function MenuController() {
	/**
	 * @desc The ViewModel Object.  Grab a reference to this to represent the ViewModel and to prevent scope bleeding and capture context.
	 * @public
	 * @type {MenuController}
	 */
	var vm = this;

	/**
	 * @desc String that represents the default Class name for FAB placement
	 * @type {String}
	 */
	vm.placement = 'md-fab-bottom-left';

	/**
	 * @desc String that represents the default direction of the FAB Actions
	 * @type {String}
	 */
	vm.direction = 'up';

	/**
	 * @desc String that represents the default style of the FAB.  Can be either 'md-fling' or 'md-scale'
	 * @type {String}
	 */
	vm.style = 'md-scale';

	/**
	 * @desc Boolean that keeps track of the open state of the FAB.  It is closed by default.
	 * @type {Boolean}
	 */
	vm.isOpen = false;

	//Check viewport size
	if (Modernizr.mq('only all and (min-width: 1025px)')) {
		//We are on desktop, change the properties
		vm.placement = 'md-fab-top-left';
		vm.direction = 'down';
	}
}

//Declare the Controller
require('./_index').controller('MenuController', MenuController);
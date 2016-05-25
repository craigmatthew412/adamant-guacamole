'use strict';

//AngularJS Module
var angular = require('angular');

/**
 * @desc <welcome-text-directive> Directive
 *
 * @ngInject
 * @author Craig McMurray
 * @constructor
 * @param {Object} $window - The AngularJS Window Service
 * @type {Function}
 */
function welcomeTextDirective($window) {
	/**
	 * @desc AngularJS Directive (Post)Link Function. This standalone link function outside of compile is executed as a Post-Link Function.
	 * @param {Object} $scope - Current Scope
	 * @param {Element} element - Current HTML Element wrapped in jqLite
	 * @type {Function}
	 */
	function link($scope, element) {
		/**
		 * @desc $window DOM Element wrapped in jqLite
		 * @type {Object}
		 */
		var window = angular.element($window);

		/**
		 * @desc Listener for the Window Height and Width. Note the 'true' to denote we compare the returned Object's reference
		 *
		 * @type {Function}
		 */
		$scope.$watch(watchFunction, callbackFunction, true);

		/**
		 * @desc Binds the 'resize' Event to the Window Element
		 *
		 * @type {Function}
		 */
		window.on('resize', resizeFunction);

		//******************** FUNCTION DECLARATIONS ********************//

		/**
		 * @desc Called when the Window height or width change.  It takes the new Window height
		 * and subtracts the target/static Element height from it to get the new current
		 * Element's height.  After the new height is calculated, it sets it.
		 *
		 * @param {Object} newWindow - The new Object with height and width properties on it
		 * @type {Function}
		 */
		function callbackFunction(newWindow) {
			//New Element top padding = new Window height minus Element height divided by 2 (half of remaining pixels)
			var newPaddingTop = (newWindow.height - element.height()) / 2;

			//Set the new top padding on the Element
			element.css('padding-top', newPaddingTop);
		}

		/**
		 * @desc
		 *
		 * @type {Function}
		 */
		function resizeFunction() {
			//Kick off the digest cycle to pick up the changes
			$scope.$apply();
		}

		/**
		 * @desc Returns the Window Height and Width as {height: *, width: *}
		 *
		 * @returns {{height: *, width: *}}
		 * @type {Function}
		 */
		function watchFunction() {
			//Return as an Object
			return {
				'height': window.height(),
				'width': window.width()
			};
		}
	}

	//Direct Definition Object (DDO) style declaration
	return {
		'restrict': 'A',
		'templateUrl': 'tpls/Welcome.Text.Tpl.html',
		'link': link
	};
}

//Define the Directive with the DDO
require('./_index.js').directive('welcomeTextDirective', welcomeTextDirective);

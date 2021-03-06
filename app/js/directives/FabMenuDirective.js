'use strict';

/**
 * @desc <fab-menu> Directive
 *
 * @ngInject
 * @author Craig McMurray
 * @constructor
 * @type {Function}
 */
function FabMenuDirective() {
	//Direct Definition Object (DDO) style declaration
	return {
		'restrict': 'E',
		'replace': true,
		'templateUrl': 'tpls/Fab.Menu.Tpl.html',
		'controller': 'MenuController',
		'controllerAs': 'menu'
	};
}

//Define the Directive with the DDO
require('./_index.js').directive('fabMenu', FabMenuDirective);

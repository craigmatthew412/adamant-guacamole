'use strict';

/**
 * @ngInject
 * @author Craig McMurray
 * @constructor
 * @desc AngularJS Controller for the Portfolio Page
 * @type {Function}
 */
function ResumeController() {
	/**
	 * @desc The ViewModel Object.  Grab a reference to this to represent the ViewModel and to prevent scope bleeding and capture context.
	 * @public
	 * @type {ResumeController}
	 */
	var vm = this;

	/**
	 * @desc Doughnut Chart Options.  It contains both Default options and Extended options.
	 * @public
	 * @type {Object}
	 */
	vm.doughnutOptions = {
		defaultDoughnutOptions: {
			segmentShowStroke: false,
			percentageInnerCutout: 60,
			animationSteps: 100
		},
		extendedDoughnutOptions: {
			segmentPositiveColor: '#333333',
			segmentNegativeColor: '#eee'
		}
	};

	/**
	 * @desc Doughnut Chart Data.  It contains the data for all of the Doughnut Charts to render.
	 * @public
	 * @type {Object}
	 */
	vm.doughnutData = {
		problemSolving: [{
			value: 90,
			color: vm.doughnutOptions.extendedDoughnutOptions.segmentPositiveColor
		}, {
			value: 10,
			color: vm.doughnutOptions.extendedDoughnutOptions.segmentNegativeColor
		}],
		communication: [{
			value: 90,
			color: vm.doughnutOptions.extendedDoughnutOptions.segmentPositiveColor
		}, {
			value: 10,
			color: vm.doughnutOptions.extendedDoughnutOptions.segmentNegativeColor
		}],
		uiFrameworks: [{
			value: 75,
			color: vm.doughnutOptions.extendedDoughnutOptions.segmentPositiveColor
		}, {
			value: 25,
			color: vm.doughnutOptions.extendedDoughnutOptions.segmentNegativeColor
		}],
		springSource: [{
			value: 75,
			color: vm.doughnutOptions.extendedDoughnutOptions.segmentPositiveColor
		}, {
			value: 25,
			color: vm.doughnutOptions.extendedDoughnutOptions.segmentNegativeColor
		}],
		javaEE: [{
			value: 75,
			color: vm.doughnutOptions.extendedDoughnutOptions.segmentPositiveColor
		}, {
			value: 25,
			color: vm.doughnutOptions.extendedDoughnutOptions.segmentNegativeColor
		}],
		javaScript: [{
			value: 75,
			color: vm.doughnutOptions.extendedDoughnutOptions.segmentPositiveColor
		}, {
			value: 25,
			color: vm.doughnutOptions.extendedDoughnutOptions.segmentNegativeColor
		}],
		relationalDatabases: [{
			value: 75,
			color: vm.doughnutOptions.extendedDoughnutOptions.segmentPositiveColor
		}, {
			value: 25,
			color: vm.doughnutOptions.extendedDoughnutOptions.segmentNegativeColor
		}],
		webServices: [{
			value: 85,
			color: vm.doughnutOptions.extendedDoughnutOptions.segmentPositiveColor
		}, {
			value: 15,
			color: vm.doughnutOptions.extendedDoughnutOptions.segmentNegativeColor
		}],
		nodeJS: [{
			value: 65,
			color: vm.doughnutOptions.extendedDoughnutOptions.segmentPositiveColor
		}, {
			value: 35,
			color: vm.doughnutOptions.extendedDoughnutOptions.segmentNegativeColor
		}],
		noSQL: [{
			value: 65,
			color: vm.doughnutOptions.extendedDoughnutOptions.segmentPositiveColor
		}, {
			value: 35,
			color: vm.doughnutOptions.extendedDoughnutOptions.segmentNegativeColor
		}],
		css: [{
			value: 85,
			color: vm.doughnutOptions.extendedDoughnutOptions.segmentPositiveColor
		}, {
			value: 15,
			color: vm.doughnutOptions.extendedDoughnutOptions.segmentNegativeColor
		}],
		responsiveWebDesign: [{
			value: 85,
			color: vm.doughnutOptions.extendedDoughnutOptions.segmentPositiveColor
		}, {
			value: 15,
			color: vm.doughnutOptions.extendedDoughnutOptions.segmentNegativeColor
		}],
		userExperience: [{
			value: 75,
			color: vm.doughnutOptions.extendedDoughnutOptions.segmentPositiveColor
		}, {
			value: 25,
			color: vm.doughnutOptions.extendedDoughnutOptions.segmentNegativeColor
		}]
	};
}

//Declare the Controller
require('./_index').controller('ResumeController', ResumeController);

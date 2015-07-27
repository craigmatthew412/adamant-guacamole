! function(e, t, o, n, a, r, s) {
	e.GoogleAnalyticsObject = a, e[a] = e[a] || function() {
			(e[a].q = e[a].q || []).push(arguments)
		}, e[a].l = 1 * new Date, r = t.createElement(o), s = t.getElementsByTagName(o)[0], r.async = 1, r.src = n, s.parentNode.insertBefore(r, s)
}(window, document, "script", "//www.google-analytics.com/analytics.js", "ga"),
	ga("create", "UA-47179679-1", "auto", {
		allowLinker: !0
	}),
	ga("require", "linkid", "linkid.js"),
	ga("require", "displayfeatures"),
	ga("require", "linker"),
	ga("linker:autoLink", ["craigmcmurray.com"]),
	ga("send", "pageview"),
$(document).ready(function() {
	//Window height minus Navigation height
	var header = $('#section-topbar');
	var welcomeText = $('.welcome-text');
	var starter = $(window).height() - header.height();
	//set scroll listener
	$(window).scroll(function() {
		//Get initial scroll position
		var $windowScrollPosition = $(window).scrollTop();
		//Show the Navigation
		if (Math.ceil($windowScrollPosition) >= starter) {
			header.css({
				'opacity': 1,
				'transform':' scaleY(1)'
			});
		}
		//Hide the Navigation
		else if($windowScrollPosition <= 100 ) {
			header.css({
				'opacity': 0,
				'transform':' scaleY(0)'
			});
		}
	});
	//Function to set Welcome Text style(s)
	var setWelcomeText = function() {
		//Get remaining height
		var leftoverHeight = $(window).height() - welcomeText.height();
		//Split the difference
		var welcomeTextPadding = leftoverHeight / 2;
		//Set the padding
		welcomeText.css({
			'padding-top': welcomeTextPadding
		});
	};
	//Set initial value
	setWelcomeText();
	//Set resize listener
	$(window).resize(function() {
		setWelcomeText();
	});
	smoothScroll.init({
		speed: 1e3,
		easing: "easeInOutQuad",
		updateURL: !1,
		offset: 50,
		callbackBefore: function() {},
		callbackAfter: function() {}
	});
	$("#contact-form").validate({
		focusInvalid: !1,
		errorContainer: ".form_notification",
		errorLabelContainer: ".form_notification",
		errorElement: "span",
		rules: {
			name: {
				required: !0,
				minlength: 5
			},
			email: {
				required: !0,
				email: !0
			},
			message: {
				minlength: 15,
				required: !0
			}
		},
		messages: {
			name: {
				required: '<div class="alert alert-danger alert-block"><i class="fa fa-exclamation-triangle"></i>&nbsp; <button type="button" class="close" data-dismiss="alert">&times;</button>Please enter your <strong>name</strong>.</div>',
				minlength: '<div class="alert alert-danger alert-block"><i class="fa fa-exclamation-triangle"></i>&nbsp; <button type="button" class="close" data-dismiss="alert">&times;</button>Your name should have <strong>at least {0} characters</strong>.</div>'
			},
			email: {
				required: '<div class="alert alert-danger alert-block"><i class="fa fa-exclamation-triangle"></i>&nbsp; <button type="button" class="close" data-dismiss="alert">&times;</button>Please enter your <strong>email address</strong>.</div>',
				email: '<div class="alert alert-danger alert-block"><i class="fa fa-exclamation-triangle"></i>&nbsp; <button type="button" class="close" data-dismiss="alert">&times;</button>Please enter a valid <strong>email address</strong>.</div>'
			},
			message: {
				required: '<div class="alert alert-danger alert-block"><i class="fa fa-exclamation-triangle"></i>&nbsp; <button type="button" class="close" data-dismiss="alert">&times;</button>Please enter your <strong>message</strong>.</div>',
				minlength: '<div class="alert alert-danger alert-block"><i class="fa fa-exclamation-triangle"></i>&nbsp; <button type="button" class="close" data-dismiss="alert">&times;</button>Your message should have <strong>at least {0} characters</strong>.</div>'
			}
		},
		submitHandler: function(e) {
			return formObj = $("#" + e.id), $.ajax({
				type: "POST",
				data: formObj.serialize(),
				url: "php/contact.php",
				success: function() {
					$(".form_notification").append('<div class="alert alert-success"><i class="fa fa-share"></i>&nbsp; <button type="button" class="close" data-dismiss="alert">&times;</button> Your message has been sent. <strong>Thank you!</strong></div>'), $(".form_notification").show("slow"), $("#contact-form").clearForm()
				}
			}), !1
		}
	}),
	function(e) {
		e.fn.clearForm = function() {
			return this.each(function() {
				var t = this.type,
					o = this.tagName.toLowerCase(),
					n = this.name;
				return "form" == o ? e(":input", this).clearForm() : void("text" == t || "password" == t || "email" == t || "textarea" == o ? this.value = "" : "checkbox" == t || "radio" == t ? this.checked = !1 : "select" == o ? this.selectedIndex = -1 : "id" == n && (this.value = ""))
			})
		}
	}(jQuery)
});

var segmentShowStroke = !1,
	segmentStrokeColor = "#2f2f2f",
	percentageInnerCutout = 60,
	problemSolvingData = [{
		value: 90,
		color: "#003366"
	}, {
		value: 10,
		color: "#d4dde6"
	}],
	problemSolvingOptions = {
		segmentShowStroke: segmentShowStroke,
		segmentStrokeColor: segmentStrokeColor,
		percentageInnerCutout: percentageInnerCutout
	},
	problemSolvingDoughnut = new Chart(document.getElementById("problemsolving").getContext("2d")).Doughnut(problemSolvingData, problemSolvingOptions),
	communicationData = [{
		value: 90,
		color: "#003366"
	}, {
		value: 10,
		color: "#d4dde6"
	}],
	communicationOptions = {
		segmentShowStroke: segmentShowStroke,
		segmentStrokeColor: segmentStrokeColor,
		percentageInnerCutout: percentageInnerCutout
	},
	communicationDoughnut = new Chart(document.getElementById("communication").getContext("2d")).Doughnut(communicationData, communicationOptions),
	uiFrameworksData = [{
		value: 75,
		color: "#003366"
	}, {
		value: 25,
		color: "#d4dde6"
	}],
	uiFrameworksOptions = {
		segmentShowStroke: segmentShowStroke,
		segmentStrokeColor: segmentStrokeColor,
		percentageInnerCutout: percentageInnerCutout
	},
	uiFrameworksDoughnut = new Chart(document.getElementById("uiframeworks").getContext("2d")).Doughnut(uiFrameworksData, uiFrameworksOptions),
	springData = [{
		value: 75,
		color: "#003366"
	}, {
		value: 25,
		color: "#d4dde6"
	}],
	springOptions = {
		segmentShowStroke: segmentShowStroke,
		segmentStrokeColor: segmentStrokeColor,
		percentageInnerCutout: percentageInnerCutout
	},
	springDoughnut = new Chart(document.getElementById("spring").getContext("2d")).Doughnut(springData, springOptions),
	j2eeData = [{
		value: 75,
		color: "#003366"
	}, {
		value: 25,
		color: "#d4dde6"
	}],
	j2eeOptions = {
		segmentShowStroke: segmentShowStroke,
		segmentStrokeColor: segmentStrokeColor,
		percentageInnerCutout: percentageInnerCutout
	},
	j2eeDoughnut = new Chart(document.getElementById("j2ee").getContext("2d")).Doughnut(j2eeData, j2eeOptions),
	javascriptData = [{
		value: 75,
		color: "#003366"
	}, {
		value: 25,
		color: "#d4dde6"
	}],
	javascriptOptions = {
		segmentShowStroke: segmentShowStroke,
		segmentStrokeColor: segmentStrokeColor,
		percentageInnerCutout: percentageInnerCutout
	},
	javascriptDoughnut = new Chart(document.getElementById("javascript").getContext("2d")).Doughnut(javascriptData, javascriptOptions),
	relationaldbData = [{
		value: 75,
		color: "#003366"
	}, {
		value: 25,
		color: "#d4dde6"
	}],
	relationaldbOptions = {
		segmentShowStroke: segmentShowStroke,
		segmentStrokeColor: segmentStrokeColor,
		percentageInnerCutout: percentageInnerCutout
	},
	relationaldbDoughnut = new Chart(document.getElementById("relationaldb").getContext("2d")).Doughnut(relationaldbData, relationaldbOptions),
	webservicesData = [{
		value: 85,
		color: "#003366"
	}, {
		value: 15,
		color: "#d4dde6"
	}],
	webservicesOptions = {
		segmentShowStroke: segmentShowStroke,
		segmentStrokeColor: segmentStrokeColor,
		percentageInnerCutout: percentageInnerCutout
	},
	webservicesDoughnut = new Chart(document.getElementById("webservices").getContext("2d")).Doughnut(webservicesData, webservicesOptions),
	nosqlData = [{
		value: 65,
		color: "#003366"
	}, {
		value: 35,
		color: "#d4dde6"
	}],
	nosqlOptions = {
		segmentShowStroke: segmentShowStroke,
		segmentStrokeColor: segmentStrokeColor,
		percentageInnerCutout: percentageInnerCutout
	},
	nosqlDoughnut = new Chart(document.getElementById("nosql").getContext("2d")).Doughnut(nosqlData, nosqlOptions),
	cssData = [{
		value: 85,
		color: "#003366"
	}, {
		value: 15,
		color: "#d4dde6"
	}],
	cssOptions = {
		segmentShowStroke: segmentShowStroke,
		segmentStrokeColor: segmentStrokeColor,
		percentageInnerCutout: percentageInnerCutout
	},
	cssDoughnut = new Chart(document.getElementById("css").getContext("2d")).Doughnut(cssData, cssOptions),
	mobileData = [{
		value: 85,
		color: "#003366"
	}, {
		value: 15,
		color: "#d4dde6"
	}],
	mobileOptions = {
		segmentShowStroke: segmentShowStroke,
		segmentStrokeColor: segmentStrokeColor,
		percentageInnerCutout: percentageInnerCutout
	},
	mobileDoughnut = new Chart(document.getElementById("mobile").getContext("2d")).Doughnut(mobileData, mobileOptions),
	uxData = [{
		value: 85,
		color: "#003366"
	}, {
		value: 15,
		color: "#d4dde6"
	}],
	uxOptions = {
		segmentShowStroke: segmentShowStroke,
		segmentStrokeColor: segmentStrokeColor,
		percentageInnerCutout: percentageInnerCutout
	},
	uxDoughnut = new Chart(document.getElementById("ux").getContext("2d")).Doughnut(uxData, uxOptions);
import $ from "jquery";
$(document).ready(function () {
	backgroundHeader();
	$(window).on('scroll', backgroundHeader);
	function backgroundHeader() {
		if ($(window).scrollTop() > 0) {
			$('.header').addClass('scroll');
		} else {
			$('.header').removeClass('scroll');
		}
		if (($(window).scrollTop()) >= $('.main-banner').outerHeight()) {
			$('.header').addClass('black');
		} else {
			$('.header').removeClass('black');
		}
	}
})

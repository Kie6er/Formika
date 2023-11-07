import $ from "jquery";
$(document).ready(function () {

	$(window).on('scroll', function () {
		headerScroll();
	})

	$(window).on('resize', function () {
		if (window.outerWidth >= 768) {
			$('body').removeClass('lock');
			$('.burger-btn').removeClass('active');
			$('.burger-menu').removeClass('active');
		}
		headerScroll();
	})

	$('.burger-btn').on('click', function () {
		if (($(window).scrollTop()) >= $('.banner-back').outerHeight()) {
			openBurgerMenu();
		} else {
			if (!$('.burger-btn').hasClass('active')) {
				$('body').addClass('lock');
				$('.burger-btn').addClass('active');
				$('.burger-menu').addClass('active');

				$('.header').addClass('black');
			} else {
				$('body').removeClass('lock');
				$('.burger-btn').removeClass('active');
				$('.burger-menu').removeClass('active');

				setTimeout(function () {
					$('.header').removeClass('black');
				}, 600)
			}
		}
	})

	function headerScroll() {
		if ($(window).scrollTop() > 0) {
			$('.header').addClass('scroll');
		} else {
			$('.header').removeClass('scroll');
		}

		if (($(window).scrollTop()) >= $('.banner-back').outerHeight()) {
			$('.header').addClass('black');
		} else {
			$('.header').removeClass('black');
			if ($('.burger-btn').hasClass('active')) {
				$('.header').addClass('black');
			}
		}
	}

	function openBurgerMenu() {
		if (!$('.burger-btn').hasClass('active')) {
			$('body').addClass('lock');
			$('.burger-btn').addClass('active');
			$('.burger-menu').addClass('active');
		} else {
			$('body').removeClass('lock');
			$('.burger-btn').removeClass('active');
			$('.burger-menu').removeClass('active');
		}
	}
})

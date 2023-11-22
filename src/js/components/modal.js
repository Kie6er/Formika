import $ from "jquery";
$(document).ready(function () {
	$(`[data-modal="request"]`).on('click', function () {
		$('.request-modal').addClass('active');
	})

	$(document).on('keyup', (evt) => {
		evt.keyCode === 27 ? closeModal() : null;
	})

	$('[data-modal]').on('click', () => {
		$('body').addClass('lock');
		setTimeout(() => {
			$(".modal-wrapper").css("opacity", "1");
			$(".modal-back").css("opacity", "1");
		}, 0);
	})

	$('.modal-back').on('click', closeModal);
	$('.modal-exit').on('click', closeModal);
	$('.request-modal__btn').on('click', closeModal);

	function closeModal() {
		$('body').removeClass('lock');
		$(".modal-wrapper").css("opacity", "0");
		$(".modal-back").css("opacity", "0");
		setTimeout(() => {
			$(".modal").removeClass("active");
			$('.modal').find('.modal-content--first').addClass('active');
			$('.modal').find('.modal-content--second').removeClass('active');
		}, 390);
	}
})
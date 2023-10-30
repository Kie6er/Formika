import $ from "jquery";

$(document).ready(function () {
	$('.form').on('submit', (evt) => {
		evt.preventDefault();
		if (validationForm($(evt.currentTarget)) === true) {

			// if ($('.modal').hasClass('active')) {
			// 	switchModalContent()
			// } else {
			// 	$('.modal').addClass('active');
			// 	$('body').addClass('lock');
			// 	switchModalContent()
			// }

			$(evt.currentTarget).find('input').val('');
			$(evt.currentTarget).find('textarea').val('');
		};
	});

	function validationForm(form) {
		let result = true;

		form.find('input').each(function (index, element) {
			removeError($(element));

			if ($(element).data('minLength')) {
				if ($(element).val().length < 18) {
					removeError($(element));
					createError($(element), `*enter numbers`)
					result = false;
				}
			}

			if ($(element).data('required')) {
				if ($(element).val().length == 0) {
					removeError($(element));
					createError($(element), '*Fill in the field')
					result = false;
				}
			}
		});

		function removeError(input) {
			const parent = input.parent();
			if (parent.hasClass('error')) {
				parent.find('.error-text').remove();
				parent.removeClass('error');
			}
		}

		function createError(input, text) {
			const errorText = $(`<p class="error-text">${text}</p>`);
			input.parent().addClass('error').append(errorText);
		}

		return result
	}
})
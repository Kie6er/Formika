import $ from "jquery";

$(document).ready(function () {
	const inputFile = document.querySelectorAll('.input-file');

	inputFile.forEach((el) => {
		$(el).on('change', () => {
			if (el.files.length) {
				let fileSize = (el.files[0].size / 1024).toFixed(1);
				let fileName = el.files[0].name;

				$(el).siblings('.custom-preview').find('.custom-preview__name').text(fileName);
				$(el).siblings('.custom-preview').find('.custom-preview__size').text(`${fileSize}KB`);

				if (fileSize >= 1024) {
					fileSize = (fileSize / 1024).toFixed(1);
					$(el).siblings('.custom-preview').find('.custom-preview__size').text(`${fileSize}MB`)
				}

				$(el).siblings('.custom-file').css('display', 'none');
				$(el).siblings('.custom-preview').css('display', 'flex');
			}
		})
	})
})
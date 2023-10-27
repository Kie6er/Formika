import $ from "jquery";
// import Swiper from 'swiper';
// import 'swiper/css';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "../utils/ScrollSmoother.min";
$(document).ready(function () {
	if (ScrollTrigger.isTouch !== 1) {
		const tl1 = gsap.timeline({
			defaults: {
				scrollTrigger: {
					trigger: '.main-solutions',
					start: '30% bottom',
					end: '-10% top',
					ease: "power2.inOut",
					scrub: 2,
					toggleActions: "play complete complete complete"
				}
			}
		});

		let leftItems = gsap.utils.toArray('.main-projects__content-left .main-projects__content-item');
		let rightItems = gsap.utils.toArray('.main-projects__content-right .main-projects__content-item');

		tl1.fromTo('.main-solutions__inner', { y: '20rem', }, { y: '0rem', duration: 1.5, })
			.fromTo('.main-solutions__wrapper-title--top', { x: '-20rem', }, { x: '0rem', duration: 1.2, })
			.fromTo('.main-solutions__wrapper-title--bottom', { x: '10rem', }, { x: '0rem', duration: 1.2, })
			.fromTo('.main-solutions__main-back--overlay', { x: '50rem', }, { x: '0rem', duration: 1.6, })
			.fromTo('.main-solutions__wrapper-description', { y: '25rem', }, { y: '0rem', duration: 1.6, })
			.fromTo('.main-solutions__wrapper-text', { y: '25rem', }, { y: '0rem', duration: 1.6, });

		gsap.to('.main-projects__subtitle', {
			scrollTrigger: {
				trigger: '.main-projects',
				pin: '.main-projects__subtitle',
				start: 'top 40%',
				end: '85% 50%',
			}
		})
		gsap.to('.main-projects__btn', {
			scrollTrigger: {
				trigger: '.main-projects',
				pin: '.main-projects__btn',
				start: 'top 40%',
				end: '85% 50%',
			}
		});

		for (let i = 0; i < leftItems.length - 1; i++) {
			gsap.fromTo('.main-projects__content-left', { y: "20rem" }, {
				y: "0rem",
				scrollTrigger: {
					trigger: '.main-projects',
					start: "-10% center",
					end: "top center",
					scrub: 2,
					// markers: true,
				}
			})
			gsap.fromTo(leftItems[i], { y: "0rem" }, {
				y: "-65rem",
				scrollTrigger: {
					trigger: leftItems[i],
					// markers: true,
					start: "110% center",
					end: "140% center",
					scrub: 2
				}
			})
			gsap.fromTo(leftItems[i + 1], { y: "10rem" }, {
				y: "0rem",
				scrollTrigger: {
					trigger: leftItems[i],
					scrub: 2,
					start: "top center",
					end: "50% center",
				}
			})
		}
		for (let i = 0; i < rightItems.length - 1; i++) {
			gsap.fromTo('.main-projects__content-right', { y: "20rem" }, {
				y: "0rem",
				scrollTrigger: {
					trigger: '.main-projects',
					start: "top center",
					end: "10% center",
					scrub: 2,
					// markers: true,
				}
			})
			gsap.fromTo(rightItems[i], { y: "0rem" }, {
				y: "-65rem",
				scrollTrigger: {
					trigger: leftItems[i],
					// markers: true,
					start: "110% center",
					end: "140% center",
					scrub: 2
				}
			})
			gsap.fromTo(rightItems[i + 1], { y: "10rem" }, {
				y: "0rem",
				scrollTrigger: {
					trigger: rightItems[i],
					scrub: 2,
					start: "-80% center",
					end: "top center",
					// markers: true
				}
			})
		}
	}

	$('.main-map__map-marks--item').on('mouseover', function (evt) {
		$('.main-map__map-marks--item').each(function (index, el) {
			$(el).removeClass('active');
		})
		$(evt.currentTarget).addClass('active')
	});
});
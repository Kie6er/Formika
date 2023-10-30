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

		let leftItemsImg = gsap.utils.toArray('.main-projects__content-left .main-projects__content-item img');
		let rightItemsImg = gsap.utils.toArray('.main-projects__content-right .main-projects__content-item img');
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
			let leftTm = gsap.timeline();
			leftTm.fromTo('.main-projects__content-left', { y: "20rem" }, {
				y: "0rem",
				delay: 2,
				scrollTrigger: {
					trigger: '.main-projects',
					start: "-10% center",
					end: "-2% center",
					toggleActions: "play none reverse none",
					scrub: 3,
					// markers: {
					// 	fontSize: "3rem"
					// }
				}
			})
				.add(swipe)
				.to(leftItems[i], {
					y: "-50rem",
					scrollTrigger: {
						trigger: leftItems[i],
						start: "50% center",
						end: "70% center",
						toggleActions: "play none reverse none",
						scrub: 3,
						// markers: {
						// 	fontSize: "3rem"
						// }
					}
				});
			function swipe() {
				leftItems.forEach((el, i) => {
					if (i !== 0) {
						leftTm.to(leftItems[i], {
							startAt: {
								y: "20rem",
							},
							y: "0rem",
							scrollTrigger: {
								trigger: leftItems[i],
								toggleActions: "play none reverse none",
								start: `${- leftItems[i].clientHeight * 2.4} center`,
								end: `${- leftItems[i].clientHeight * 1.2} center`,
								scrub: 2,
								// markers: {
								// 	fontSize: "1rem"
								// }
							}
						})
					}
					leftTm.to(leftItemsImg[i], {
						startAt: {
							objectPosition: "50% 80%",
						},
						objectPosition: "50% 20%",
						scrollTrigger: {
							trigger: leftItems[i],
							start: `top bottom`,
							end: `bottom top`,
							toggleActions: "play none reverse none",
							scrub: 2,
							// markers: true
						}
					})
					return (leftTm)
				})
			}
		}

		for (let i = 0; i < rightItems.length - 1; i++) {
			let rightTm = gsap.timeline();
			rightTm.fromTo('.main-projects__content-right', { y: "20rem" }, {
				y: "0rem",
				scrollTrigger: {
					trigger: '.main-projects',
					start: "-2% center",
					end: "6% center",
					scrub: 3,
					toggleActions: "play none reverse none",
					// markers: true,
				}
			})
				.add(swipeR)
				.to(rightItems[i], {
					y: "-50rem",
					scrollTrigger: {
						trigger: leftItems[i],
						// markers: {
						// 	fontSize: "3rem"
						// },
						start: "50% center",
						end: "70% center",
						toggleActions: "play none reverse none",
						scrub: 3,
					}
				})
			function swipeR() {
				rightItems.forEach((el, i) => {
					if (i !== 0) {
						rightTm.to(rightItems[i], {
							duration: 1,
							startAt: {
								y: "20rem",
							},
							y: "0rem",
							scrollTrigger: {
								trigger: rightItems[i],
								scrub: 2,
								toggleActions: "play none reverse none",
								start: `${- leftItems[i].clientHeight * 2.2} center`,
								end: `${- leftItems[i].clientHeight * 1.6} center`,
								// markers: true
							}
						})
					}
					rightTm.to(rightItemsImg[i], {
						startAt: {
							objectPosition: "50% 80%",
						},
						objectPosition: "50% 20%",
						scrollTrigger: {
							trigger: leftItems[i],
							start: `top bottom`,
							end: `bottom top`,
							toggleActions: "play none reverse none",
							scrub: 2,
						}
					})
					return (rightTm)
				})
			}
		}
	}

	$('.main-map__map-marks--item').on('mouseover', function (evt) {
		$('.main-map__map-marks--item').each(function (index, el) {
			$(el).removeClass('active');
		})
		$(evt.currentTarget).addClass('active')
	});
});
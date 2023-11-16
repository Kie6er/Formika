import $ from "jquery";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollSmoother } from "../utils/ScrollSmoother.min";

$(document).ready(function () {
	// GSAP анимации
	gsap.registerPlugin(ScrollTrigger);
	window.addEventListener('DOMContentLoaded', () => {
		ScrollTrigger.refresh();
	});
	window.addEventListener('load', () => {
		ScrollTrigger.refresh();
	});
	ScrollTrigger.config({ ignoreMobileResize: true, autoRefreshEvents: "DOMContentLoaded,load,resize" });
	const aboutPageMm = gsap.matchMedia();
	aboutPageMm.add("(min-width: 769px)", () => { // desktop
		$('.services-banner').length > 0 && ScrollTrigger.isTouch !== 1 ? serviceBannerAnimDesk() : null;
		if ($('.services-cases').length > 0 && ScrollTrigger.isTouch !== 1) {
			serviceProjectsAnimDesktop();
			serviceProjectsAnimMobile();

			const projectsResizeHandler = function (entries) {
				for (let entry of entries) {
					ScrollTrigger.refresh()
				}
			}
			const projectsResizeObserver = new ResizeObserver(projectsResizeHandler);
			const projects = document.querySelector(".services-cases");
			projectsResizeObserver.observe(projects);
		}
	});
	aboutPageMm.add("(max-width: 768px)", () => { // mobile
		$('.services-banner').length > 0 ? serviceBannerMob() : null;
		if ($('.services-cases').length > 0) {
			serviceProjectsAnimMobile();
			serviceShowProjectsAnimMobile();

			const projectsResizeHandler = function (entries) {
				for (let entry of entries) {
					ScrollTrigger.refresh()
				}
			}
			const projectsResizeObserver = new ResizeObserver(projectsResizeHandler);
			const projects = document.querySelector(".services-cases");
			projectsResizeObserver.observe(projects);
		};
	});

	function serviceBannerAnimDesk() {
		const img = document.querySelectorAll('.services-banner__cards-img');

		$('.services-banner__list button').each(function (i, el) {
			$(el).on('click', function (evt) {
				$('.services-banner__list li').each(function (i, el) {
					$(el).removeClass('active');
				});
				$(this).parent('li').addClass('active');
				img[i].scrollIntoView({ block: "nearest", behavior: "smooth", inline: "start" })
			})
		})
	}
	function serviceProjectsAnimDesktop() {
		const serviceDeskTimeline = gsap.timeline();
		const serviceItemsLeft = gsap.utils.toArray('.services-cases__content-left .services-cases__content-item');
		const serviceItemsRight = gsap.utils.toArray('.services-cases__content-right .services-cases__content-item');

		serviceDeskTimeline.to('.services-cases__subtitle', {
			scrollTrigger: {
				trigger: '.services-cases',
				pin: '.services-cases__subtitle',
				start: 'top 40%',
				end: '85% 50%',
			}
		})
		// .from('.services-cases__content-left', {
		// 	y: "20rem",
		// 	scrollTrigger: {
		// 		trigger: '.services-cases',
		// 		start: "-10% center",
		// 		end: "-2% center",
		// 		scrub: 3,
		// 	}
		// }).from('.services-cases__content-right', {
		// 	y: "20rem",
		// 	scrollTrigger: {
		// 		trigger: '.services-cases',
		// 		start: "-2% center",
		// 		end: "6% center",
		// 		scrub: 3,
		// 	}
		// }).add(function () {
		// 	serviceItemsLeft.slice(0, 4).forEach((el, i) => {
		// 		if (i === 0) {
		// 			serviceDeskTimeline.to(el, {
		// 				y: "-60rem",
		// 				scrollTrigger: {
		// 					trigger: el,
		// 					start: "50% center",
		// 					end: "70% center",
		// 					scrub: 3,
		// 					invalidateOnRefresh: !0,
		// 					// markers: true,
		// 				}
		// 			})
		// 		} else {
		// 			serviceDeskTimeline.from(el, {
		// 				y: "20rem",
		// 				scrollTrigger: {
		// 					trigger: el,
		// 					start: `-=${$(el).height() * 2} center`,
		// 					end: `-=${$(el).height() * 1.4} center`,
		// 					scrub: 1,
		// 					fastScrollEnd: true,
		// 					invalidateOnRefresh: !0,
		// 				}
		// 			}).add(function () {
		// 				if (i !== 3) {
		// 					serviceDeskTimeline.fromTo(el, { y: "0rem" }, {
		// 						y: "-60rem",
		// 						scrollTrigger: {
		// 							trigger: el,
		// 							start: "35% center",
		// 							end: "55% center",
		// 							scrub: 3,
		// 							invalidateOnRefresh: !0,
		// 							// markers: true
		// 						}
		// 					})
		// 				}
		// 				return (serviceDeskTimeline)
		// 			})
		// 		}
		// 	});

		// 	serviceItemsRight.slice(0, 4).forEach((el, i) => {
		// 		if (i === 0) {
		// 			serviceDeskTimeline.to(el, {
		// 				y: "-60rem",
		// 				scrollTrigger: {
		// 					trigger: el,
		// 					start: "10% center",
		// 					end: "30% center",
		// 					scrub: 3,
		// 					// markers: true
		// 					invalidateOnRefresh: !0,
		// 				}
		// 			})
		// 		} else {
		// 			serviceDeskTimeline.from(el, {
		// 				y: "20rem",
		// 				scrollTrigger: {
		// 					trigger: el,
		// 					start: `-=${$(el).height() * 2.4} center`,
		// 					end: `-=${$(el).height() * 1.8} center`,
		// 					scrub: 1.5,
		// 					fastScrollEnd: true,
		// 					invalidateOnRefresh: !0,
		// 					// markers: true
		// 				}
		// 			}).add(function () {
		// 				if (i !== 3) {
		// 					serviceDeskTimeline.to(el, {
		// 						startAt: { y: "0rem" },
		// 						y: "-60rem",
		// 						scrollTrigger: {
		// 							trigger: el,
		// 							start: "-5% center",
		// 							end: "15% center",
		// 							scrub: 3,
		// 							invalidateOnRefresh: !0,
		// 							// markers: true
		// 						}
		// 					})
		// 				}
		// 				return (serviceDeskTimeline)
		// 			})
		// 		}
		// 	});

		// 	return serviceDeskTimeline;
		// })

		$('.services-cases__content-item--btn').on('click', function (evt) {
			evt.preventDefault();
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
				setTimeout(() => {
					ScrollTrigger.refresh()
					ScrollTrigger.update()
				}, 1000)
				$('.services-cases__content-hidden').each(function (i, el) {
					$(el).css('max-height', '0')
					setTimeout(() => {
						$(el).css('display', 'none');
					}, 1000)
				})
			} else {
				ScrollTrigger.refresh()
				$(this).addClass('active');
				$('.services-cases__content-hidden').each(function (i, el) {
					$(el).css('display', 'flex');
					setTimeout(() => {
						$(el).css('max-height', 51 * $(this).find('.services-cases__content-item').length + 'rem');
					}, 0)
				});
			}
		})
	}
	function serviceProjectsAnimMobile() {
		const serviceImages = gsap.utils.toArray('.services-cases__content-item img');
		serviceImages.forEach(el => {
			return gsap.to(el, {
				startAt: { objectPosition: "50% 80%" },
				objectPosition: "50% 50%",
				scrollTrigger: {
					trigger: el,
					start: `top bottom`,
					end: `bottom top`,
					// markers: true,
					scrub: 2,
				}
			});
		});
	}
	function serviceShowProjectsAnimMobile() {
		$('.services-cases__content-item--btn').on('click', function (evt) {
			const content = $('.services-cases__content-hidden--mobile');
			evt.preventDefault();
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
				content.css('max-height', '0')
				setTimeout(() => {
					ScrollTrigger.refresh()
					serviceProjectsAnimMobile()
					content.css('display', 'none');
				}, 1000)
			} else {
				$(this).addClass('active');
				content.css('display', 'flex');
				setTimeout(() => {
					ScrollTrigger.refresh()
					serviceProjectsAnimMobile()
					content.css('max-height', 51 * content.find('.services-cases__content-item').length + 'rem');
				}, 0)
			}
		})
	}

	function serviceBannerMob() {
		$('.services-banner__list button').on('click', function (evt) {
			$('.services-banner__list li').each(function (i, el) {
				$(el).removeClass('active');
			})
			$(this).parent('li').addClass('active')
			evt.currentTarget.scrollIntoView({ block: "nearest", behavior: "smooth", inline: "center" });
		})
	}
});
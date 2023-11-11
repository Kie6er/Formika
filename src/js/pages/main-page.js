import $ from "jquery";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


$(document).ready(function () {
	// GSAP анимации
	gsap.registerPlugin(ScrollTrigger);
	window.addEventListener('load', () => {
		ScrollTrigger.refresh();
	});
	ScrollTrigger.config({ ignoreMobileResize: true, autoRefreshEvents: "DOMContentLoaded,load,resize" });

	const mainPageMm = gsap.matchMedia();
	mainPageMm.add("(min-width: 769px)", () => { // desktop
		$('.main-solutions').length > 0 && ScrollTrigger.isTouch !== 1 ? mainSolutionAnimDesktop() : null;
		if ($('.main-projects').length > 0 && ScrollTrigger.isTouch !== 1) {
			mainProjectsAnimDesktop();
			mainProjectsAnimMobile();
		}
	});
	mainPageMm.add("(max-width: 768px)", () => { // mobile
		$('.main-solutions').length > 0 ? mainSolutionAnimMobile() : null;
		$('.main-projects').length > 0 ? mainProjectsAnimMobile() : null;
	});

	function mainSolutionAnimMobile() {
		return gsap.to('.main-solutions__main-back', {
			startAt: { scale: 0.45 },
			scale: 1,
			scrollTrigger: {
				trigger: '.main-solutions',
				// markers: true,
				start: `top center`,
				end: `center center`,
				scrub: 3,
				ease: 'power1.inOut',
			}
		});
	}
	function mainSolutionAnimDesktop() {
		const solutionDeskTimeline = gsap.timeline({
			defaults: {
				scrollTrigger: {
					trigger: ".main-solutions",
					start: 'top bottom',
					end: '40% center',
					ease: "power2.inOut",
					scrub: 2,
				}
			}
		});

		solutionDeskTimeline
			.from('.main-solutions__inner', { y: '20rem', duration: 1 })
			.from('.main-solutions__wrapper-title--top', { x: '-20rem', duration: 1 })
			.from('.main-solutions__wrapper-title--bottom', { x: '10rem', duration: 1 })
			.from('.main-solutions__main-back--overlay', { x: '50rem', duration: 1 })
			.from('.main-solutions__wrapper-description', { y: '25rem', duration: 1 })
			.from('.main-solutions__wrapper-text', { y: '25rem', duration: 1 });

		return solutionDeskTimeline;
	}

	function mainProjectsAnimMobile() {
		const projectsImages = gsap.utils.toArray('.main-projects__content-item img');
		projectsImages.forEach(el => {
			return gsap.to(el, {
				startAt: { objectPosition: "50% 80%" },
				objectPosition: "50% 20%",
				scrollTrigger: {
					trigger: '.main-projects',
					start: `top bottom`,
					end: `bottom top`,
					// markers: true,
					scrub: 2,
				}
			});
		});
	}
	function mainProjectsAnimDesktop() {
		const projectsDeskTimeline = gsap.timeline();
		const projectsItemsLeft = gsap.utils.toArray('.main-projects__content-left .main-projects__content-item');
		const projectsItemsRight = gsap.utils.toArray('.main-projects__content-right .main-projects__content-item');

		projectsDeskTimeline.to('.main-projects__subtitle', {
			scrollTrigger: {
				trigger: '.main-projects',
				pin: '.main-projects__subtitle',
				start: 'top 40%',
				end: '85% 50%',
			}
		}).to('.main-projects__btn', {
			scrollTrigger: {
				trigger: '.main-projects',
				pin: '.main-projects__btn',
				start: 'top 40%',
				end: '85% 50%',
			}
		}).from('.main-projects__content-left', {
			y: "20rem",
			scrollTrigger: {
				trigger: '.main-projects',
				start: "-10% center",
				end: "-2% center",
				scrub: 3,
			}
		}).from('.main-projects__content-right', {
			y: "20rem",
			scrollTrigger: {
				trigger: '.main-projects',
				start: "-2% center",
				end: "6% center",
				scrub: 3,
			}
		}).add(function () {
			projectsItemsLeft.slice(0, 4).forEach((el, i) => {
				if (i === 0) {
					projectsDeskTimeline.to(el, {
						y: "-60rem",
						scrollTrigger: {
							trigger: el,
							start: "50% center",
							end: "70% center",
							scrub: 4,
							fastScrollEnd: 3000
							// markers: true,
						}
					})
				} else {
					projectsDeskTimeline.from(el, {
						y: "20rem",
						scrollTrigger: {
							trigger: el,
							start: `-=${$(el).height() * 2} center`,
							end: `-=${$(el).height() * 1.4} center`,
							scrub: 4,
						}
					})
				}

				if (i !== 3 && i !== 0) {
					projectsDeskTimeline.fromTo(el, { y: "0rem" }, {
						y: "-60rem",
						scrollTrigger: {
							trigger: el,
							start: "35% center",
							end: "55% center",
							scrub: 4,
							preventOverlaps: true
							// markers: true
						}
					})
				}
			});

			projectsItemsRight.slice(0, 4).forEach((el, i) => {
				if (i === 0) {
					projectsDeskTimeline.to(el, {
						y: "-60rem",
						scrollTrigger: {
							trigger: el,
							start: "10% center",
							end: "30% center",
							scrub: 4,
							// markers: true
							fastScrollEnd: 3000
						}
					})
				} else {
					projectsDeskTimeline.from(el, {
						y: "20rem",
						scrollTrigger: {
							trigger: el,
							start: `-=${$(el).height() * 2.4} center`,
							end: `-=${$(el).height() * 1.8} center`,
							scrub: 4,
							// markers: true
						}
					})
				}

				if (i !== 3 && i !== 0) {
					projectsDeskTimeline.fromTo(el, { y: "0rem" }, {
						y: "-60rem",
						scrollTrigger: {
							trigger: el,
							start: "-5% center",
							end: "15% center",
							scrub: 4,
							preventOverlaps: true
							// markers: true
						}
					})
				}
			});

			return projectsDeskTimeline;
		})
	}

	// Воиспрозвидение видео
	videoPlay();
	function videoPlay() {
		//Получаем видео
		let project = $(".main-projects__content-item");
		let bannerVideo = $('.banner-back').find('video')[0];
		// let isPlaying = bannerVideo.currentTime > 0 && !bannerVideo.paused && !bannerVideo.ended && bannerVideo.readyState > bannerVideo.HAVE_CURRENT_DATA;

		if ($(bannerVideo).length > 0) {
			bannerVideo.play();
		}
		for (var i = 0; i < project.length; i++) {
			project[i].addEventListener("mouseenter", e => { MouseEnter(e.target); });
			project[i].addEventListener("mouseleave", e => { MouseLeave(e.target); });
		}
	};
	function MouseEnter(e) {
		if ($(e).find('video').length > 0) {
			e.querySelector('video').play();
		}
	};
	function MouseLeave(e) {
		if ($(e).find('video').length > 0) {
			setTimeout(function () {
				e.querySelector('video').pause();
				e.querySelector('video').load();
			}, 500)
		}

	};

	// Карта
	let mapTarget = $('.main-map__map-marks--item');
	let overflowBlockMap = document.querySelector('.main-map__map');

	mapTarget.on('mouseover', function (evt) {
		mapTarget.each(function (index, el) {
			$(el).removeClass('active');
		})
		$(evt.currentTarget).addClass('active');

		if (window.outerWidth <= 768) {
			evt.currentTarget.scrollIntoView({ block: "nearest", behavior: "smooth", inline: "center" });
		}
	});

	overflowBlockMap && overflowBlockMap.scrollTo({
		top: 0,
		left: 500,
		behavior: "smooth"
	});
});
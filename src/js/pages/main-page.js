import $ from "jquery";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
	const mainPageMm = gsap.matchMedia();
	mainPageMm.add("(min-width: 769px)", () => { // desktop
		$('.main-solutions').length > 0 && ScrollTrigger.isTouch !== 1 ? mainSolutionAnimDesktop() : null;
		if ($('.main-projects').length > 0 && ScrollTrigger.isTouch !== 1) {
			mainProjectsAnimDesktop();
			mainProjectsAnimMobile();

			const projectsResizeHandler = function (entries) {
				for (let entry of entries) {
					ScrollTrigger.refresh()
				}
			}
			const projectsResizeObserver = new ResizeObserver(projectsResizeHandler);
			const projects = document.querySelector(".main-projects");
			projectsResizeObserver.observe(projects);
		}
	});
	mainPageMm.add("(max-width: 768px)", () => { // mobile
		$('.main-solutions').length > 0 ? mainSolutionAnimMobile() : null;
		if ($('.main-projects').length > 0) {
			mainProjectsAnimMobile();
			mainShowProjectsAnimMobile();

			const projectsResizeHandler = function (entries) {
				for (let entry of entries) {
					ScrollTrigger.refresh()
				}
			}
			const projectsResizeObserver = new ResizeObserver(projectsResizeHandler);
			const projects = document.querySelector(".main-projects");
			projectsResizeObserver.observe(projects);
		};
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
					trigger: el,
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
				end: () => `${$('.main-projects').height() - $('.main-projects__content-item').height() / 1.5} 50%`,
			}
		}).to('.main-projects__btn', {
			scrollTrigger: {
				trigger: '.main-projects',
				pin: '.main-projects__btn',
				start: 'top 40%',
				end: () => `${$('.main-projects').height() - $('.main-projects__content-item').height() / 1.5} 50%`,
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
							scrub: 3,
							invalidateOnRefresh: !0,
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
							scrub: 1,
							fastScrollEnd: true,
							invalidateOnRefresh: !0,
						}
					}).add(function () {
						if (i !== 3) {
							projectsDeskTimeline.fromTo(el, { y: "0rem" }, {
								y: "-60rem",
								scrollTrigger: {
									trigger: el,
									start: "35% center",
									end: "55% center",
									scrub: 3,
									invalidateOnRefresh: !0,
									// markers: true
								}
							})
						}
						return (projectsDeskTimeline)
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
							scrub: 3,
							// markers: true
							invalidateOnRefresh: !0,
						}
					})
				} else {
					projectsDeskTimeline.from(el, {
						y: "20rem",
						scrollTrigger: {
							trigger: el,
							start: `-=${$(el).height() * 2.4} center`,
							end: `-=${$(el).height() * 1.8} center`,
							scrub: 1.5,
							fastScrollEnd: true,
							invalidateOnRefresh: !0,
							// markers: true
						}
					}).add(function () {
						if (i !== 3) {
							projectsDeskTimeline.to(el, {
								startAt: { y: "0rem" },
								y: "-60rem",
								scrollTrigger: {
									trigger: el,
									start: "-5% center",
									end: "15% center",
									scrub: 3,
									invalidateOnRefresh: !0,
									// markers: true
								}
							})
						}
						return (projectsDeskTimeline)
					})
				}
			});

			return projectsDeskTimeline;
		})
		$('.main-projects__content-item--btn').on('click', function (evt) {
			evt.preventDefault();
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
				setTimeout(() => {
					ScrollTrigger.refresh()
					ScrollTrigger.update()
				}, 1000)
				$('.main-projects__content-hidden').each(function (i, el) {
					$(el).css('max-height', '0')
					setTimeout(() => {
						$(el).css('display', 'none');
					}, 1000)
				})
				$(this).text(`Show more`).append(`<span></span>`)
			} else {
				ScrollTrigger.refresh()
				$(this).addClass('active');
				$('.main-projects__content-hidden').each(function (i, el) {
					$(el).css('display', 'flex');
					setTimeout(() => {
						$(el).css('max-height', 51 * $(this).find('.main-projects__content-item').length + 'rem');
					}, 0)
				});
				$(this).text(`Close`).append(`<span></span>`)
			}
		})
	}
	function mainShowProjectsAnimMobile() {
		$('.main-projects__content-item--btn').on('click', function (evt) {
			const content = $('.main-projects__content-hidden--mobile');
			evt.preventDefault();
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
				content.css('max-height', '0')
				setTimeout(() => {
					ScrollTrigger.refresh()
					mainProjectsAnimMobile()
					content.css('display', 'none');
				}, 1000)
				$(this).text(`Show more`).append(`<span></span>`)
			} else {
				$(this).addClass('active');
				content.css('display', 'flex');
				setTimeout(() => {
					ScrollTrigger.refresh()
					mainProjectsAnimMobile()
					content.css('max-height', 51 * content.find('.main-projects__content-item').length + 'rem');
				}, 0)
				$(this).text(`Close`).append(`<span></span>`)
			}
		})
	}

	// Воиспрозвидение видео
	videoPlay();
	function videoPlay() {
		//Получаем видео
		let project = $(".main-projects__content-item");
		let projectService = $('.services-cases__content-item');
		let bannerVideo = $('.banner-back').find('video')[0];
		// let isPlaying = bannerVideo.currentTime > 0 && !bannerVideo.paused && !bannerVideo.ended && bannerVideo.readyState > bannerVideo.HAVE_CURRENT_DATA;

		if ($(bannerVideo).length > 0) {
			bannerVideo.play();
		}
		for (var i = 0; i < project.length; i++) {
			project[i].addEventListener("mouseenter", e => { MouseEnter(e.target); });
			project[i].addEventListener("mouseleave", e => { MouseLeave(e.target); });
		}
		for (var i = 0; i < projectService.length; i++) {
			projectService[i].addEventListener("mouseenter", e => { MouseEnter(e.target); });
			projectService[i].addEventListener("mouseleave", e => { MouseLeave(e.target); });
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
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
		})
		// .from('.main-projects__content-left', {
		// 	y: "20rem",
		// 	scrollTrigger: {
		// 		trigger: '.main-projects',
		// 		start: "-10% center",
		// 		end: "-2% center",
		// 		scrub: 3,
		// 	}
		// }).from('.main-projects__content-right', {
		// 	y: "20rem",
		// 	scrollTrigger: {
		// 		trigger: '.main-projects',
		// 		start: "-2% center",
		// 		end: "6% center",
		// 		scrub: 3,
		// 	}
		// }).add(function () {
		// 	projectsItemsLeft.slice(0, 4).forEach((el, i) => {
		// 		if (i === 0) {
		// 			projectsDeskTimeline.to(el, {
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
		// 			projectsDeskTimeline.from(el, {
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
		// 					projectsDeskTimeline.fromTo(el, { y: "0rem" }, {
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
		// 				return (projectsDeskTimeline)
		// 			})
		// 		}
		// 	});

		// 	projectsItemsRight.slice(0, 4).forEach((el, i) => {
		// 		if (i === 0) {
		// 			projectsDeskTimeline.to(el, {
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
		// 			projectsDeskTimeline.from(el, {
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
		// 					projectsDeskTimeline.to(el, {
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
		// 				return (projectsDeskTimeline)
		// 			})
		// 		}
		// 	});

		// 	return projectsDeskTimeline;
		// })

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
			} else {
				ScrollTrigger.refresh()
				$(this).addClass('active');
				$('.main-projects__content-hidden').each(function (i, el) {
					$(el).css('display', 'flex');
					setTimeout(() => {
						$(el).css('max-height', 51 * $(this).find('.main-projects__content-item').length + 'rem');
					}, 0)
				});
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
			} else {
				$(this).addClass('active');
				content.css('display', 'flex');
				setTimeout(() => {
					ScrollTrigger.refresh()
					mainProjectsAnimMobile()
					content.css('max-height', 51 * content.find('.main-projects__content-item').length + 'rem');
				}, 0)
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
	const markers = [
		{
			coordinate: [2.4, 50],
			active: false,
		},
		{
			coordinate: [7.4, 47.8],
			active: false,
		},
		{
			coordinate: [13, 68.2],
			active: false,
		},
		{
			coordinate: [33.7, 63.4],
			active: false,
		},
		{
			coordinate: [29.5, 78.1],
			active: false,
		},
		{
			coordinate: [30.4, 83.2],
			active: true,
		},
		{
			coordinate: [16.3, 100],
			active: false,
		},
		{
			coordinate: [7.7, 96.7],
			active: false,
		}
	]
	let markerContainer = document.querySelector('.main-map__map-marks');

	markers.forEach(el => {
		let marker = document.createElement('div');
		$(marker).addClass(`main-map__map-marks--item ${el.active ? 'active' : ' '}`);
		marker.insertAdjacentHTML('beforeend', `
			<div class="main-map__map-marks--wrapper">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 61" fill="none">
					<path
						d="M36.9634 27.8795C36.9634 32.9003 32.8985 36.9671 27.8656 36.9671C22.7461 36.9671 18.6227 32.7357 18.7901 27.5782C18.9463 22.8001 22.8745 18.9007 27.6563 18.7947C32.7869 18.6747 36.9634 22.789 36.9634 27.8795Z"
						fill="#785B08" />
					<path fill-rule="evenodd" clip-rule="evenodd"
						d="M0 27.8765C0 12.4738 12.4708 0 27.8682 0C43.2767 0 55.7587 12.4738 55.7587 27.8765C55.7587 40.9159 46.8098 51.8556 34.7127 54.9028L27.8189 61L20.8831 54.8657C8.86913 51.7676 0 40.8635 0 27.8765ZM10.0101 27.8765C10.0101 37.7479 18.0031 45.7393 27.8682 45.7393C37.7276 45.7393 45.7485 37.7507 45.7485 27.8765C45.7485 17.9995 37.7304 10.0109 27.8682 10.0109C18.0031 10.0109 10.0101 17.9995 10.0101 27.8765Z"
						fill="#785B08" />
				</svg>
			</div>
		`);
		if (window.outerWidth > 768) {
			$(marker).css('top', `${el.coordinate[0]}rem`)
			$(marker).css('left', `${el.coordinate[1]}rem`)
		} else {
			$(marker).css('top', `${el.coordinate[0] * 1.6 - 3}rem`)
			$(marker).css('left', `${el.coordinate[1] * 1.6 + 5}rem`)
		}
		$(markerContainer).append(marker);
	})

	let mapTarget = $('.main-map__map-marks--item');
	let overflowBlockMap = document.querySelector('.main-map__map');
	mapTarget.on('mouseover', function (evt) {
		mapTarget.removeClass('active')
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
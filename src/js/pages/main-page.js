import $ from "jquery";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


$(document).ready(function () {
	ScrollTrigger.refresh();
	let solutionsTimeline = gsap.timeline({
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
	let mainProjectsSession = gsap.timeline();
	let mobileTimeline = gsap.timeline();
	// GSAP анимации
	if ($('.main-solutions').length > 0 && $('.main-projects').length > 0) {
		if (ScrollTrigger.isTouch !== 1) {
			let leftItems = gsap.utils.toArray('.main-projects__content-left .main-projects__content-item');
			let rightItems = gsap.utils.toArray('.main-projects__content-right .main-projects__content-item');

			let leftItemsImg = gsap.utils.toArray('.main-projects__content-left .main-projects__content-item img');
			let rightItemsImg = gsap.utils.toArray('.main-projects__content-right .main-projects__content-item img');
			solutionsTimeline.fromTo('.main-solutions__inner', { y: '20rem', }, { y: '0rem', duration: 1.5, })
				.fromTo('.main-solutions__wrapper-title--top', { x: '-20rem', }, { x: '0rem', duration: 1.2, })
				.fromTo('.main-solutions__wrapper-title--bottom', { x: '10rem', }, { x: '0rem', duration: 1.2, })
				.fromTo('.main-solutions__main-back--overlay', { x: '50rem', }, { x: '0rem', duration: 1.6, })
				.fromTo('.main-solutions__wrapper-description', { y: '25rem', }, { y: '0rem', duration: 1.6, })
				.fromTo('.main-solutions__wrapper-text', { y: '25rem', }, { y: '0rem', duration: 1.6, });

			mainProjectsSession.to('.main-projects__subtitle', {
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
			});

			for (let i = 0; i < leftItems.length - 1; i++) {
				mainProjectsSession.fromTo('.main-projects__content-left', { y: "20rem" }, {
					y: "0rem",
					delay: 2,
					scrollTrigger: {
						trigger: '.main-projects',
						start: "-10% center",
						end: "-2% center",
						toggleActions: "play complete complete complete",
						scrub: 3,
					}
				}).add(swipe)
					.to(leftItems[0], {
						y: "-50rem",
						scrollTrigger: {
							trigger: leftItems[0],
							start: "50% center",
							end: "70% center",
							toggleActions: "play complete complete complete",
							scrub: 3,
						}
					})
				function swipe() {
					leftItems.forEach((el, i) => {
						if (i !== 0) {
							mainProjectsSession.to(leftItems[i], {
								startAt: {
									y: "20rem",
								},
								y: "0rem",
								scrollTrigger: {
									trigger: leftItems[i],
									toggleActions: "play complete complete complete",
									start: `${- leftItems[i].clientHeight * 2.4} center`,
									end: `${- leftItems[i].clientHeight * 1.2} center`,
									scrub: 2,
								}
							})
						}
						if (i !== 0 && i !== (leftItems.length - 1)) {
							mainProjectsSession.to(leftItems[i], {
								startAt: {
									y: "0rem"
								},
								y: "-50rem",
								scrollTrigger: {
									trigger: leftItems[i],
									start: "40% center",
									end: "60% center",
									toggleActions: "play complete complete complete",
									scrub: 3,
								}
							})
						}
						mainProjectsSession.to(leftItemsImg[i], {
							startAt: {
								objectPosition: "50% 80%",
							},
							objectPosition: "50% 20%",
							scrollTrigger: {
								trigger: leftItems[i],
								start: `top bottom`,
								end: `bottom top`,
								toggleActions: "play complete complete complete",
								scrub: 2,
							}
						})
						return (mainProjectsSession)
					})
				}
			}
			for (let i = 0; i < rightItems.length - 1; i++) {
				mainProjectsSession.fromTo('.main-projects__content-right', { y: "20rem" }, {
					y: "0rem",
					scrollTrigger: {
						trigger: '.main-projects',
						start: "-2% center",
						end: "6% center",
						scrub: 3,
						toggleActions: "play complete complete complete",
					}
				}).add(swipeR)
					.to(rightItems[0], {
						y: "-50rem",
						scrollTrigger: {
							trigger: leftItems[0],
							start: "50% center",
							end: "70% center",
							toggleActions: "play complete complete complete",
							scrub: 3,
						}
					})
				function swipeR() {
					rightItems.forEach((el, i) => {
						if (i !== 0) {
							mainProjectsSession.to(rightItems[i], {
								duration: 1,
								startAt: {
									y: "20rem",
								},
								y: "0rem",
								scrollTrigger: {
									trigger: rightItems[i],
									scrub: 2,
									toggleActions: "play complete complete complete",
									start: `${- leftItems[i].clientHeight * 2.2} center`,
									end: `${- leftItems[i].clientHeight * 1.6} center`,
								}
							})
						}
						if (i !== 0 && i !== (rightItems.length - 1)) {
							mainProjectsSession.to(rightItems[i], {
								startAt: {
									y: "0rem"
								},
								y: "-50rem",
								scrollTrigger: {
									trigger: leftItems[i],
									start: "40% center",
									end: "60% center",
									toggleActions: "play complete complete complete",
									scrub: 3,
								}
							})
						}
						mainProjectsSession.to(rightItemsImg[i], {
							startAt: {
								objectPosition: "50% 80%",
							},
							objectPosition: "50% 20%",
							scrollTrigger: {
								trigger: leftItems[i],
								start: `top bottom`,
								end: `bottom top`,
								toggleActions: "play complete complete complete",
								scrub: 2,
							}
						})
						return (mainProjectsSession)
					})
				}
			}
		}

		if (ScrollTrigger.isTouch === 1) {
			let projectMobileImage = gsap.utils.toArray('.main-projects__content-item img');
			mobileTimeline.to('.main-solutions__main-back', {
				startAt: {
					scale: 0.45
				},
				scale: 1,
				scrollTrigger: {
					trigger: '.main-solutions',
					start: "top center",
					end: "center center",
					scrub: 2,
					// toggleActions: "play complete complete complete",
					// markers: true
				}
			})

			projectMobileImage.forEach((el, i) => {
				mobileTimeline.to(projectMobileImage[i], {
					startAt: {
						objectPosition: "50% 80%",
					},
					objectPosition: "50% 20%",
					scrollTrigger: {
						trigger: '.main-projects',
						start: `top bottom`,
						end: `bottom top`,
						// markers: true,
						// toggleActions: "play complete complete complete",
						scrub: 2,
					}
				})
			})
		}
	}

	window.addEventListener('beforeunload', function () {
		localStorage.setItem('solutionsAnimProgress', solutionsTimeline.progress());
		localStorage.setItem('projectsAnimProgress', mainProjectsSession.progress());
		localStorage.setItem('mobileAnimProgress', mobileTimeline.progress());
	})

	window.addEventListener('load', function () {
		const savedProgressSolutions = localStorage.getItem('solutionsAnimProgress');
		const savedProgressProjects = localStorage.getItem('projectsAnimProgress');
		const savedProgressMobile = localStorage.getItem('mobileAnimProgress');

		if (savedProgressMobile || savedProgressProjects || savedProgressSolutions) {
			solutionsTimeline.progress(parseFloat(savedProgressSolutions));
			mainProjectsSession.progress(parseFloat(savedProgressProjects));
			mobileTimeline.progress(parseFloat(savedProgressMobile));
		}
	});


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
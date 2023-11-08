import $ from "jquery";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


$(document).ready(function () {
	ScrollTrigger.refresh();

	if ($('.project-content').length > 0) {
		let projectItemSmallTop = gsap.utils.toArray('.small--top');
		let projectItemSmallBottom = gsap.utils.toArray('.small--bottom');
		let projectItemBig = gsap.utils.toArray('.item-big-anim');
		let projectItemImage = gsap.utils.toArray('.project-content__item img')

		let timelineProject = gsap.timeline();
		// Анимация gsap
		if (ScrollTrigger.isTouch !== 1) {
			timelineProject.to(projectItemSmallTop[0], {
				startAt: {
					y: "0rem",
				},
				y: "-43.5rem",
				scrollTrigger: {
					trigger: projectItemSmallTop[0],
					start: "0% center",
					end: "65% center",
					scrub: 2,
					toggleActions: "play complete reverse play"
					// markers: true
				}
			}).to(projectItemSmallTop[1], {
				startAt: {
					y: "0rem",
				},
				y: "-43.5rem",
				scrollTrigger: {
					trigger: projectItemSmallTop[1],
					start: "-140% center",
					end: "-65% center",
					scrub: 2,
					toggleActions: "play complete reverse play"
					// markers: true
				}
			}).to(projectItemBig[1], {
				startAt: {
					y: "20rem"
				},
				y: "0rem",
				scrollTrigger: {
					trigger: projectItemSmallTop[0],
					start: "-10% center",
					end: "65% center",
					scrub: 2,
					toggleActions: "play complete reverse play"
					// markers: true
				}
			}).to(projectItemSmallBottom[0], {
				startAt: {
					y: "20rem"
				},
				y: "0rem",
				scrollTrigger: {
					trigger: projectItemBig[1],
					start: "20% center",
					end: "40% center",
					scrub: 2,
					toggleActions: "play complete reverse play"
					// markers: true
				}
			}).to(projectItemSmallBottom[1], {
				startAt: {
					y: "20rem"
				},
				y: "0rem",
				scrollTrigger: {
					trigger: projectItemBig[1],
					start: "30% center",
					end: "50% center",
					scrub: 2,
					// markers: true
					toggleActions: "play complete reverse play"
				}
			}).add(projectImageAnim)

			function projectImageAnim() {
				projectItemImage.forEach(el => {
					timelineProject.to(el, {
						startAt: {
							objectPosition: "50% 80%",
						},
						objectPosition: "50% 20%",
						scrollTrigger: {
							trigger: '.project-content',
							start: `top bottom`,
							end: `bottom top`,
							// toggleActions: "play complete complete complete",
							scrub: 2,
						}
					});
				})
				return (timelineProject)
			}
		}
		if (ScrollTrigger.isTouch === 1) {
			projectItemImage.forEach(el => {
				timelineProject.to(el, {
					startAt: {
						objectPosition: "50% 0%",
					},
					objectPosition: "50% 50%",
					scrollTrigger: {
						trigger: el,
						start: `top bottom`,
						end: `bottom top`,
						// toggleActions: "play complete complete complete",
						scrub: 2,
					}
				});
			})
		}
	}

	if ($('.project-video').length > 0) {
		$('.project-video').on('click', function () {
			if ($('.project-video__button-play').hasClass('active')) {
				$('.project-video__button-pause').addClass('active');
				$('.project-video__button-play').removeClass('active');
				$(this).find('video')[0].play();
			} else if ($('.project-video__button-pause').hasClass('active')) {
				$('.project-video__button-pause').removeClass('active');
				$('.project-video__button-play').addClass('active');
				$(this).find('video')[0].pause();
			}
		})
	}
})
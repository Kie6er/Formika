import $ from "jquery";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
window.addEventListener('load', () => {
	gsap.registerPlugin(ScrollTrigger);
	ScrollTrigger.refresh();
});
$(document).ready(function () {
	ScrollTrigger.refresh();
	// GSAP анимации
	ScrollTrigger.config({ ignoreMobileResize: true, autoRefreshEvents: "DOMContentLoaded,load,resize" });

	const projectPageMm = gsap.matchMedia();
	const projectItemSmallTop = gsap.utils.toArray('.small--top');
	const projectItemSmallBottom = gsap.utils.toArray('.small--bottom');
	const projectItemBig = gsap.utils.toArray('.item-big-anim');
	const projectItemImage = gsap.utils.toArray('.project-content__item img')

	projectPageMm.add("(min-width: 769px)", () => { // desktop
		if ($('.project-content').length > 0 && ScrollTrigger.isTouch !== 1) {
			projectItemsAnimMobile();
			projectItemsAnimDesk();
		}
	});
	projectPageMm.add("(max-width: 768px)", () => { // mobile
		$('.project-content').length > 0 ? projectItemsAnimMobile() : null;
	});

	function projectItemsAnimMobile() {
		projectItemImage.forEach(el => {
			return gsap.to(el, {
				startAt: {
					objectPosition: "50% 0%",
				},
				objectPosition: "50% 50%",
				scrollTrigger: {
					trigger: el,
					start: `top bottom`,
					end: `bottom top`,
					scrub: 2,
				}
			});
		})
	}
	function projectItemsAnimDesk() {
		const timelineProject = gsap.timeline();
		return timelineProject.to(projectItemSmallTop[0], {
			startAt: {
				y: "0rem",
			},
			y: "-43.5rem",
			scrollTrigger: {
				trigger: projectItemSmallTop[0],
				start: "0% center",
				end: "65% center",
				scrub: 3,
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
				scrub: 3,
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
				scrub: 3,
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
				scrub: 3,
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
				scrub: 3,
				// markers: true
			}
		})
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
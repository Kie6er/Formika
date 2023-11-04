import $ from "jquery";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

$(document).ready(function () {
	ScrollTrigger.refresh();
	window.addEventListener('load', function () {
		ScrollTrigger.refresh();
	});
	window.addEventListener('resize', function () {
		ScrollTrigger.refresh();
	})

	if ($('.project-content').length > 0) {
		if (ScrollTrigger.isTouch !== 1) {
			let projectItemSmallTop = gsap.utils.toArray('.small--top');
			let projectItemSmallBottom = gsap.utils.toArray('.small--bottom');
			let projectItemBig = gsap.utils.toArray('.item-big-anim');

			let timelineProject = gsap.timeline();

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
			})
		} else {

		}
	}
})
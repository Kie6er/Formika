import $ from "jquery";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

$(document).ready(function () {
	ScrollTrigger.refresh();

	if ($('.about-circles').length > 0) {
		const circleItemTimeline = gsap.timeline();
		const circleItem = gsap.utils.toArray('.circle-item');

		if (ScrollTrigger.isTouch !== 1) {
			circleItemTimeline.to(circleItem[0], {
				startAt: {
					y: "25rem",
				},
				y: "0rem",
				scrollTrigger: {
					trigger: ".about-circles",
					start: "top 90%",
					end: "bottom 90%",
					scrub: 3,
				}
			}).to(circleItem[1], {
				startAt: {
					y: "25rem",
				},
				y: "0rem",
				scrollTrigger: {
					trigger: ".about-circles",
					start: "40% 90%",
					end: "140% 90%",
					scrub: 3,
				}
			}).to(circleItem[2], {
				startAt: {
					y: "25rem",
				},
				y: "0rem",
				scrollTrigger: {
					trigger: ".about-circles",
					start: "80% 90%",
					end: "180% 90%",
					scrub: 3,
				}
			}).to(circleItem[3], {
				startAt: {
					y: "25rem",
				},
				y: "0rem",
				scrollTrigger: {
					trigger: ".about-circles",
					start: "120% 90%",
					end: "220% 90%",
					scrub: 3,
				}
			});
		};
	};

	if ($('.about-wedo').length > 0) {
		const wedoCards = gsap.utils.toArray('.about-wedo__cards-img');
		const listItems = gsap.utils.toArray('.about-wedo__list li strong');
		const wedoCardsTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: ".about-wedo",
				pin: ".about-wedo",
				start: "top 13%",
				scrub: true,
				// markers: true,
				end: () => "+=" + wedoCards.length * wedoCards[0].offsetHeight
			}
		});
		const listTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: ".about-wedo",
				start: "top 13%",
				end: () => "+=" + wedoCards.length * wedoCards[0].offsetHeight,
				scrub: true,
			}
		});

		if (ScrollTrigger.isTouch !== 1) {
			wedoCards.slice(1).forEach((card, i) => {
				wedoCardsTimeline.fromTo(card, { yPercent: 0 }, {
					yPercent: -100,
					duration: 0.5
				});
			});

			listItems.forEach((item, j) => {
				if (listItems[j - 1]) {
					listTimeline.set(item, { color: "#785b08" }, j * 0.75).set(
						listItems[j - 1],
						{ color: "#1d1d1d" },
						"<"
					);
				} else {
					listTimeline.set(item, { color: "#785b08" }, 0.01);
				};
			});

			listTimeline.set(
				listItems[listItems.length - 1],
				{ color: "#1d1d1d" },
				0.5 * listItems.length
			).to({}, {});
		};
	};

	if ($('.about-clients').length > 0) {
		const container = document.querySelector(".about-clients__horizontal-container");
		const panels = gsap.utils.toArray(".about-clients__horizontal-card");
		if (ScrollTrigger.isTouch !== 1) {
			gsap.to(container, {
				x: -(panels.length * panels[0].offsetWidth),
				ease: "power1.inOut",
				scrollTrigger: {
					trigger: ".about-clients",
					start: "-30% center",
					end: "150% center",
					scrub: 4,
				}
			})
		}
	}
});
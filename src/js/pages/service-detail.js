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
	});
	aboutPageMm.add("(max-width: 768px)", () => { // mobile
		$('.services-banner').length > 0 ? serviceBannerMob() : null;
		// $('.main-projects').length > 0 ? mainProjectsAnimMobile() : null;
	});

	function serviceBannerAnimDesk() {
		const serviceCards = gsap.utils.toArray('.services-banner__cards-img');
		const listItems = gsap.utils.toArray('.services-banner__list.desk li strong');
		const serviceCardsTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: ".services-banner",
				pin: ".services-banner",
				start: "top 13%",
				scrub: true,
				// markers: true,
				end: () => "+=" + serviceCards.length * serviceCards[0].offsetHeight
			}
		});
		const listTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: ".services-banner",
				start: "top 13%",
				end: () => "+=" + serviceCards.length * serviceCards[0].offsetHeight,
				scrub: true,
			}
		});

		serviceCards.slice(1).forEach((card, i) => {
			serviceCardsTimeline.fromTo(card, { yPercent: 0 }, {
				yPercent: -100,
				duration: 0.5,
			});
		});

		listItems.forEach((item, j) => {
			if (listItems[j - 1]) {
				listTimeline.set(item, { color: "#785b08" }, j).set(
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
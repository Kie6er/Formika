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
	const aboutPageMm = gsap.matchMedia();
	aboutPageMm.add("(min-width: 769px)", () => { // desktop
		$('.about-circles').length > 0 && ScrollTrigger.isTouch !== 1 ? aboutCirclesAnimDesk() : null;
		$('.about-wedo').length > 0 && ScrollTrigger.isTouch !== 1 ? aboutWedoAnimDesk() : null;
	});
	aboutPageMm.add("(max-width: 768px)", () => { // mobile
		// $('.main-solutions').length > 0 ? mainSolutionAnimMobile() : null;
		// $('.main-projects').length > 0 ? mainProjectsAnimMobile() : null;
	});

	function aboutCirclesAnimDesk() {
		return gsap.from('.circle-item', {
			y: "25rem",
			duration: 5,
			stagger: {
				each: 1.5,
			},
			ease: 'power1.inOut',
			scrollTrigger: {
				trigger: ".about-circles",
				start: "top 90%",
				end: "120% 90%",
				scrub: 4,
			}
		})
	}

	function aboutWedoAnimDesk() {
		const wedoCards = gsap.utils.toArray('.about-wedo__cards-img');
		const listItems = gsap.utils.toArray('.about-wedo__list li strong');
		const wedoCardsTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: ".about-wedo",
				pin: ".about-wedo",
				start: "top 12%",
				scrub: true,
				// markers: true,
				end: () => "+=" + wedoCards.length * wedoCards[0].offsetHeight
			}
		});
		const listTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: ".about-wedo",
				start: "top 12%",
				end: () => "+=" + wedoCards.length * wedoCards[0].offsetHeight,
				scrub: true,
			}
		});

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
	}

	// Аккордеон
	const accordionBtn = document.querySelectorAll('.about-wedo__accordion-button');
	accordionBtn.forEach(el => {
		let firstItem = accordionBtn[0];
		let firstItemContent = firstItem.nextElementSibling;

		firstItem.classList.add('active');
		firstItemContent.style.maxHeight = firstItemContent.scrollHeight + 'px';

		el.addEventListener('click', () => {
			let content = el.nextElementSibling;

			if (el.classList.contains('active')) {
				document.querySelectorAll('.about-wedo__accordion-content').forEach(el => el.style.maxHeight = null);
				accordionBtn.forEach(el => el.classList.remove('active'));
			} else {
				document.querySelectorAll('.about-wedo__accordion-content').forEach(el => el.style.maxHeight = null);
				content.style.maxHeight = content.scrollHeight + 'px';
				accordionBtn.forEach(el => el.classList.remove('active'));
				el.classList.add('active')
			}
		})
	})
});
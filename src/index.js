import $ from "jquery";
import IMask from 'imask';
// import Swiper from 'swiper';
// import 'swiper/css';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollSmoother } from "gsap-trial/ScrollSmoother";

import "./index.scss";
import "./js/components/header";
import "./js/components/form";
import "./js/components/file";
import "./js/components/modal";
import "./js/pages/main-page";
import "./js/pages/project-detail";
import "./js/pages/service-detail";
import "./js/pages/about";
import * as constants from "./js/utils/constants";

gsap.registerPlugin(ScrollTrigger);
gsap.config({ trialWarn: false })

$('[type=tel]').each(function () {
	const mask = IMask(this, {
		mask: '+0 (000) 000-00-00'
	});
});
// gsap.matchMedia().add("(min-width: 769px)", () => { // desktop
// 	if (ScrollTrigger.isTouch !== 1) {
// 		ScrollSmoother.create({
// 			wrapper: '.page',
// 			content: '.content',
// 			smooth: 3,
// 		});
// 	}
// });


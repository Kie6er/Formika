import $ from "jquery";
import IMask from 'imask';
// import Swiper from 'swiper';
// import 'swiper/css';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "./js/utils/ScrollSmoother.min";

import "./index.scss";
import "./js/components/header";
import "./js/components/form";
import "./js/pages/main-page";
import "./js/pages/project-detail";

import * as constants from "./js/utils/constants";
const phone = document.querySelectorAll('[type=tel]');
phone.forEach(function (element) {
	const mask = IMask(element, {
		mask: '+0 (000) 000-00-00'
	});
})

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollSmoother.create({
	wrapper: '.page',
	content: '.content',
	smooth: 3,
	effects: true,
});

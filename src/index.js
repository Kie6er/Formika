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
import "./js/components/file";
import "./js/pages/main-page";
import "./js/pages/project-detail";
import "./js/pages/about";
import * as constants from "./js/utils/constants";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

$('[type=tel]').each(function () {
	const mask = IMask(this, {
		mask: '+0 (000) 000-00-00'
	});
});

ScrollSmoother.create({
	wrapper: '.page',
	content: '.content',
	smooth: 3,
});



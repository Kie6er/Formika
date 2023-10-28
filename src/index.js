import $ from "jquery";
// import Swiper from 'swiper';
// import 'swiper/css';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "./js/utils/ScrollSmoother.min";

import "./index.scss";
import "./js/pages/main-page";
import "./js/components/header";
import * as constants from "./js/utils/constants";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
if (ScrollTrigger.isTouch !== 1) {
	ScrollSmoother.create({
		wrapper: '.page',
		content: '.content',
		smooth: 3,
		effects: true,
	});
}
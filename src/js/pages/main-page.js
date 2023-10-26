import $ from "jquery";
// import Swiper from 'swiper';
// import 'swiper/css';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "../utils/ScrollSmoother.min";
$(document).ready(function () {
	if (ScrollTrigger.isTouch !== 1) {
		gsap.fromTo('.main-solutions__inner', { y: '50rem', }, {
			y: '0rem',
			duration: 1.5,
			scrollTrigger: {
				trigger: '.main-solutions',
				start: '40% bottom',
				end: 'top 40%',
			},
		});
		gsap.fromTo('.main-solutions__wrapper-title--top', { x: '-20rem', }, {
			x: '0rem',
			duration: 1.2,
			scrollTrigger: {
				trigger: '.main-solutions',
				start: '40% bottom',
				end: 'top 40%'
			},
		});
		gsap.fromTo('.main-solutions__wrapper-title--bottom', { x: '10rem', }, {
			x: '0rem',
			duration: 1.2,
			scrollTrigger: {
				trigger: '.main-solutions',
				start: '40% bottom',
				end: 'top 40%'
			},
		});
		gsap.fromTo('.main-solutions__main-back--overlay', { x: '50rem', }, {
			x: '0rem',
			duration: 1.6,
			scrollTrigger: {
				trigger: '.main-solutions',
				start: '40% bottom',
				end: 'top 40%'
			},
		});

		gsap.fromTo('.main-solutions__wrapper-description', { y: '25rem', }, {
			y: '0rem',
			duration: 1.6,
			scrollTrigger: {
				trigger: '.main-solutions',
				start: '40% bottom',
				end: 'top 40%'
			},
		});

		gsap.fromTo('.main-solutions__wrapper-text', { y: '25rem', }, {
			y: '0rem',
			duration: 1.6,
			scrollTrigger: {
				trigger: '.main-solutions',
				start: '40% bottom',
				end: 'top 40%'
			},
		});
	}

});
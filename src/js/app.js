import "./components/file.js";
import "./components/form.js";
import "./components/header.js";
import "./components/modal.js";

import "./pages/about.js";
import "./pages/main-page.js";
import "./pages/project-detail.js";
import "./pages/service-detail.js";

import "./utils/constants.js";
import "../scss/index.scss";

import $ from "jquery";
import IMask from "imask";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.config({ trialWarn: false });

$("[type=tel]").each(function () {
	const mask = IMask(this, {
		mask: "+0 (000) 000-00-00",
	});
});

_9include('modules/lazy_load.js');

document.addEventListener('DOMContentLoaded', function () {

	function testWebP(callback) {

		var webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}

	testWebP(function (support) {

		if (support == true) {
			document.querySelector('body').classList.add('webp');
		} else {
			document.querySelector('body').classList.add('no-webp');
		}
	});


	let hyper = document.querySelectorAll('a');
	hyper.forEach(item => {
		if (item.getAttribute("href") == '#') {
			item.addEventListener('click', (e) => {
				e.preventDefault();
			});
		} else {

		}

	});

	// All promo animations start after page loaded.

	let waitPromo = document.querySelectorAll('.wait_promo');
	let waitPromoFlex = document.querySelector('.presentation.wait_promo');

	document.onreadystatechange = function () {
		let promo = document.getElementById('promo');
		let promo__wrapper = document.getElementById('promo__wrapper');
		let promo__h1 = document.getElementById('promo__h1');
		let promo__h1_h1 = document.getElementById('promo__h1_h1');
		let promo__h2 = document.getElementById('promo__h2');




		function start_promo_anim() {
			document.getElementById('interactive');
			document.getElementById('load').style.visibility = "hidden";
			document.getElementById('load').style.position = "fixed";
			promo.classList.add("promo__start-slides");
			promo__wrapper.classList.add("promo__wrapper_start-manifest");
			promo__h1.classList.add("promo__h1_start-manifest");
			promo__h1_h1.classList.add("promo__h1_h1_start-flicker");
			promo__h2.classList.add("promo__h2_start-updown");
			waitPromo.forEach(item => {
				item.style.display = 'block';
			});
			waitPromoFlex.style.display = 'flex';
		}
		start_promo_anim();
		setTimeout(() => {
			initializeLazyLoad();
		}, 300);
	};

	setTimeout(() => {
		waitPromo.forEach(item => {
			item.style.display = 'block';
		});
		waitPromoFlex.style.display = 'flex';
	}, 10000);
	// To adapt animation for different media and preload it.
	let image_preload = document.querySelector('.image_preload');
	const mediaQuery575 = window.matchMedia('(max-width: 424px)');
	const mediaQuery767 = window.matchMedia('(max-width: 767px)');
	const mediaQuery991 = window.matchMedia('(max-width: 991px)');
	const mediaQuery992 = window.matchMedia('(min-width: 992px)');

	if (mediaQuery575.matches) {
		let sky = document.createElement('div');
		sky.classList.add('hidden-images');
		sky.innerHTML = `   
            <img src="img/425/promo-bg/sky2.jpg" alt="123">
            <img src="img/425/promo-bg/sky2.5.jpg" alt="123">
            <img src="img/425/promo-bg/sky3.jpg" alt="123">
            <img src="img/425/promo-bg/sky4.jpg" alt="123">
            `;
		image_preload.appendChild(sky);
	} else if (mediaQuery767.matches) {
		let sky = document.createElement('div');
		sky.classList.add('hidden-images');
		sky.innerHTML = `
            <img src="img/768/promo-bg/sky2.jpg" alt="123">
            <img src="img/768/promo-bg/sky2.5.jpg" alt="123">
            <img src="img/768/promo-bg/sky3.jpg" alt="123">
            <img src="img/768/promo-bg/sky4.jpg" alt="123">
            `;
		image_preload.appendChild(sky);
	} else if (mediaQuery991.matches) {
		let sky = document.createElement('div');
		sky.classList.add('hidden-images');
		sky.innerHTML = `
            <img src="img/992/promo-bg/sky2.jpg" alt="123">
            <img src="img/992/promo-bg/sky2.5.jpg" alt="123">
            <img src="img/992/promo-bg/sky3.jpg" alt="123">
            <img src="img/992/promo-bg/sky4.jpg" alt="123">
            `;
		image_preload.appendChild(sky);
	} else if (mediaQuery992.matches) {
		let sky = document.createElement('div');
		sky.classList.add('hidden-images');
		sky.innerHTML = `
            <img src="img/1400/promo-bg/sky2.jpg" alt="123">
            <img src="img/1400/promo-bg/sky2.5.jpg" alt="123">
            <img src="img/1400/promo-bg/sky3.jpg" alt="123">
            <img src="img/1400/promo-bg/sky4.jpg" alt="123">
            `;
		image_preload.appendChild(sky);
	} else {

	}

	// slider section
	// main-slider
	const slider = document.getElementById('slider__container');
	const slides = Array.from(document.querySelectorAll('.slider__item'));

	let isDragging = false,
		startPos = 0,
		currentTranslate = 0,
		prevTranslate = 0,
		animationID,
		currentIndex = 0

	slides.forEach((slide, index) => {
		const slideImage = slide.querySelector('img');
		// disable default image drag
		slideImage.addEventListener('dragstart', (e) => e.preventDefault());
		// touch events
		slide.addEventListener('touchstart', touchStart(index), {
			passive: true
		});
		slide.addEventListener('touchend', touchEnd);
		slide.addEventListener('touchmove', touchMove);
		// mouse events
		slide.addEventListener('mousedown', touchStart(index), {
			passive: true
		});
		slide.addEventListener('mouseup', touchEnd);
		slide.addEventListener('mousemove', touchMove);
		slide.addEventListener('mouseleave', touchEnd);
	})

	// make responsive to viewport changes
	window.addEventListener('resize', setPositionByIndex);

	// prevent menu popup on long press
	/* window.oncontextmenu = function (event) {
	    event.preventDefault();
	    event.stopPropagation();
	    return false;
	} */

	function getPositionX(event) {
		return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
	}

	function touchStart(index) {
		return function (event) {
			currentIndex = index
			startPos = getPositionX(event);
			isDragging = true
			animationID = requestAnimationFrame(animation);
			slider.classList.add('grabbing');
		}
	}

	function touchMove(event) {
		if (isDragging) {
			const currentPosition = getPositionX(event);
			currentTranslate = prevTranslate + currentPosition - startPos;
		}
	}

	function touchEnd() {
		cancelAnimationFrame(animationID);
		isDragging = false;
		const movedBy = currentTranslate - prevTranslate;

		// if moved enough negative then snap to next slide if there is one
		if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1;

		// if moved enough positive then snap to previous slide if there is one
		if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

		setPositionByIndex();

		slider.classList.remove('grabbing');
	}

	function animation() {
		setSliderPosition();
		if (isDragging) requestAnimationFrame(animation);
	}

	function setPositionByIndex() {
		currentTranslate = currentIndex * -window.innerWidth;
		prevTranslate = currentTranslate;
		setSliderPosition();
	}

	function setSliderPosition() {
		slider.style.transform = `translateX(${currentTranslate}px)`;
	}

	// timer

	let timer = (interval, selectorSeconds, selectorMinutes, selectorHours, selectorDays, localStorageVar) => {
		let t = interval;

		function reset() {
			localStorage.setItem(localStorageVar, +new Date() + t);
			/* localStorage.endTime = +new Date() + t; */
		}

		if (!localStorage.getItem(localStorageVar)) {
			reset();
		}

		setInterval(function () {
			let remaining = localStorage.getItem(localStorageVar) - new Date,
				seconds = (Math.floor(remaining / 1000) % 60),
				minutes = (Math.floor(remaining / 1000 / 60) % 60),
				hours = (Math.floor(remaining / 1000 / 60 / 60) % 24),
				days = (Math.floor(remaining / 1000 / 60 / 60 / 24));


			if (remaining >= 0) {
				document.querySelector(selectorDays).textContent = days;
				document.querySelector(selectorHours).textContent = addZero(hours);
				document.querySelector(selectorMinutes).textContent = addZero(minutes);
				document.querySelector(selectorSeconds).textContent = addZero(seconds);
			} else {
				reset();
			}
			if (document.querySelector(selectorDays).textContent == '0') {
				document.querySelector(selectorDays).parentElement.parentElement.style.display = 'none';
			}
		}, 100);

		const addZero = (num) => {
			if (num <= 9) {
				return '0' + num;
			} else {
				return num;
			}
		};
	};;
	timer(5000, '[data-seconds="1"]', '[data-minutes="1"]', '[data-hours="1"]', '[data-days="1"]', 'localStorageFirst');
	timer(999999999, '[data-seconds="2"]', '[data-minutes="2"]', '[data-hours="2"]', '[data-days="2"]', 'localStorageSecond');
	timer(12314588, '[data-seconds="3"]', '[data-minutes="3"]', '[data-hours="3"]', '[data-days="3"]', 'localStorageThird');



	// modal window

	function bindModal(trigger, modal_overlay, close) {
		if (trigger == null) {
			modal_overlay.style.display = 'block';
			document.body.style.overflow = "hidden";
			document.body.style.marginRight = `${calcScrollVar}px`;
		} else {
			trigger.addEventListener('click', (e) => {
				if (e.target) {
					e.preventDefault();
				}

				modal_overlay.style.display = 'block';
				document.body.style.overflow = "hidden";
				document.body.style.marginRight = `${calcScrollVar}px`;
			});
		}

		if (close == null) {

		} else {
			function closeModal() {
				modal_overlay.style.display = 'none';
				document.body.style.overflow = "";
				document.body.style.marginRight = `0px`;
			}

			close.addEventListener('click', () => {
				closeModal()
			});

			modal_overlay.addEventListener('click', (e) => {
				if (e.target === modal_overlay) {
					closeModal()
				}
			});
			document.addEventListener('keydown', (e) => {
				if (e.code === "Escape" && modal_overlay.style.display == 'block') {
					closeModal()
				}
			});
		}

	}

	const callPhoneBtn = document.querySelector('.cback'),
		modalPhone = document.querySelector('.slider__modal_overlay'),
		modalPhoneClose = document.querySelector('.modal__phone_close'),
		calcScrollVar = calcScroll();
	const buynowBtn = document.querySelector('.slider__btn'),
		buynowBtn2 = document.querySelector('[data-slider-btn="2"]'),
		buynowBtn3 = document.querySelector('[data-slider-btn="3"]'),
		modalbuynow = document.querySelector('.buynow'),
		modalbuynowClose = document.querySelector('.modal__buynow_close');
	const call_contacts_modal = '',
		contacts_modal = document.querySelector('.contacts__modal_overlay'),
		contacts_modal_close = document.querySelector('.contacts__modal_btn');
	const play_icon = document.querySelector('.play__icon'),
		modal_youtube = document.querySelector('.content__modal_overlay'),
		modal_youtube_close = document.querySelector('.content__modal_window .close');




	bindModal(callPhoneBtn, modalPhone, modalPhoneClose);
	bindModal(buynowBtn, modalbuynow, modalbuynowClose);
	bindModal(buynowBtn2, modalbuynow, modalbuynowClose);
	bindModal(buynowBtn3, modalbuynow, modalbuynowClose);
	bindModal(buynowBtn3, modalbuynow, modalbuynowClose);
	bindModal(play_icon, modal_youtube, null);
	/* bindModal(null, contacts_modal, contacts_modal_close); */




	// function for modals to cure scroll jumping bug when modal opens

	function calcScroll() {
		let div = document.createElement('div');

		div.style.width = '50px';
		div.style.height = '50px';
		div.style.overflowY = 'scroll';
		div.style.visibility = 'hidden';

		document.body.appendChild(div);
		let scrollWidth = div.offsetWidth - div.clientWidth;
		div.remove();

		return scrollWidth;
	}

	// form post

	/* const forms = () => {
	    const form = document.querySelectorAll('form'),
	        inputs = document.querySelectorAll('input');

	    const message = {
	        loading: 'Загрузка...',
	        success: 'Спасибо! Скоро мы с вами свяжемся.',
	        failure: 'Что-то пошло не так...'
	    };

	    const postData = async (url, data) => {
	        document.querySelector('.status').textContent = message.loading;
	        let res = await fetch(url, {
	            method: "POST",
	            body: data
	        });

	        return await res.text();
	    };

	    const clearInputs = () => {
	        inputs.forEach(item => {
	            item.value = '';
	        });
	    };

	    form.forEach(item => {
	        item.addEventListener('submit', (e) => {
	            e.preventDefault();

	            let statusMessage = document.createElement('div');
	            statusMessage.classList.add('status');
	            item.appendChild(statusMessage);

	            const formDate = new FormData(item);

	            postData('server.php', formDate)
	                .then(res => {
	                    console.log(res);
	                    statusMessage.textContent = message.success;
	                })
	                .catch(() => statusMessage.textContent = message.failure)
	                .finally(() => {
	                    clearInputs();
	                    setTimeout(() => {
	                        statusMessage.remove();
	                    }, 7000);
	                });
	        });
	    });
	};
	forms(); */

	// presentation section


	const menuToggle = document.querySelectorAll('.toggle', '.toggle_2');
	const showPanel = document.querySelector('.presentation');
	const showMenu = document.querySelector('.menu__wrapper');

	function showPanelP() {
		showPanel.classList.toggle('active');
		if (showPanel.classList.contains('active')) {
			showMenu.style.display = 'block';
		} else if (!showPanel.classList.contains('active')) {
			showMenu.style.display = 'none';
		}
	}

	menuToggle.forEach(toggle => {
		toggle.addEventListener('click', () => {
			menuToggle[0].classList.toggle('active');
			menuToggle[1].classList.toggle('active');
			requestAnimationFrame(showPanelP);
		});
	});

	/* menuToggle.addEventListener('click', () => {
	    menuToggle.classList.toggle('active');
	    menuToggle2.classList.toggle('active');
	    requestAnimationFrame(showPanelP);
	});

	menuToggle2.addEventListener('click', () => {
	    menuToggle.classList.toggle('active');
	    menuToggle2.classList.toggle('active');
	    requestAnimationFrame(showPanelP);
	}); */



	// service section 


	const batery = document.querySelector('.batery');

	const processor = document.querySelector('.processor');
	const camera = document.querySelector('.camera');
	const plate = document.querySelector('.plate');
	const malfunctionToggle = document.querySelectorAll('.malfunction span');

	if (!batery.firstElementChild.classList.contains('malactive')) {
		processor.style.marginTop = '266px';
	}
	if (!camera.firstElementChild.classList.contains('malactive')) {
		plate.style.marginTop = '295px';
	}
	const mediaQuery1071 = window.matchMedia('(min-width: 1071px)');
	const mediaQuery1070 = window.matchMedia('(max-width: 1070px)');
	const mediaQuery720 = window.matchMedia('(max-width: 720px)');
	const cameraMoving = document.querySelector('.service__wrapper_malfunctions-right .camera');
	const plateMoving = document.querySelector('.service__wrapper_malfunctions-right .plate');
	const bateryMoving = document.querySelector('.service__wrapper_malfunctions-left .batery');
	const processorMoving = document.querySelector('.service__wrapper_malfunctions-left .processor');
	const malfanctionsLeft = document.querySelector('.service__wrapper_malfunctions-left');
	const malfanctionsRight = document.querySelector('.service__wrapper_malfunctions-right');
	const malfanctionsCenter = document.querySelector('.service__wrapper_center-mobile');

	function serviceResizer() {
		if (mediaQuery1071.matches) {
			cameraMoving.classList.remove('camera-media');
			malfanctionsRight.prepend(cameraMoving);
			malfanctionsRight.appendChild(plateMoving);
			plateMoving.style.marginTop = '295px';
			plateMoving.classList.remove('posCenter');
			malfanctionsLeft.prepend(bateryMoving);
			malfanctionsLeft.appendChild(processorMoving);
			processorMoving.style.marginTop = '266px';
			processorMoving.classList.remove('posCenter');
		}
		if (mediaQuery1070.matches) {
			cameraMoving.classList.add('camera-media');
			malfanctionsLeft.prepend(cameraMoving);
			malfanctionsLeft.prepend(bateryMoving);
			malfanctionsLeft.appendChild(processorMoving);
			plateMoving.style.marginTop = '295px';
			processorMoving.style.marginTop = '266px';
			processorMoving.classList.remove('posCenter');
		}
		if (mediaQuery720.matches) {
			cameraMoving.classList.add('camera-media');
			malfanctionsCenter.prepend(cameraMoving);
			malfanctionsCenter.appendChild(plateMoving);
			plateMoving.style.marginTop = '0';
			plateMoving.classList.add('posCenter');
			malfanctionsCenter.appendChild(bateryMoving);
			malfanctionsCenter.appendChild(processorMoving);
			processorMoving.classList.add('posCenter');
			processorMoving.style.marginTop = '0';
		}
		/* if (processor.classList.contains('posCenter')) {
		    processor.style.marginTop = '0px';
		} */
	}
	serviceResizer()
	window.addEventListener('resize', serviceResizer);

	malfunctionToggle.forEach(item => {
		item.addEventListener('click', () => {
			item.classList.toggle('malactive');
			if (item.classList.contains('malactive')) {
				item.nextElementSibling.style.display = 'block';
			} else if (!item.classList.contains('malactive')) {
				item.nextElementSibling.style.display = 'none';
			}
			if (!batery.firstElementChild.classList.contains('malactive')) {
				processor.style.marginTop = '266px';
			} else if (batery.firstElementChild.classList.contains('malactive')) {
				processor.style.marginTop = '0px';
			}
			if (!camera.firstElementChild.classList.contains('malactive')) {
				plate.style.marginTop = '295px';
			} else if (camera.firstElementChild.classList.contains('malactive')) {
				plate.style.marginTop = '0px';
			}
			if (plate.classList.contains('posCenter')) {
				plate.style.marginTop = '0px';
			}
			if (processor.classList.contains('posCenter')) {
				processor.style.marginTop = '0px';
			}
		});

		const textCheckbox = document.querySelectorAll('.service__wrapper_checkboxes')
		textCheckbox.forEach(item => {
			item.addEventListener('click', () => {
				item.classList.toggle('checked');
				if (item.classList.contains('checked')) {
					item.lastElementChild.checked = true;
					item.firstElementChild.checked = true;
				} else {
					item.lastElementChild.checked = false;
					item.firstElementChild.checked = false;
				}
			})
		})
	});

	// aboutme section

	const whyImportant = document.querySelectorAll('.important')

	whyImportant.forEach(item => {
		item.addEventListener('click', () => {
			/* item.nextSibling.classList.toggle('opened'); */
			item.nextElementSibling.classList.toggle('opened')
		})
	})

	// animations

	const animItems = document.querySelectorAll('._anim-items');

	if (animItems.length > 0) {
		window.addEventListener('scroll', animOnScroll, {
			passive: true
		});

		function animOnScroll() {
			for (let index = 0; index < animItems.length; index++) {
				const animItem = animItems[index];
				const animItemHeight = animItem.offsetHeight;
				const animItemOffset = offset(animItem).top;
				const animStart = 4;

				let animItemPoint = window.innerHeight - animItemHeight / animStart;

				if (animItemHeight > window.innerHeight) {
					animItemPoint = window.innerHeight - window.innerHeight / animStart;
				}

				if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
					animItem.classList.add('active');
				} else {
					if (!animItem.classList.contains('_anim-no-hide'))
						animItem.classList.remove('active');
				}
			}

			function offset(el) {
				const rect = el.getBoundingClientRect(),
					scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
					scrollTop = window.pageYOffset || document.documentElement.scrollTop;
				return {
					top: rect.top + scrollTop,
					left: rect.left + scrollLeft
				}
			}
			setTimeout(() => {
				animOnScroll();
			}, 300)
		}
	}

	// form

	let form = document.getElementById('form_contacts');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();
		let error = formValidate(form);

		let formData = new FormData(form);
		/* for (var p of formData) {
		    console.log(p);
		} */


		if (error === 0) {
			form.classList.add('_sending');
			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				/* alert(result.message); */

				form.reset();
				form.classList.remove('_sending');
				bindModal(null, contacts_modal, contacts_modal_close);
			} else {
				alert("Ошибка отправки, Эх.");
				form.classList.remove('_sending');
			}
		} else {
			alert("Пожалуйста, заполните обязательные поля, они будут обведены красным цветом!");
		}
	}

	function formValidate() {
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);

			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
				formAddError(input);
				error++;
			} else {
				if (input.value === "") {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}

	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}

	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}

	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}

	// parallax section

	// changing absolute to fixed then scroll

	let parallax_section = document.getElementById('parallax_section');
	let parallax_body = document.querySelector('.parallax__body');


	if (parallax_section) {
		window.addEventListener('scroll', change_parallax_display, {
			passive: true
		});
	}

	function change_parallax_display() {

		const parallax_sectionHeight = parallax_section.offsetHeight;
		const parallax_sectionOffset = offset(parallax_section).top;
		let paralalx_start = 1.00;

		let parallax_sectionPoint = window.innerHeight - parallax_sectionHeight / paralalx_start;

		if (parallax_sectionHeight > window.innerHeight) {
			parallax_sectionPoint = window.innerHeight - window.innerHeight / paralalx_start;
		}

		if ((pageYOffset > parallax_sectionOffset - parallax_sectionPoint) && pageYOffset < (parallax_sectionOffset + parallax_sectionHeight)) {
			parallax_body.classList.add('fixed');
		} else {
			if (!parallax_section.classList.contains('_anim-no-hide'))
				parallax_body.classList.remove('fixed');
		}
	}

	// True offset calc function

	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return {
			top: rect.top + scrollTop,
			left: rect.left + scrollLeft
		}
	}

	//effect parallax

	const translate = document.querySelectorAll(".translate"),
		content_container = document.querySelector('.content__container'),
		load_section = document.querySelector('#load'),
		content_section = document.querySelector('.content'),
		content_divider = document.querySelector('.content__divider'),
		opacity_div = document.querySelectorAll('.content .opacity');


	let section_height = load_section.offsetHeight;
	let content_section_offset = offset(content_section).top;

	/*     window.addEventListener('scroll', () => { */


	function lets_translateY() {
		let scroll = window.pageYOffset - offset(parallax_section).top;
		translate.forEach(element => {
			let speed = element.dataset.speed;
			element.style.transform = `translateY(${scroll * speed}px)`;
		});
		opacity_div.forEach(elem => {
			elem.style.opacity = scroll / (section_height + section_height) * 2.2;
		});
		content_divider.style.width = `${scroll / (section_height + content_section_offset) * 400}%`;
	}

	window.addEventListener('scroll', () => requestAnimationFrame(lets_translateY), {
		passive: true
	});
	/* content_container.style.transform = `translateY(${scroll / (section_height + content_section_offset) * 200 - 50}px)`; */
	/*     }, {
	        passive: true
	    }); */

});

// content section
// Adding youtube OOP
_9include('modules/youtube.js');

const player2 = new VideoPlayer('.play__icon', '.content__modal_overlay');
player2.init();
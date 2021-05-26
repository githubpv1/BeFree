// ===== jquery =====

@@include('../vendor-js/jquery.min.js')
@@include('../vendor-js/slick.min.js')
@@include('../vendor-js/lightgallery.min.js')

// wagerfie../ld  jQ-jsuery
@@include('../vendor-js/parallax.min.js')

// pixelcog../ jQuer-jsy
@@include('../vendor-js/pixelcog/parallax.min.js')


// ===== vanilla js =====

@@include('../vendor-js/ofi.min.js')
@@include('../vendor-js/svgxuse.js')

@@include('../vendor-js/swiper.min.js')
@@include('../vendor-js/baguetteBox.min.js')

@@include('../vendor-js/nouislider.min.js')
@@include('../vendor-js/wNumb.min.js')



@@include('../libs-js/dialog.js')
@@include('../libs-js/utils.js')

@@include('../libs-js/accordion.js')






// ===== animation ===== 

// @@include('vendor/wow.min.js')
// @@include('vendor/aos.min.js')
// @@include('vendor/aosnext.min.js')



// ===== parallax =====

@@include('vendor/rellax.min.js')
@@include('vendor/simpleParallax.min.js')







objectFitImages(); 



// ====== swiper ======

// @@include('libs/swiper.js', {
//   "name": "object"
// })

var mySwiper = new Swiper('.__swiper', {
	// spaceBetween: 20,
	loop: true,
	autoHeight: true,
	grabCursor: true,
	// effect: 'fade',
	fadeEffect: {
		crossFade: true
	},
	navigation: {
		nextEl: '.__btn-next',
		prevEl: '.__btn-prev',
	},
	pagination: {
		el: '.__swiper-pagination',
		clickable: true,
	},
	breakpoints: {
		768: {
			// pagination: ' ',
		}
	}
});



// ===== baguetteBox =====

baguetteBox.run('.gallery');



// ===== slick =====

$('.__slider').slick({
	prevArrow: $('.__prev'),  
	nextArrow: $('.__next'),
	// infinite: false,
	// dots: true,
	// appendDots: $('.user__dots'),
  slidesToShow: 1,
  slidesToScroll: 1
});

$('.dots').slick({
	infinite: false,
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	fade: true,
	focusOnSelect: true,
	asNavFor: '.user__slider',

	mobileFirst: true,
	responsive: [
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
				fade: false,
				vertical: true,
			}
		},
	]
});



// ===== lightGallery =====

$(".lightgallery").lightGallery({
	loop: false
});



//сбрасываем :focus при клике, но оставляем с клавиатуры

(function () {
	var button = document.querySelectorAll('a, button, label, input');

	var isMouseDown = false;

	for (var i = 0; i < button.length; i++) {
		var el = button[i];
		
		if (el.tagName !== 'LABEL') {
			el.classList.add('focus');
		}

		el.addEventListener('mousedown', function () {
			this.classList.remove('focus');
			isMouseDown = true;
		});
		el.addEventListener('keydown', function (e) {
			if (e.key === "Tab") {
				isMouseDown = false;
			}
		});
		el.addEventListener('focus', function () {
			if (isMouseDown) {
				this.classList.remove('focus');
			}
		});
		el.addEventListener('blur', function () {
					this.classList.add('focus');
		});
	}
}());



// ===== up =====

(function () {
  var btn_up = document.querySelector('[data-up]');

  function scrollUp() {
    window.scrollBy(0, -80);

    if (window.pageYOffset > 0) {
      requestAnimationFrame(scrollUp);
    }
  }

  var lastScrollPos = 0;
  var start = true;

  function showBtnUp() {
    if (start) {
      start = false;

      setTimeout(function () {
        var scrollPos = window.pageYOffset;

        if (scrollPos > 600 && scrollPos < lastScrollPos) {
          btn_up.classList.add('show');
        } else {
          btn_up.classList.remove('show');
        }
        lastScrollPos = scrollPos;
        start = true;
      }, 200);
    }
  }

  if (btn_up) {
    btn_up.addEventListener('click', scrollUp);
    document.addEventListener('scroll', showBtnUp);
  }
}());



// ===== navigation =====

(function () {
	var nav = document.querySelector('.nav');
	var overlay = document.querySelector('.overlay');
	var body = document.querySelector('body');
	var burger = document.querySelector('.nav__burger');

	burger.addEventListener('click', toggleMenu);

	function toggleMenu() {
		this.classList.toggle('active');
		nav.classList.toggle('active');
		overlay.classList.toggle('active');
		body.classList.toggle('lock');
		swipe(nav);
	}

}());



// ===== menu drop ===== 

(function () {

	var btnDrop = document.querySelectorAll('[data-drop]');
	if (btnDrop) {
		for (var i = 0; i < btnDrop.length; i++) {

			var link = btnDrop[i].parentElement.querySelector('a');
			var label = '<span class="visuallyhidden">открыть подменю для“' + link.text + '”</span>';
			btnDrop[i].insertAdjacentHTML('beforeend', label);

			btnDrop[i].addEventListener('click', function (e) {
				if (this.classList.contains('active')) {
					this.classList.remove('active');
					this.nextElementSibling.classList.remove('show');
					this.setAttribute('aria-expanded', "false");
					this.parentElement.querySelector('a').setAttribute('aria-expanded', "false");
				} else {
					this.classList.add('active');
					this.nextElementSibling.classList.add('show');
					this.setAttribute('aria-expanded', "true");
					this.parentElement.querySelector('a').setAttribute('aria-expanded', "true");
				}
			});
		}
	}

}());



function scrollMenu(nav, offset, speed, easing) {

	var menu = document.querySelector(nav);
	var menuHeight;
	if (offset) { 
		var head = document.querySelector(offset);

		if (head) { 
			menuHeight = head.clientHeight;
		} else {
			menuHeight = 0;
		}
	} else {
		menuHeight = 0;
	}

	function fncAnimation(callback) {
		window.setTimeout(callback, 1000 / 60);
	};

	window.requestAnimFrame = function () {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || fncAnimation;
	}();


	function scrollToY(height, speed, easing) {
		var scrollTargetY = height || 0;
		scrollTargetY += 2;
		var speed = speed || 2000;
		var easing = easing || 'easeOutSine';

		var scrollY = window.pageYOffset;
		var currentTime = 0;
		var time = Math.max(0.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, 0.8));

		var easingEquations = {
			easeOutSine: function easeOutSine(pos) {
				return Math.sin(pos * (Math.PI / 2));
			},
			easeInOutSine: function easeInOutSine(pos) {
				return -0.5 * (Math.cos(Math.PI * pos) - 1);
			},
			easeInOutQuint: function easeInOutQuint(pos) {
				/* eslint-disable-next-line */
				if ((pos /= 0.5) < 1) {
					return 0.5 * Math.pow(pos, 5);
				}
				return 0.5 * (Math.pow(pos - 2, 5) + 2);
			}
		};

		function tick() {
			currentTime += 1 / 60;
			var p = currentTime / time;
			var t = easingEquations[easing](p);

			if (p < 1) {
				window.requestAnimFrame(tick);
				window.scrollTo(0, scrollY + (scrollTargetY - scrollY) * t);
			} else {
				window.scrollTo(0, scrollTargetY);
			}
		}

		tick();
	};


	function menuControl(menu) {
		var i = void 0;
		var currLink = void 0;
		var refElement = void 0;
		var links = menu.querySelectorAll('a[href^="#"]');
		var scrollY = window.pageYOffset;


		for (i = 0; i < links.length; i += 1) {
			currLink = links[i];
			refElement = document.querySelector(currLink.getAttribute('href'));

			var box = refElement.getBoundingClientRect();
			var topElem = box.top + scrollY - menuHeight;

			if (topElem <= scrollY && topElem + refElement.clientHeight > scrollY) {
				currLink.classList.add('active');
			} else {
				currLink.classList.remove('active');
			}
		}
	};

	function animated(menu, speed, easing) {
		function control(e) {
			e.preventDefault();

			var box = document.querySelector(this.hash).getBoundingClientRect();
			var topElem = box.top + window.pageYOffset;
			scrollToY(topElem - menuHeight, speed, easing);
		}

		var i = void 0;
		var link = void 0;
		var links = menu.querySelectorAll('a[href^="#"]');

		for (i = 0; i < links.length; i += 1) {
			link = links[i];
			link.addEventListener('click', control);
		}
	};

	animated(menu, speed, easing);
	document.addEventListener('scroll', function () {
		menuControl(menu);
	});
};
// scrollMenu('.site__nav'); 
// scrollMenu('.site__nav', '.fix_menu'); 
// scrollMenu('.site__nav', '.fix_menu', 2000);
// scrollMenu('.site__nav', 0, 3000); // без фиксменю и со скоростью




// ====== validate and send form ========

(function () {
	var form1 = document.getElementById('form_1');
	var form2 = document.getElementById('form_2');
	var form3 = document.getElementById('form_3');
	var reg = document.querySelectorAll('input[required]');

	if (reg) {
		for (var i = 0; i < reg.length; i++) {
			var elem = reg[i];
			elem.addEventListener('blur', check);
			elem.addEventListener('focus', rezet);
		}
	}

	if (form1) {
		form1.addEventListener('submit', validate);
	}
	if (form2) {
		form2.addEventListener('submit', ajaxSend);
		// form2.addEventListener('submit', validate);
	}
	if (form3) {
		// form3.addEventListener('submit', ajaxSend);
		form3.addEventListener('submit', validate);
	}

	function rezet() {
		var error = this.parentElement.querySelector('.error');
		this.classList.remove('invalid');
		error.innerHTML = '';
	}

	function check() {
		var error = this.parentElement.querySelector('.error');

		if (!this.validity.valid) {
			this.classList.add('invalid');
			error.innerHTML = 'ошибка / неправильный формат';
			if (this.validity.valueMissing || this.value === '') {
				error.innerHTML = 'ошибка / заполните поле';
			}
			return 1;
		} else {
			return 0;
		}
	}

	function validate(e) {
		var reg = this.querySelectorAll('input[required]');
		var agree = this.querySelector('input[name="agree"]');
		var countError = 0;
		if (!agree || agree.checked) {

			for (var i = 0; i < reg.length; i++) {
				var input = reg[i];
				countError += check.call(input);
				if (countError) {
					e.preventDefault();
				}
			}
		} else {
			e.preventDefault();
			countError++;
		}
		return countError;
	}

	function ajaxSend(e) {
		e.preventDefault();
		var el = this;
		var error = validate.call(el, e);

		if (error === 0) {
			this.classList.add('sending');
			var formData = new FormData(this);
			var xhr = new XMLHttpRequest();
			xhr.open("POST", this.getAttribute("action"));
			xhr.send(formData);

			xhr.onloadend = function () {
				if (xhr.status == 200) {
					el.classList.remove('sending');
					el.reset();
					// alert('Сообщение отправлено.');
					// alert(xhr.response);  //ответ сервера
				} else {
					console.log('Ошибка' + this.status);
				}
			}
		}
	}
}());



// ===== tabs =====

(function () {
	var tablist = document.querySelectorAll('[role="tablist"]')[0];
	var tabs = document.querySelectorAll('[role="tab"]');
	var panels = document.querySelectorAll('[role="tabpanel"]');

	function activateTab(tab, setFocus) {
		setFocus = setFocus || true;
		deactivateTabs();

		tab.removeAttribute('tabindex');
		tab.setAttribute('aria-selected', 'true');
		tab.classList.add('active');

		var controls = tab.getAttribute('aria-controls');

		document.getElementById(controls).removeAttribute('hidden');

		if (setFocus) {
			tab.focus();
		};
	};

	function deactivateTabs() {
		for (t = 0; t < tabs.length; t++) {
			tabs[t].setAttribute('tabindex', '-1');
			tabs[t].setAttribute('aria-selected', 'false');
			tabs[t].classList.remove('active');
			tabs[t].removeEventListener('focus', focusEventHandler);
		};

		for (p = 0; p < panels.length; p++) {
			panels[p].setAttribute('hidden', 'hidden');
		};
	};

	var keys = {
		end: 35,
		home: 36,
		left: 37,
		up: 38,
		right: 39,
		down: 40
	};

	var direction = {
		37: -1,
		38: -1,
		39: 1,
		40: 1
	};

	for (i = 0; i < tabs.length; ++i) {
		addListeners(i);
	};

	function addListeners(index) {
		tabs[index].addEventListener('click', clickEventListener);
		tabs[index].addEventListener('keydown', keydownEventListener);
		tabs[index].addEventListener('keyup', keyupEventListener);

		tabs[index].index = index;
	};

	function clickEventListener(event) {
		var tab = event.target;
		activateTab(tab, false);
	};

	function keydownEventListener(event) {
		var key = event.keyCode;

		switch (key) {
			case keys.end:
				event.preventDefault();
				activateTab(tabs[tabs.length - 1]);
				break;
			case keys.home:
				event.preventDefault();
				activateTab(tabs[0]);
				break;

			case keys.up:
			case keys.down:
				determineOrientation(event);
				break;
		};
	};

	function keyupEventListener(event) {
		var key = event.keyCode;

		switch (key) {
			case keys.left:
			case keys.right:
				determineOrientation(event);
				break;
		};
	};

	function determineOrientation(event) {
		var key = event.keyCode;
		var vertical = tablist.getAttribute('aria-orientation') == 'vertical';
		var proceed = false;

		if (vertical) {
			if (key === keys.up || key === keys.down) {
				event.preventDefault();
				proceed = true;
			};
		} else {
			if (key === keys.left || key === keys.right) {
				proceed = true;
			};
		};

		if (proceed) {
			switchTabOnArrowPress(event);
		};
	};

	function switchTabOnArrowPress(event) {
		var pressed = event.keyCode;

		for (x = 0; x < tabs.length; x++) {
			tabs[x].addEventListener('focus', focusEventHandler);
		};

		if (direction[pressed]) {
			var target = event.target;
			if (target.index !== undefined) {
				if (tabs[target.index + direction[pressed]]) {
					tabs[target.index + direction[pressed]].focus();
				} else if (pressed === keys.left || pressed === keys.up) {
					focusLastTab();
				} else if (pressed === keys.right || pressed == keys.down) {
					focusFirstTab();
				};
			};
		};
	};

	function focusFirstTab() {
		tabs[0].focus();
	};

	function focusLastTab() {
		tabs[tabs.length - 1].focus();
	};

	function focusEventHandler(event) {
		var target = event.target;

		setTimeout(checkTabFocus, 30, target);
	};

	function checkTabFocus(target) {
		focused = document.activeElement;

		if (target === focused) {
			activateTab(target, false);
		};
	};
}());



function initMap() {
	var myPos = new google.maps.LatLng(55.730613, 37.593276);
	var elem = document.getElementById('map');

	if (elem) {
		var map = new google.maps.Map(elem, {
			center: myPos, 
			zoom: 15, // 0 - 21
			disableDefaultUI: true, 
		});
	}

	
	var marker = new google.maps.Marker({
		position: myPos, 
		map: map, 
		icon: "img/pin.png" ,           
	});


}
google.maps.event.addDomListener(window, "load", initMap);



// ===== выбрано файлов =====

(function () {

	// выбрано файлов имя или кол-во

	var fileName = document.getElementById('file-name');
	var inputFile = document.getElementById('input_file');

	if (inputFile) {
		inputFile.addEventListener('change', countFile);
	}

	function countFile() {
		files = this.files;

		if (files.length == 1) {
			fileName.innerHTML = 'Имя файла: ' + files[0].name;
		} else {
			fileName.innerHTML = 'Выбрано ' + files.length + ' Файла(ов)';
		}
	}
}());



// ===== select =====

{
// ===== select native arrow =====

(function () {
	var selectes = document.querySelectorAll('.select');

	if (selectes) {

		for (let i = 0; i < selectes.length; i++) {
			var select = selectes[i];
			var parent = select.parentElement;
			select.addEventListener('click', function () {
				parent.classList.toggle('oupen');
			});

			select.addEventListener('keydown', function (e) {
				if (e.keyCode === 13 || e.keyCode === 32) {
					parent.classList.toggle('oupen');
				}
			});

			select.addEventListener('focus', function () {
				parent.classList.add('focus');
			});

			select.addEventListener('blur', function () {
				parent.classList.remove('oupen');
				parent.classList.remove('focus');
			});
		}
	}
});



// ==== select gibrid ====

(function () {
	const selectNatives = document.querySelectorAll('.selectNative');

	if (selectNatives) {

		for (let i = 0; i < selectNatives.length; i++) {

			const elSelectNative = selectNatives[i];
			const selectParent = elSelectNative.parentElement;

			createSelectCustom(elSelectNative);

			function createSelectCustom(select) {
				const select_options = select.querySelectorAll('option');
				const select_selected_option = select.querySelector('option:checked');
				const select_selected_text = select_selected_option.text;

				const select_type_content = '<div class="selectCustom-trigger">' + select_selected_text + '</div>';

				selectParent.insertAdjacentHTML('beforeend',
					'<div class="selectCustom" aria-hidden="true">' +
					select_type_content +
					'<div class="selectCustom-options">' + selectGetOptions(select_options) + '</div>' +
					'</div></div>');
			}

			function selectGetOptions(select_options) {
				if (select_options) {
					var select_options_content = '';
					for (var i = 0; i < select_options.length; i++) {
						var select_option = select_options[i];
						var select_option_value = select_option.value;
						if (select_option_value != '') {
							var select_option_text = select_option.text;
							select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="selectCustom-option">' + select_option_text + '</div>';
						}
					}
					return select_options_content;
				}
			}

			const elSelectCustom = elSelectNative.nextElementSibling;
			const elSelectCustomBox = elSelectCustom.children[0];
			const elSelectCustomOpts = elSelectCustom.children[1];
			const customOptsList = Array.from(elSelectCustomOpts.children);
			const optionsCount = customOptsList.length;

			let optionChecked = "";
			let optionHoveredIndex = -1;

			elSelectCustomBox.addEventListener("click", function (e) {
				const isClosed = !elSelectCustom.classList.contains("isActive");
				if (isClosed) {
					openSelectCustom();
				} else {
					closeSelectCustom();
				}
			});

			function openSelectCustom() {
				elSelectCustom.classList.add("isActive");
				elSelectNative.classList.add("isActive");
				selectParent.classList.add("isActive");
				elSelectCustom.setAttribute("aria-hidden", false);

				if (optionChecked) {
					const optionCheckedIndex = customOptsList.findIndex(
						(el) => el.getAttribute("data-value") === optionChecked
					);
					updateCustomSelectHovered(optionCheckedIndex);
				}

				document.addEventListener("click", watchClickOutside);
				document.addEventListener("keydown", supportKeyboardNavigation);
			}

			function closeSelectCustom() {
				elSelectCustom.classList.remove("isActive");
				elSelectNative.classList.remove("isActive");
				selectParent.classList.remove("isActive");

				elSelectCustom.setAttribute("aria-hidden", true);

				updateCustomSelectHovered(-1);

				document.removeEventListener("click", watchClickOutside);
				document.removeEventListener("keydown", supportKeyboardNavigation);
			}

			function updateCustomSelectHovered(newIndex) {
				const prevOption = elSelectCustomOpts.children[optionHoveredIndex];
				const option = elSelectCustomOpts.children[newIndex];

				if (prevOption) {
					prevOption.classList.remove("isHover");
				}
				if (option) {
					option.classList.add("isHover");
				}

				optionHoveredIndex = newIndex;
			}

			function updateCustomSelectChecked(value, text) {
				const prevValue = optionChecked;

				const elPrevOption = elSelectCustomOpts.querySelector(
					`[data-value="${prevValue}"`
				);
				const elOption = elSelectCustomOpts.querySelector(`[data-value="${value}"`);

				if (elPrevOption) {
					elPrevOption.classList.remove("isActive");
				}

				if (elOption) {
					elOption.classList.add("isActive");
				}

				elSelectCustomBox.textContent = text;
				optionChecked = value;
			}

			function watchClickOutside(e) {
				const didClickedOutside = !elSelectCustom.contains(event.target);
				if (didClickedOutside) {
					closeSelectCustom();
				}
			}

			function supportKeyboardNavigation(e) {
				// press down -> go next
				if (event.keyCode === 40 && optionHoveredIndex < optionsCount - 1) {
					let index = optionHoveredIndex;
					e.preventDefault(); // prevent page scrolling
					updateCustomSelectHovered(optionHoveredIndex + 1);
				}

				// press up -> go previous
				if (event.keyCode === 38 && optionHoveredIndex > 0) {
					e.preventDefault(); // prevent page scrolling
					updateCustomSelectHovered(optionHoveredIndex - 1);
				}

				// press Enter or space -> select the option
				if (event.keyCode === 13 || event.keyCode === 32) {
					e.preventDefault();

					const option = elSelectCustomOpts.children[optionHoveredIndex];
					const value = option && option.getAttribute("data-value");

					if (value) {
						elSelectNative.value = value;
						updateCustomSelectChecked(value, option.textContent);
					}
					closeSelectCustom();
				}

				// press ESC -> close selectCustom
				if (event.keyCode === 27) {
					closeSelectCustom();
				}
			}

			elSelectNative.addEventListener("change", function (e) {
				const value = e.target.value;
				const elRespectiveCustomOption = elSelectCustomOpts.querySelectorAll(
					`[data-value="${value}"]`)[0];

				updateCustomSelectChecked(value, elRespectiveCustomOption.textContent);
			});

			customOptsList.forEach(function (elOption, index) {
				elOption.addEventListener("click", function (e) {
					const value = e.target.getAttribute("data-value");

					elSelectNative.value = value;
					updateCustomSelectChecked(value, e.target.textContent);
					closeSelectCustom();
				});

				elOption.addEventListener("mouseenter", function (e) {
					updateCustomSelectHovered(index);
				});
			});


			// ===== select gibrid arrow =====

			elSelectNative.addEventListener('click', function () {
				selectParent.classList.toggle('oupen');
			});

			elSelectNative.addEventListener('focus', function () {
				selectParent.classList.add('focus');
			});

			elSelectNative.addEventListener('blur', function () {
				selectParent.classList.remove('oupen');
				selectParent.classList.remove('focus');
			});

			elSelectCustom.addEventListener('mouseover', function () {
				elSelectNative.classList.add('hover');
			});
			elSelectCustom.addEventListener('mouseout', function () {
				elSelectNative.classList.remove('hover');
			});
		}
	}
}());

}



// ===== dynamic adaptiv =====

(function () {
	var itemsMove = document.querySelectorAll('[data-move]');
	if (itemsMove) {

		function move(mql) {
			for (let i = 0; i < itemsMove.length; i++) {

				var itemMove = itemsMove[i];
				var itemNamber = itemMove.getAttribute('data-move');
				var startMove = document.querySelector('[data-start="' + itemNamber + '"]');
				var whereMove = document.querySelector('[data-where="' + itemNamber + '"]');

				if (mql.matches) {
					if (itemMove.classList.contains('done')) {
						startMove.appendChild(itemMove);
						itemMove.classList.remove('done');
					}
				} else {
					if (!itemMove.classList.contains('done')) {
						whereMove.appendChild(itemMove);
						itemMove.classList.add('done');
					}
				}
			}
		}

		var mql = window.matchMedia('(min-width: 440px)');
		// mql.addEventListener('change', move);
		mql.addListener(move);
		move(mql);

	}
}());



// ===== noUiSlider =====

(function () {
	var priceSlider = document.querySelector('.price__slider');

	noUiSlider.create(priceSlider, {
		start: [200, 800],
		range: {
			'min': 0,
			'max': 1000
		},
		format: wNumb({
			decimals: 0,
			suffix: ' (rub)'
		}),
		connect: true,
		tooltips: [true, true],
	});

	var priceStart = document.getElementById('price-start');
	var priceEnd = document.getElementById('price-end');

	if (priceStart && priceEnd) {
		priceStart.addEventListener('change', setPriceSlider);
		priceEnd.addEventListener('change', setPriceSlider);

		// при введении чисел в инпут ползунки становятся на эти значения, но при перемещении ползунков в инпуте значение не меняется

		function setPriceSlider() {
			var priceStartValue;
			var priceEndValue;
			if (priceStart.value != '') {
				priceStartValue = priceStart.value;
			}
			if (priceEnd.value != '') {
				priceEndValue = priceEnd.value;
			}
			priceSlider.noUiSlider.set([priceStartValue, priceEndValue])
		}

		// добавит обновление инпутов при перемещении ползунков

		priceSlider.noUiSlider.on('update', setPriceInput);

		function setPriceInput() {
			var getSlider = priceSlider.noUiSlider.get();
			priceStart.value = getSlider[0];
			priceEnd.value = getSlider[1];
		}
	}
}());


// ===== quantity =====

(function () {
	var sumBtns = document.querySelectorAll('.sum__btn');
	if (sumBtns) {
		for (var i = 0; i < sumBtns.length; i++) {
			sumBtns[i].addEventListener('click', funk);

			function funk() {
				var sumInput = this.parentElement.querySelector('input');
				var value = parseInt(sumInput.value);
				if (this.classList.contains('sum__btn-plus')) {
					value++;
				} else {
					value = value - 1;
					if (value < 1) {
						value = 1;
					}
				}
				sumInput.value = value;
			}

		}
	}
}());



// spoiler - все независимы

(function () {
	var $btn = $('[data-spoiler]').find('button');
	$btn.filter('.active').next().slideDown(0);

	$btn.click(function () {
		$(this).toggleClass('active').next().slideToggle(500);
	});
});



// spoiler - один закрывает другого и можно закрыть его самого

(function () {
	var $btn = $('[data-spoiler]').find('button');
	$btn.filter('.active').next().slideDown(0);

	$btn.click(function () {
		$btn.not($(this)).removeClass('active')
		$btn.next().not($(this).next()).slideUp(500);
		$(this).toggleClass('active').next().slideToggle(500);
	});
}());



// ===== anim on-scroll =====

(function () {
  var anim = document.querySelectorAll('._anim');

  if (anim) {
    window.addEventListener('scroll', animOnScroll);

    function animOnScroll() {
      for (var i = 0; i < anim.length; i++) {
        var animItem = anim[i];
      var animName = animItem.getAttribute('data-anim');
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var itemOffset = animItem.getBoundingClientRect().top + scrollTop;
        var itemHeight = animItem.offsetHeight;

        // точка старта анимации от верха окна

        // var animPoint = window.innerHeight - 400;
        var animPoint = window.innerHeight * 0.70;

        // варианты анимации

        // 1 один раз

        // if (scrollTop > itemOffset - animPoint) {
        //  animItem.classList.add('animated');
        //  if (animName) {
        //    animItem.classList.add(animName);
        //  }
        // }

        // 2 при прокрутке блока вниз анимация снова готова к запуску

        if (scrollTop > itemOffset - animPoint) {
        

        // 3 при прокрутке блока выше окна и ниже animPoint анимация снова готова к запуску

        // if ((scrollTop > itemOffset - animPoint) && scrollTop < (itemOffset + itemHeight)) {

          animItem.classList.add('animated');
          if (animName) {
            animItem.classList.remove(animName + '-back');
            animItem.offsetHeight;
            animItem.classList.add(animName);
          }
        } else {
          if (!animItem.classList.contains('_no-repeat')) {
            if (animName) {
              animItem.classList.remove(animName);
              animItem.offsetHeight;
              animItem.classList.add(animName + '-back');
            }
            animItem.classList.remove('animated');
          }
        }

      }
    }

    // задержка для первого экрана

    setTimeout(function () {
      animOnScroll();
    }, 500);
  }
}());






// ================ animation =================== 
{
	new WOW({
		offset: 0,          
	}).init();
	
	
	AOS.init();
	
	AOS.init({
		offset: 200,
		duration: 600,
		easing: 'ease-in-sine',
		delay: 100,
	});
	
	AOS.init({
		disable: 'mobile'
	});
	
	// mobile- отключить AOS на планшетах и ​​телефонах
	// phone- отключить AOS на телефонах
	// tablet- отключить AOS на планшете
	
	
	AOS.init({
		useClassNames: true,
		initClassName: false,
		animatedClassName: 'animated',
	});
	
	
	
	// ===== simpleParallax =====
	
	var images = document.querySelectorAll('.thumbnail');
	new simpleParallax(images, {
		orientation: 'down',
		scale: 1.3,
	});
	
	
	
	// ===== parallax pixelcog =====
	
	$('.parallax-window').parallax({
		speed: 0.2, //defolt
	});
	
	
	
	// ===== rellax =====
	
	var rellax = new Rellax('.rellax');
	
	
	
	// ===== parallax wagerfield for mause =====
	
	var scene = document.getElementById('scene');
	var parallaxInstance = new Parallax(scene);
	
	}
